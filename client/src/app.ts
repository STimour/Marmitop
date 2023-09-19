import { fetchData } from "./fetchData";
import { formulaire } from "./form"


fetchData()


window.addEventListener('load', () => {

    fetchData(); // Afficher la liste des recettes    
})


formulaire()