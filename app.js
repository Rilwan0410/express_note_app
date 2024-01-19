const express = require("express");
const app = express();
const path = require("path");
const { readFileSync, readFile, writeFile } = require("fs");
notes = require("./db/db.json");
port = 3000;
//=================================================================================================================================================
console.log(notes);
app.use(express.static("public"));
// app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get("/notes", async (req, res) => {
  res.sendFile(path.resolve("public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.status(200).json({ notes });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const { id, title, text } = req.body;
  notes.push({
    id,
    title,
    text,
  });
  writeFile("./db/db.json", notes, (err) => {
    if (err) {
      console.log(err);
    }
  });
  // return res.send('<h1>Posted</h1>')
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

//=================================================================================================================================================
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
