import express from "express";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "filmstrip",
    password: "Kenough321",
    port: 5432,
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})