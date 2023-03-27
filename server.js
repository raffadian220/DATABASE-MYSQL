const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views"); //views pertama template ejs, dan views kedua folder

const db = mysql.createConnection({
  host: "localhost",
  database: "tievy",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected");

  const sql = `SELECT * FROM tievy`;

  //untuk get data
  app.get("/", (req, res) => {
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "Ceritanya Daftar Murid" });
    });
  });

  // untuk insert data
  app.post("/add", (req, res) => {
    const insertSql = `INSERT INTO tievy (name, Class) VALUES('${req.body.nama}', '${req.body.kelas}')`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("server ready");
});
