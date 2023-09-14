import { Sequelize, DataTypes, Model } from 'sequelize';

// Connexion à la base de données postgres
const sequelize = new Sequelize('marmitop', 'tim', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5050,
});

// Définissez le modèle de la table recette
class Recette extends Model {
  // Déclarez les types pour chaque colonne de la table
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
    modelName: 'recette', // Le nom de la table dans la base de données
  }
);

// Nous synchronisons le modèle avec la base de données en utilisant sequelize.sync(). Cela créera automatiquement la table "recette" dans la base de données si elle n'existe pas déjà.
sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

// Dans la fonction fetchData(), nous utilisons Sequelize pour récupérer toutes les recettes de la base de données à l'aide de Recette.findAll(). Cela renvoie un tableau de toutes les recettes.
async function fetchData() {
  try {
    const recettes = await Recette.findAll();
    console.log(recettes);

    recettes.forEach((recette) => {
      const outputSection = document.getElementById('output_section');

      const recetteSection = document.createElement('div') as HTMLDivElement;
      recetteSection.setAttribute('class', 'flex-row m-50');

      const recetteTextItem = document.createElement('div') as HTMLDivElement;
      recetteTextItem.setAttribute('class', 'column_center w-40');

      const recetteImageItem = document.createElement('div') as HTMLDivElement;
      recetteImageItem.setAttribute('class', 'w-40');

      const imageRecipe = document.createElement('img') as HTMLImageElement;
      const titreH1 = document.createElement('h1');
      const timeP = document.createElement('p') as HTMLParagraphElement;
      const noteP = document.createElement('p') as HTMLParagraphElement;

      titreH1.textContent = recette.titre;
      timeP.textContent = recette.time_duration;
      noteP.textContent = recette.note;
      imageRecipe.setAttribute('src', recette.image_link);
      imageRecipe.setAttribute('class', 'img');
      outputSection?.appendChild(recetteSection);
      recetteSection.appendChild(recetteImageItem);
      recetteSection.appendChild(recetteTextItem);
      recetteImageItem.appendChild(imageRecipe);
      recetteTextItem.appendChild(titreH1);
      recetteTextItem.appendChild(timeP);
      recetteTextItem.appendChild(noteP);
    });
  } catch (e) {
    console.error('Erreur lors de la requête Sequelize :', e);
  }
}

fetchData();
