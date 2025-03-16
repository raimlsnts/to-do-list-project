require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "todo_db",
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});



app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  db.query(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [title, completed || false],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Database error");
        return;
      }
      res.status(201).json({ id: result.insertId, title, completed });
    }
  );
});


app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
});


app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("To-Do not found");
      return;
    }
    res.json(results[0]);
  });
});


app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Database error");
        return;
      }
      res.send("To-Do updated successfully");
    }
  );
});


app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
      return;
    }
    res.send("To-Do deleted successfully");
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
