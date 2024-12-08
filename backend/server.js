const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.post("/notes", (req, res) => {
    const { content } = req.body;
    const newNote = { id: notes.length + 1, content, completed: false };
    notes.push(newNote);
    res.json(newNote);
});

app.put("/notes/:id", (req, res) => {
    const { id } = req.params;
    const note = notes.find((n) => n.id == id);
    if (note) {
        note.completed = !note.completed;
        res.json(note);
    } else {
        res.status(404).json({ message: "Not bulunamadı" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server çalışıyor: http://localhost:${PORT}`));
