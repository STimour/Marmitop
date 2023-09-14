
import express from "express"
import dotenv, { configDotenv } from "dotenv"
import cors from 'cors'
import ViteExpress from "vite-express"
import pg from "pg"





configDotenv()
const app = express()

app.use(express.json())

app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET','POST']
    }))


const { Client } = pg
const client = new Client({
    user: "tim",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "marmitop"
}) 


connect()
async function connect(){
    try{
        await client.connect()
        console.log(`connceted`)
    }catch (e){
        console.error(`connexion failed ${e}`);
        
    }
}

const portString = process.env.PORT

if(typeof portString === "string" && !isNaN(parseInt(portString))){
    const PORT = parseInt(portString)

    app.get("/", async (_, res) => {
        try{ 
            const resultat = await client.query("select * from recette")
            res.json(resultat.rows)
        }catch(e){
            console.log(e)
        }
    })

    app.post("/ajouter-recette", async (req, res) => {
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
      

    app.listen(PORT, () => {
        console.log(`server est sur le port: ${PORT}`);
        
    })
}else{
    const PORT = 4004
    console.log(`serveru se lance sur le port : ${PORT}`);
    
}
