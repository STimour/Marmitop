const apiUrl = "http://localhost:1024/"

async function fetchData() {
    try{
        const response = await fetch(`${apiUrl}`)
        if(!response.ok){
            throw new Error("Get n'a pas marché")
        }
        const data = await response.json()
        console.log(data)
        let outputSection = document.getElementById('output_section');

        if(outputSection){
            outputSection.innerHTML = '';
            data.forEach((recette: { 
                                        titre: string, 
                                        image_link: string, 
                                        time_duration: string, 
                                        note: string}) => {
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
                                        
                titreH1.textContent = recette.titre
                timeP.textContent = recette.time_duration
                noteP.textContent = recette.note
                imageRecipe.setAttribute("src", recette.image_link)
                imageRecipe.setAttribute("class", "img")
                outputSection?.appendChild(recetteSection)
                recetteSection.appendChild(recetteImageDiv)
                recetteSection.appendChild(recetteTextDiv)
                recetteImageDiv.appendChild(imageRecipe)
                recetteTextDiv.appendChild(titreH1)
                recetteTextDiv.appendChild(timeP)
                recetteTextDiv.appendChild(noteP) 
            })
        }else{
            console.error("L'élément 'output_section' n'a pas été trouvé.");
        }
    }catch(e){
        console.error('Erreur lors de la requête GET :', e)
        
    }
}

window.addEventListener('load', () => {
    fetchData();
  });

const formulaire = document.querySelector("form")

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
        const response = await fetch("http://localhost:1024/ajouter-recette", {
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
//fetchData()