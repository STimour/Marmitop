import { fetchRecette } from "./fetchRecette"

export let detailRecette = false
export let idRecette: number | null = null;
const apiUrlGetPost = "http://localhost:1024/api/recettes"

export async function fetchData(){
    try{
        const response = await fetch(`${apiUrlGetPost}`)
        if(!response.ok){
            throw new Error("Get n'a pas marché")
        }
        const data = await response.json()
        console.log(data)
        let outputSection = document.getElementById('output_section');

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
                const ajoutP =  document.createElement("p") as HTMLParagraphElement

                titreH1.textContent = recette.titre
                timeP.textContent = recette.time_duration + " min."
      
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
              

                recetteSection.addEventListener("mouseenter", () => {
                  recetteSection.style.backgroundColor = "lightgray";
                  recetteSection.style.cursor = "pointer"; 
                });
                
                recetteSection.addEventListener("mouseleave", () => {
                  recetteSection.style.backgroundColor = "";
                });

              
                recetteSection.addEventListener("click", async (e) => {
                  e.preventDefault()
                  idRecette = recette.id
                  detailRecette = true
                  fetchRecette()
                })

            })

        }else{
            console.error("L'élément 'output_section' n'a pas été trouvé.")
        }
   
}catch(e){
  console.log(e)
}
}