
import express from "express"
import dotenv, { configDotenv } from "dotenv"
import cors from 'cors'
import ViteExpress from "vite-express"
import pg from "pg"



const apiUrlGetPost = "/api/recettes"
const apiUrlIdDeletIdPut = "/api/recettes/:id"



configDotenv()
const app = express()

app.use(express.json())

app.use(cors({
        origin: '*',
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }))


const { Client } = pg
const client = new Client({
    user: "tim",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "marmitop"
}) 


async function connect(){
    try{
        await client.connect()
        console.log(`connceted`)
    }catch (e){
        console.error(`connexion failed ${e}`);
        
    }
}
connect()

const portString = process.env.PORT

if(typeof portString === "string" && !isNaN(parseInt(portString))){
    const PORT = parseInt(portString)

    app.get(`${apiUrlGetPost}`, async (_, res) => {
        try{ 
            const resultat = await client.query("select * from recette")
            res.json(resultat.rows)
        }catch(e){
            console.log(e)
        }
    })

    app.post(`${apiUrlGetPost}`, async (req, res) => {
        try {
          const { titre, image_link, time_duration, note } = req.body;
          
          const resultat = await client.query(
            "INSERT INTO recette (titre, image_link, time_duration, note) VALUES ($1, $2, $3, $4) RETURNING *",
            [titre, image_link, time_duration, note]
          );
      
          res.json(resultat.rows[0]);
        } catch (e) {
          console.error("Erreur lors de l'ajout de la recette :", e);
          res.status(500).json({ error: "Erreur lors de l'ajout de la recette" });
        }
    });
      
    app.delete(`${apiUrlIdDeletIdPut}`, async (req, res) => {
        const recetteId = req.params.id
        try{
            const resultat = await client.query("DELETE FROM recette WHERE id = $1",
            [recetteId]
            )
            if(resultat.rowCount === 0){
                return res.status(404).json({message: "Recette n'existe pas dans la base de donnée"})
            }
            res.json({ message: "Recette supprimée avec succès" })
        }catch(e){
            console.log(`olala : ${e}`);
            res.status(500).json({ error: "Erreur lors de la suppression de la recette" });
        }
    })

    app.put(`${apiUrlIdDeletIdPut}`, async (req, res) => {
        const recetteId = req.params.id
        const {titre, image_link, time_duration, note, posting_date} = req.body
        try {
            const recetteActuelle = await client.query("SELECT * FROM recette WHERE id = $1", [recetteId]);
    
            if (recetteActuelle.rowCount === 0) {
                return res.status(404).json({ message: "Recette non trouvée" });
            }
    
            const recetteCourante = recetteActuelle.rows[0];
    
            // Fusionnez les valeurs de la demande avec les valeurs actuelles de la recette
            const { titre, image_link, time_duration, note, posting_date } = req.body;
            const nouvelleRecette = {
                titre: titre || recetteCourante.titre,
                image_link: image_link || recetteCourante.image_link,
                time_duration: time_duration || recetteCourante.time_duration,
                note: note || recetteCourante.note,
                posting_date: posting_date || recetteCourante.posting_date,
            };
    
            // Effectuez la mise à jour en utilisant les valeurs fusionnées
            const resultat = await client.query(
                "UPDATE recette SET titre = $2, image_link = $3, time_duration = $4, note = $5, posting_date = $6 WHERE id = $1",
                [recetteId, nouvelleRecette.titre, nouvelleRecette.image_link, nouvelleRecette.time_duration, nouvelleRecette.note, nouvelleRecette.posting_date]
            );
    
            res.json({ message: "Mise à jour réussie" });
        } catch (e) {
            console.log("Erreur lors de la mise à jour", e);
            res.status(500).json({ error: "Erreur lors de la mise à jour de la recette" });
        }
    });

    app.listen(PORT, () => {
        console.log(`server est sur le port: ${PORT}`);
        
    })
}else{
    const PORT = 4004
    console.log(`serveru se lance sur le port : ${PORT}`);
    
}
