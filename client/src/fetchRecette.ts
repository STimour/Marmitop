import { fetchData, detailRecette, idRecette } from "./fetchData";


const API = "http://localhost:1024/api/recettes"

export async function fetchRecette(){
    try{
        if(detailRecette === true && idRecette !==null){
        const response = await fetch(`${API}/${idRecette}`)
            console.log(idRecette)
        if(!response.ok){
            throw new Error("Get ne fonctionne pas")
        }

        const data = await response.json()

        let outputSection = document.getElementById('output_section')

        if(outputSection){
            outputSection.innerHTML = ''
            data.forEach((recette: { 
                                    id: number,
                                    titre: string, 
                                    image_link: string, 
                                    time_duration: string, 
                                    note: string,
                                    posting_date: string}) => {
                                    
                                        const postingDate = new Date(recette.posting_date)
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
                     
                                        //ANCHOR - btn Delete
                                        const btnDelet = document.createElement("button") as HTMLButtonElement
                                        btnDelet.textContent = "Supprimer"
                                        btnDelet.setAttribute("class", "btnDelet p-10")
                                        btnDelet.addEventListener("click", async () => {
                                            const confirmation = confirm("Êtes-vous sûr de la suppression?")
                                            if (confirmation){
                                              try{
                                                const response = await fetch(`${API}/${recette.id}`, {
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

                                        //ANCHOR - btn Modify -> il faut faire le test en mettant juste la function put -> il faut creer avant cette function dans un fichier et l'importer 
                                        const btnModif = document.createElement("button") as HTMLButtonElement
                                        btnModif.textContent = "Modifier"   
                                        btnModif.setAttribute("class", "btnModif p-10")     
                                        btnModif.addEventListener("click", () => {
                                        
                                          recetteImageDiv.remove()
                                          recetteTextDiv.remove()
                                        
                                          const input_form_sec_up = document.createElement("div") as HTMLDivElement
                                            input_form_sec_up.setAttribute("class", "flex-row")
                                        
                                          const input_form_sec_bottom = document.createElement("div") as HTMLDivElement
                                            input_form_sec_bottom.setAttribute("class", "flex-row")
                                        
                                          const input_form_div_up = document.createElement("div") as HTMLDivElement
                                            input_form_div_up.setAttribute("class", "input-form-section_item column_center m-50")
                                        
                                          const input_form_div_bottom = document.createElement("div") as HTMLDivElement
                                            input_form_div_bottom.setAttribute("class", "input-form-section_item column_center m-50")
                                        
                                          const formulaireModif =  document.createElement("form") as HTMLFormElement
                                            formulaireModif.setAttribute("class", "m-50 text_center")
                                        
                                          const labelTitre = document.createElement("label") as HTMLLabelElement
                                            labelTitre.setAttribute("for", "titre")
                                            labelTitre.textContent = "Titre"
                                        
                                          const labelImage = document.createElement("label") as HTMLLabelElement
                                            labelImage.setAttribute("for", "image_link")
                                            labelImage.textContent = "Lien de l'image"
                                        
                                          const labelDuree = document.createElement("label") as HTMLLabelElement
                                            labelDuree.setAttribute("for", "time_duration")
                                            labelDuree.textContent = "Durée de préparation"
                                        
                                          const labelNote = document.createElement("label") as HTMLLabelElement
                                            labelNote.setAttribute("for", "note")
                                            labelNote.textContent = "Note"
                                        
                                          recetteSection.appendChild(formulaireModif);
                                        
                                          const titreInput = document.createElement("input") as HTMLInputElement
                                            titreInput.type = "text"
                                            titreInput.setAttribute("name", "titre")
                                            titreInput.setAttribute("class", "p-10")
                                            titreInput.value = recette.titre
                                        
                                          const imageLinkInput = document.createElement("input") as HTMLInputElement
                                            imageLinkInput.type = "text";
                                            imageLinkInput.setAttribute("name", "image_link")
                                            imageLinkInput.setAttribute("class", "p-10")
                                            imageLinkInput.value = recette.image_link;
                                        
                                          const durationInput = document.createElement("input") as HTMLInputElement
                                            durationInput.type = "text"
                                            durationInput.setAttribute("name", "time_duration")
                                            durationInput.setAttribute("class", "p-10")
                                            durationInput.value = recette.time_duration
                                        
                                          const noteInput = document.createElement("textarea") as HTMLTextAreaElement
                                            noteInput.setAttribute("name", "note")
                                            noteInput.setAttribute("class", "p-10")
                                            noteInput.value = recette.note
                                        
                                          formulaireModif.appendChild(input_form_sec_up)
                                            input_form_sec_up.appendChild(input_form_div_up)
                                              input_form_div_up.appendChild(labelTitre)
                                              input_form_div_up.appendChild(titreInput)
                                            input_form_sec_up.appendChild(input_form_div_bottom)
                                              input_form_div_bottom.appendChild(labelImage)
                                              input_form_div_bottom.appendChild(imageLinkInput)
                                        
                                          formulaireModif.appendChild(input_form_sec_bottom)
                                            input_form_sec_bottom.appendChild(input_form_div_up)
                                              input_form_div_up.appendChild(labelDuree)
                                              input_form_div_up.appendChild(durationInput)
                                            input_form_sec_bottom.appendChild(input_form_div_bottom)
                                              input_form_div_bottom.appendChild(labelNote)
                                              input_form_div_bottom.appendChild(noteInput)
                                        
                                          const submitBtn = document.createElement("button") as HTMLButtonElement;
                                            submitBtn.type = "submit";
                                            submitBtn.setAttribute("class", "w-30 btn")
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
                                              const response = await fetch(`${API}/${recette.id}`, {
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
                                        //ANCHOR - création de l'affichage
                                        timeP.textContent = recette.time_duration + " min."
                                        titreH1.textContent = recette.titre
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
                                }
        }   
 
    }catch (e) {
        console.log(e);
    }

}