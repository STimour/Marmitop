const apiUrlGetPost = "http://localhost:1024/api/recettes"

async function fetchData() {
    try{
        const response = await fetch(`${apiUrlGetPost}`)
        if(!response.ok){
            throw new Error("Get n'a pas marché")
        }
        const data = await response.json()
        console.log(data)
        let outputSection = document.getElementById('output_section');

        if(outputSection){
            outputSection.innerHTML = '';
            data.forEach((recette: { 
                                        id: number,
                                        titre: string, 
                                        image_link: string, 
                                        time_duration: string, 
                                        note: string,
                                        posting_date: string}) => {

                const postingDate = new Date(recette.posting_date)
                outputSection = document.getElementById('output_section')
                                        
                const recetteSection = document.createElement('div') as HTMLDivElement
                    recetteSection.setAttribute("class","flex-row m-50 p-30 outline")
                                        
                const recetteTextDiv =  document.createElement('div') as HTMLDivElement
                    recetteTextDiv.setAttribute("class", "column_center w-40 outline p-30")
                                        
                const recetteImageDiv =  document.createElement('div') as HTMLDivElement
                    recetteImageDiv.setAttribute("class", "w-40 flex-center")

                const imageRecipe = document.createElement('img') as HTMLImageElement
                                        
                const titreH1 = document.createElement("h1") 
                const timeP =  document.createElement("p") as HTMLParagraphElement
                const noteP =  document.createElement("p") as HTMLParagraphElement
                const ajoutP =  document.createElement("p") as HTMLParagraphElement

                const btnDelet = document.createElement("button") as HTMLButtonElement
                      btnDelet.textContent = "Supprimer"
                      btnDelet.setAttribute("class", "btnDelet p-10")
                      btnDelet.addEventListener("click", async () => {
                          const confirmation = confirm("Êtes-vous sûr de la suppression?")
                          if (confirmation){
                            try{
                              const response = await fetch(`http://localhost:1024/api/recettes/${recette.id}`, {
                                method: "DELETE"
                              })
                              if(!response.ok){
                                throw new Error("echec")
                              }
                              const info = await response.json()

                              alert(info.message)
                              fetchData()
                            }catch(e){
                              console.log(e)
                            }
                          }
                      })                    

                const btnModif = document.createElement("button") as HTMLButtonElement
                      btnModif.textContent = "Modifier"   
                      btnModif.setAttribute("class", "btnModif p-10")     
                      btnModif.addEventListener("click", () => {
                  
                        recetteImageDiv.remove()
                        recetteTextDiv.remove()
                        
                        const input_form_sec_up = document.createElement("div") as HTMLDivElement
                            input_form_sec_up.setAttribute("class", "flex-column w-900 m-auto text_center border")
                    

                        const input_form_sec_bottom = document.createElement("div") as HTMLDivElement

                        const formulaireModif =  document.createElement("form") as HTMLFormElement
                        formulaireModif.setAttribute("class", "m-50")


                        
                        recetteSection.appendChild(formulaireModif);

                        const titreInput = document.createElement("input") as HTMLInputElement
                        titreInput.type = "text"
                        
                        titreInput.value = recette.titre

                        const imageLinkInput = document.createElement("input") as HTMLInputElement
                        imageLinkInput.type = "text";
                        imageLinkInput.value = recette.image_link;

                        const durationInput = document.createElement("input") as HTMLInputElement
                        durationInput.type = "text"
                        durationInput.value = recette.time_duration

                        const noteInput = document.createElement("input") as HTMLInputElement
                        noteInput.type = "text"
                        noteInput.value = recette.note

                        formulaireModif.appendChild(titreInput)
                        formulaireModif.appendChild(imageLinkInput)
                        formulaireModif.appendChild(durationInput)
                        formulaireModif.appendChild(noteInput)

                        const submitBtn = document.createElement("button") as HTMLButtonElement;
                        submitBtn.type = "submit";
                        submitBtn.textContent = "Modifier";
                        formulaireModif.appendChild(submitBtn);

                        formulaireModif.addEventListener("submit", async (e) => {
                          e.preventDefault()
                          
                          const newTitre = titreInput.value
                          const newImageLink = imageLinkInput.value
                          const newDuration = durationInput.value
                          const newNote = noteInput.value
                          const newPostingDate = new Date()

                          try{
                            const response = await fetch(`http://localhost:1024/api/recettes/${recette.id}`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify({titre: newTitre, imageRecipe: newImageLink, time_duration: newDuration, note: newNote, posting_date: newPostingDate.toISOString()
                              })
                            })
                            if(!response.ok){
                              throw new Error("echec put")
                            }

                            fetchData()
                          } catch(e) {
                            console.log(e);
                            
                          }
                        
                        })
                      })

                titreH1.textContent = recette.titre
                timeP.textContent = recette.time_duration + " min."
                noteP.textContent = recette.note
                ajoutP.textContent = "Posté le " + postingDate.toLocaleDateString()
                imageRecipe.setAttribute("src", recette.image_link)
                imageRecipe.setAttribute("class", "img")
                outputSection?.appendChild(recetteSection)
                recetteSection.appendChild(recetteImageDiv)
                recetteSection.appendChild(recetteTextDiv)
                recetteImageDiv.appendChild(imageRecipe)
                recetteTextDiv.appendChild(titreH1)
                recetteTextDiv.appendChild(timeP)
                recetteTextDiv.appendChild(ajoutP)
                recetteTextDiv.appendChild(noteP) 
                recetteTextDiv.appendChild(btnModif)
                recetteTextDiv.appendChild(btnDelet)
            })

        }else{
            console.error("L'élément 'output_section' n'a pas été trouvé.")
        }
    }catch(e){
        console.error('Erreur lors de la requête GET :', e)
        
    }
}

window.addEventListener('load', () => {
    fetchData();
  });

const formulaire = document.getElementById("formReciepInput")

if (formulaire) {
  formulaire.addEventListener("submit", async (e) => {
   e.preventDefault()

    const titreElement = document.getElementById("title") as HTMLInputElement
    const imageLinkElement = document.getElementById("image_link") as HTMLInputElement
    const timeDurationElement = document.getElementById("time_duration") as HTMLInputElement
    const noteElement = document.getElementById("note") as HTMLTextAreaElement

    if (
      titreElement &&
      imageLinkElement &&
      timeDurationElement &&
      noteElement
    ) {
      const titre = titreElement.value
      const image_link = imageLinkElement.value
      const time_duration = timeDurationElement.value
      const note = noteElement.value

      try {
        const response = await fetch(`${apiUrlGetPost}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titre, image_link, time_duration, note }),
        })

        if (!response.ok) {
          throw new Error("Échec de la requête POST")
        }
     
        titreElement.value = "";
        imageLinkElement.value = "";
        timeDurationElement.value = "";
        noteElement.value = "";

        fetchData()
      } catch (error) {
        console.error("Erreur lors de l'envoi de la requête POST :", error)
      }
    }
  })
}