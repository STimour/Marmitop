
import express from "express"
import dotenv, { configDotenv } from "dotenv"
import cors from 'cors'
import ViteExpress from "vite-express"
import pg from "pg"

configDotenv()
const app = express()

const { Client } = pg
const client = new Client({
    user: "tim",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "marmitop"
}) 
app.use(cors())

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

    app.listen(PORT, () => {
        console.log(`server est sur le port: ${PORT}`);
        
    })
}else{
    const PORT = 4004
    console.log(`serveru se lance sur le port : ${PORT}`);
    
}
