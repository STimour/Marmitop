const apiUrl = "http://localhost:1024/"

async function fetchData() {
    try{
        const response = await fetch(`${apiUrl}`)
        if(!response.ok){
            throw new Error("Get n'a pas marché")
        }
        const data = await response.json()
        console.log(data)
   
        data.forEach((recette: { 
                                    titre: string, 
                                    image_link: string, 
                                    time_duration: string, 
                                    note: string}) => {
            const outputSection = document.getElementById('output_section')
            
            const recetteSection = document.createElement('div') as HTMLDivElement
                recetteSection.setAttribute("class","flex-row m-50")
                                
            const recetteTextItem =  document.createElement('div') as HTMLDivElement
                recetteTextItem.setAttribute("class", "column_center w-40")
                                
            const recetteImageItem =  document.createElement('div') as HTMLDivElement
                recetteImageItem.setAttribute("class", "w-40")
                                        
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
            recetteSection.appendChild(recetteImageItem)
            recetteSection.appendChild(recetteTextItem)
            recetteImageItem.appendChild(imageRecipe)
            recetteTextItem.appendChild(titreH1)
            recetteTextItem.appendChild(timeP)
            recetteTextItem.appendChild(noteP)

        })
    }catch(e){
        console.error('Erreur lors de la requête GET :', e);
        
    }
}

fetchData()