// Dependencies
const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("public"));

// Setting the port for the application
const PORT = process.env.PORT || 3000;

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db",
});

connection.connect(err => {
    if (err) {
        console.err(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// Begin our server to listen to client request
app.listen(PORT, () => console.log(`Server listening on: http://locahost:${PORT}`));