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

const port = 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
    await db.query("Select user_password, id FROM users WHERE login LIKE $1", [req.body.login], (err, resDb) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            const dataRows = resDb.rows;

            if(dataRows.length !== 0){
                bcrypt.compare(req.body.password, dataRows[0].user_password).then(result => {
                    if(result){
                        res.send({login: req.body.login, isPasswordCorrect: true, user_id: dataRows[0].id});
                    } else {
                        res.send({isPasswordCorrect: false});
                    }
                });
            } else{
                res.send({wrongUser: true});
            }
        }
    })
})

app.post("/register", async (req, res) => {
    await db.query("Select login FROM users", (err, resDb) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            if(resDb.rows.find(dbLogin => dbLogin.login === req.body.login)){
                res.send({isLoginTaken: true});
            } else {
                let id;
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    if(err){
                        console.log(err.message);
                    } else {
                        db.query("INSERT INTO users (login, user_password) VALUES ($1, $2)", [req.body.login, hash]);
                        db.query("SELECT id FROM users WHERE login LIKE $1", [req.body.login], (err, dataId) => {
                            if(err){
                                console.log("Error: ", err.stack);
                            } else {
                                id = dataId.rows[0].id;
                                res.send({isPasswordCorrect: true, login: req.body.login, user_id: id});
                            }
                        });
                    }
                })

            }
        }
    })
})

app.get("/comments", async(req, res) => {
    await db.query("SELECT users.login, users_comments.comment_text, users_comments.movie_id, users_comments.comment_id FROM users JOIN users_comments ON users.id = users_comments.user_id where users_comments.movie_id = $1 order by users_comments.comment_date desc;", [req.query.movieId], (err, dbRes) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            if(dbRes.rows.length!==0){
                res.send(dbRes.rows);
            }
        }
    });
})

app.post("/comments", async (req, res) => {
    await db.query("INSERT INTO users_comments (comment_text, user_id, movie_id) VALUES ($1, $2, $3);", [req.body.comment, req.body.userId, req.body.movieId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.put("/comments", async(req, res) => {
    await db.query("UPDATE users_comments SET comment_text = $1 WHERE comment_id = $2", [req.body.newComment, req.body.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.delete("/comments", async(req, res) => {
    await db.query("DELETE FROM users_comments WHERE comment_id=$1", [req.query.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.get("/seriesComments", async(req, res) => {
    await db.query("SELECT users.login, users_series_comments.comment_text, users_series_comments.series_id, users_series_comments.comment_id FROM users JOIN users_series_comments ON users.id = users_series_comments.user_id where users_series_comments.series_id = $1 order by users_series_comments.comment_date desc;", [req.query.seriesId], (err, dbRes) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            if(dbRes.rows.length!==0){
                res.send(dbRes.rows);
            }
        }
    });
});

app.post("/seriesComments", async (req, res) => {
    await db.query("INSERT INTO users_series_comments (comment_text, user_id, series_id) VALUES ($1, $2, $3);", [req.body.comment, req.body.userId, req.body.seriesId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.put("/seriesComments", async(req, res) => {
    await db.query("UPDATE users_series_comments SET comment_text = $1 WHERE comment_id = $2", [req.body.newComment, req.body.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.delete("/seriesComments", async(req, res) => {
    await db.query("DELETE FROM users_series_comments WHERE comment_id=$1", [req.query.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.post("/passwordChange", async(req, res) => {
    await db.query("UPDATE users SET user_password = $1 WHERE login = $2", [req.body.newPassword, req.body.login]);

    bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
        if(err){
            console.log(err.message);
        } else {
            await db.query("UPDATE users SET user_password = $1 WHERE login = $2", [hash, req.body.login]);
            res.send("Password changed")
        }
    });
});

app.delete("/deleteAccount", async(req, res) => {
    await db.query("Select user_password, id FROM users WHERE login LIKE $1", [req.query.login], (err, resDb) => {
        if(err){
            console.log("Error: ", err.stack);
        } else {
            const dataRows = resDb.rows;

            if(dataRows.length !== 0){
                bcrypt.compare(req.query.password, dataRows[0].user_password).then(result => {
                    if(result){
                        db.query("DELETE FROM users WHERE login = $1", [req.query.login], (err, resDb) => {
                            if(err){
                                console.log("ErrorL ", err.stack);
                            } else {
                                db.query("DELETE FROM users_comments WHERE user_id = $1", [dataRows[0].id], (err, resDb) => {
                                    if(err){
                                        console.log("Error: ", err.stack);
                                    } else {
                                        db.query("DELETE FROM users_series_comments WHERE user_id = $1", [dataRows[0].id], (err, resDb) => {
                                            if(err){
                                                console.log("Error: ", err.stack);
                                            } else {
                                                res.send({isPasswordCorrect: true});
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        res.send({isPasswordCorrect: false});
                    }
                });
            } else{
                res.send({wrongUser: true});
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})