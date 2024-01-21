const express = require("express");
const app = express();
const path = require("path");
const { writeFileSync, writeFile } = require("fs");
let notes = require("./db/db.json");
port = process.env.PORT || 3000;
//==================================================================================================================================================
app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  console.log("/notes | working");

  return res.sendFile(path.resolve("public", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log("/api/notes | working");
  writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
    if (err) console.log(err);
  });
  return res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  console.log("post | /api/notes | working");
  const { id, title, text } = req.body;

  let newNote = { id, title, text };
  notes.push(newNote);
  return res.status(200).json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  console.log("delete | works");
  const deleteNote = notes.find((note) => {
    return note.id == id;
  });

  if (!deleteNote) {
    return;
  }

  newNotes = notes.filter((note) => {
    return note.id != id;
  });

  notes = newNotes;

  return res.json(newNotes);
});

app.get("*", (req, res) => {
  return res.sendFile(path.resolve("public", "index.html"));
});
//=================================================================================================================================================
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
