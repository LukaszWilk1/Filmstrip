# Filmstrip
## Overview
Filmstrip is my first fullstack project. It is simple web application made using PERN stack, using TMDB API. On filmstrip you can easilly find favourite movies, series and get all necesarry information about them. I provided simple login authentication. On filmstrip you can discuss with other users about your favourite movies!
## Instalation
Clone repository
```
git clone https://github.com/LukaszWilk1/Filmstrip.git
```
Install Dependecies (while in root folder)
```
cd Filmstrip/client/filmstrip && npm install && cd ../../server && npm install
```
Run application in development
```
docker compose up -d
```
Run application in production
```
docker-compose -f docker-compose.prod.yaml up --build
```
WARNING: BEFORE CHANGING ENVIRONMENT RUN: DOCKER CONTAINER PRUNE
```
## Tehchnologies
🔧 Filmstrip is a fullstack application built using the PERN stack.

🔗 It utilizes React Router for seamless navigation between pages.

🔒 Private routes are implemented to restrict access to unauthorized users.

🔐 The login and registration system employs bcrypt hashing and salting for secure password storage in a PostgreSQL database.

🎥 Movie data is fetched from the TMDB service using their API. Fetch requests are made on the Express.js server in a Node.js environment.

📡 Data from the server is transmitted to the client using Axios.

🛠️ The Express.js server utilizes middleware such as body-parser.

💬 Users can add, edit, and delete comments stored in the PostgreSQL database.

🔍 Film search functionality is available in the search bar.

🔑 Users can also change their passwords and delete their accounts.

✨ Tailwind CSS was used to make the user interface more engaging.

## Credits
This application was built using [TMDB API](https://www.themoviedb.org/?language=pl)

