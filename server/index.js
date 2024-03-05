import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new pg.Client({
    user: 'filmstrip_user',
    host: 'dpg-cnjkquen7f5s73fa17o0-a.frankfurt-postgres.render.com',
    database: 'filmstrip',
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    ssl: true
});

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TOKEN
    }
  };

db.connect();

const saltRounds = 10;

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/filmstrip/build')));

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/filmstrip/build", "index.html"));
});

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
                    };
                });
            };
        };
    });
});

app.get("/", (req,res) => {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => {
            res.send(response);
        })
        .catch(err => console.error(err))
});

app.get("/movies", (req, res) => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get("/series", (req, res) => {
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.error(err);
        });
});

app.post("/search", (req,res) => {
    fetch(`https://api.themoviedb.org/3/search/multi?query=${req.body.search}&include_adult=true&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
            res.send(response);
        })
        .catch(err => {
          console.error(err);
        });
})

app.get("/movie/:movieId", async (req, res) => {

    const movieData = {
        movieData: null,
        comments: null
    };

    try {
        const movieApiResponse = await fetch(`https://api.themoviedb.org/3/movie/${req.params.movieId}?language=en-US`, options);
        const movieApiData = await movieApiResponse.json();

        movieData.movieData = movieApiData;

        const dbResponse = await new Promise((resolve, reject) => {
            db.query("SELECT users.login, users_comments.comment_text, users_comments.movie_id, users_comments.comment_id FROM users JOIN users_comments ON users.id = users_comments.user_id where users_comments.movie_id = $1 order by users_comments.comment_date desc;", [req.params.movieId], (err, dbRes) => {
                if (err) {
                    console.log("Error: ", err.stack);
                    reject(err);
                } else {
                    resolve(dbRes.rows);
                }
            });
        });

        if (dbResponse.length !== 0) {
            movieData.comments = dbResponse;
        }

        res.send(movieData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/movie/:movieId", async (req, res) => {
    await db.query("INSERT INTO users_comments (comment_text, user_id, movie_id) VALUES ($1, $2, $3);", [req.body.comment, req.body.userId, req.params.movieId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.put("/movie/:movieId", async(req, res) => {
    await db.query("UPDATE users_comments SET comment_text = $1 WHERE comment_id = $2", [req.body.newComment, req.body.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.delete("/movie/:movieId", async(req, res) => {
    await db.query("DELETE FROM users_comments WHERE comment_id=$1", [req.query.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.get("/series/:seriesId", async(req, res) => {

    const seriesData = {
        movieData: null,
        comments: null
    };

    try {
        const seriesApiResponse = await fetch(`https://api.themoviedb.org/3/tv/${req.params.seriesId}?language=en-US`, options);
        const seriesApiData = await seriesApiResponse.json();

        seriesData.movieData = seriesApiData;

        const dbResponse = await new Promise((resolve, reject) => {
            db.query("SELECT users.login, users_series_comments.comment_text, users_series_comments.series_id, users_series_comments.comment_id FROM users JOIN users_series_comments ON users.id = users_series_comments.user_id where users_series_comments.series_id = $1 order by users_series_comments.comment_date desc;", [req.params.seriesId], (err, dbRes) => {
                if (err) {
                    console.log("Error: ", err.stack);
                    reject(err);
                } else {
                    resolve(dbRes.rows);
                }
            });
        });

        if (dbResponse.length !== 0) {
            seriesData.comments = dbResponse;
        }

        res.send(seriesData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

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

app.post("/series/:seriesId", async (req, res) => {
    await db.query("INSERT INTO users_series_comments (comment_text, user_id, series_id) VALUES ($1, $2, $3);", [req.body.comment, req.body.userId, req.params.seriesId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.put("/series/:seriesId", async(req, res) => {
    await db.query("UPDATE users_series_comments SET comment_text = $1 WHERE comment_id = $2", [req.body.newComment, req.body.commentId], (err, dbRes) => {
        if(err){
            console.log(err.stack);
        } else {
            res.send("data send successfully");
        };
    });
});

app.delete("/series/:seriesId", async(req, res) => {
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
});

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/filmstrip/build", "index.html"));
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})