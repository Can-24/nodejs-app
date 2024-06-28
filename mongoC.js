//Importiere das MongoClient-Modul aus dem mongodb-Paket
const { MongoClient } = require("mongodb");
require('dotenv').config()
//Kodiert das Passwort aus der Umgebungsvariable MONGO_PASSWORD und trimmt Leerzeichen
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
//Erstelle die Verbindungszeichenfolge für die MongoDB-Atlas-Datenbank mit dem kodierten Passwort
const connectionString = `mongodb+srv://edgeofmana:${password}@thesis.kbytfhy.mongodb.net/?retryWrites=true&w=majority`;
//Asynchrone Funktion zum Verbinden mit der MongoDB-Datenbank
async function connectToDatabase() {
  //Erstelle eine neue Instanz des MongoClient mit der Verbindungszeichenfolge
  const client = new MongoClient(connectionString);
  try {
    //Versuche, eine Verbindung zur Datenbank herzustellen
    await client.connect();
    console.log("Connection successful");
    //Wähle die Datenbank "users" aus
    const db = client.db("users");
    //Gebe die Datenbankverbindung zurück
    return db;
  } catch (e) {
    //Wenn die Verbindung fehlschlägt, logge den Fehler und wirf ihn erneut
    console.error("Connection failed:", e);
    throw e;
  }
}
//Exportiere die connectToDatabase-Funktion, damit sie in anderen Modulen verwendet werden kann
module.exports = connectToDatabase;