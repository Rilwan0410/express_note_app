const express = require("express");
const app = express();
const path = require("path");
const { readFileSync, readFile, writeFile } = require("fs");
notes = require("./db/db.json");
port = 3000;
//=================================================================================================================================================
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
  const { id, title, text } = req.body;

  notes.push({
    id,
    title,
    text,
  });

  writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

//=================================================================================================================================================
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
