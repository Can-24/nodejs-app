//Importiere die notwendigen Module: Express, Body-Parser und CORS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Importiere die Funktion zur Verbindung mit der MongoDB-Datenbank
const connectToDatabase = require('./mongoC');

//Lege den Port fest, auf dem der Server lauschen soll
const port = 4000;

//Erstelle eine neue Express-Anwendung
const app = express();

//Aktiviere CORS für alle Routen
app.use(cors());

//Middleware zur Analyse von URL-kodierten Daten
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware zur Analyse von JSON-Daten
app.use(bodyParser.json());

//Definiere eine Route für die Basis-URL
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

// Definiere eine Route zum Hinzufügen eines neuen Benutzers
app.post('/addUser', async (req, res) => {
  try {
    //Stelle eine Verbindung zur Datenbank her
    const db = await connectToDatabase();
    //Greife auf die "users"-Sammlung zu
    let collection = db.collection("users");
    //Hole die Daten aus dem Request-Body
    let newDocument = req.body;
    //Füge das aktuelle Datum zum Dokument hinzu
    newDocument.date = new Date();
    //Füge das neue Dokument zur Sammlung hinzu
    let result = await collection.insertOne(newDocument);
    console.log("req" + req.body);
    //Sende eine Erfolgsantwort mit Statuscode 201 (Created)
    res.status(201).send(result);
  } catch (error) {
    //Logge den Fehler und sende eine Fehlerantwort mit Statuscode 500 (Internal Server Error)
    console.error("Error adding user:", error);
    res.status(500).send({ error: 'Failed to add user' });
  }
});

//Definiere eine Route zum Abrufen aller Benutzer
app.get('/getUsers', async (req, res) => {
  try {
    //Stelle eine Verbindung zur Datenbank her
    const db = await connectToDatabase();
    //Greife auf die "users"-Sammlung zu
    let collection = db.collection("users");
    //Finde alle Dokumente in der Sammlung und konvertiere sie in ein Array
    let results = await collection.find({}).toArray();
    //Sende eine Erfolgsantwort mit den Ergebnissen und Statuscode 200 (OK)
    res.status(200).send(results);
  } catch (error) {
    //Logge den Fehler und sende eine Fehlerantwort mit Statuscode 500 (Internal Server Error)
    console.error("Error getting users:", error);
    res.status(500).send({ error: 'Failed to get users' });
  }
});

//Starte den Server und höre auf dem festgelegten Port
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
