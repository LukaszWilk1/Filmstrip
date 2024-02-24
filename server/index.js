import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors"
import "dotenv/config"

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'filmstrip',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

db.connect();

db.query("Select * FROM users", (err, res) => {
    if(err){
        console.log("Error: ", err.stack);
    } else {
        console.log("user data: ", res.rows);
    }
})

const port = 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
    console.log(req.body);
    await db.query("Select login FROM users", (err, resDb) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            console.log("user data: ", resDb.rows);
            if(resDb.rows.find(dbLogin => dbLogin.login === req.body.login)){
                res.send({isLoginTaken: true});
            } else {
                res.send({isLoginTaken: false});
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})