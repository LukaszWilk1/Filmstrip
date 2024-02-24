import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config"

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'filmstrip',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

db.connect();

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const port = 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
    await db.query("Select login FROM users", (err, resDb) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            if(resDb.rows.find(dbLogin => dbLogin.login === req.body.login)){
                res.send({isLoginTaken: true});
            } else {
                bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
                    if(err){
                        console.log(err.message);
                    } else {
                        db.query("INSERT INTO users (login, user_password) VALUES ($1, $2)", [req.body.login, hash]);
                    }
                })
                res.send({isLoginTaken: false});
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})