import { Sequelize, DataTypes, Model } from 'sequelize';


const sequelize = new Sequelize('marmitop', 'tim', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5050,
});


class Recette extends Model {
  titre!: string;
  image_link!: string;
  time_duration!: string;
  note!: string;
}

Recette.init(
  {
    titre: DataTypes.STRING,
    image_link: DataTypes.STRING,
    time_duration: DataTypes.STRING,
    note: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'recette', 
  }
);


sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});


export async function fetchData() {
  try {
    const recettes = await Recette.findAll();

    recettes.forEach((recette) => {
        const outputSection = document.getElementById('output_section')
            
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
    });
  } catch (e) {
    console.error('Erreur lors de la requête Sequelize :', e);
  }
}

fetchData();

