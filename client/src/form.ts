import { fetchData } from "./fetchData"

const apiUrlGetPost = "http://localhost:1024/api/recettes"

export function formulaire() {
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
}
