const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
// storing the path of database into a variable by path module.
const dbPath = path.join(__dirname, "student.db");

// creating a database connect , storing the database connection object to a variable and staring the server
// to a port number..
let db = null;
const initializeDBAndServer = async () => {
  try {
    // storing the database connection object into db variable..
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    // creating the server and listen it into a port.
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(-1);
  }
};
initializeDBAndServer();

app.get("/", async (request, response) => {
  const sqldisplayQuery = `select * from student`;

  const data = await db.all(sqldisplayQuery);
  console.log(data);
  response.send(data);
});

console.log("this is ritik file");
