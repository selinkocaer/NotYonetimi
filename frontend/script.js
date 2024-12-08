const API_URL = "http://localhost:5000/notes";

async function fetchNotes() {
    const response = await fetch(API_URL);
    const notes = await response.json();
    displayNotes(notes);
}

function displayNotes(notes) {
    const incompleteNotes = document.getElementById("incompleteNotes");
    const completedNotes = document.getElementById("completedNotes");

    incompleteNotes.innerHTML = "";
    completedNotes.innerHTML = "";

    notes.forEach((note) => {
        const li = document.createElement("li");
        li.textContent = note.content;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = note.completed ? "Tamamlanmadı" : "Tamamlandı";
        toggleBtn.addEventListener("click", async () => {
            await toggleNoteCompletion(note.id);
            fetchNotes();
        });

        li.appendChild(toggleBtn);
        if (note.completed) {
            completedNotes.appendChild(li);
        } else {
            incompleteNotes.appendChild(li);
        }
    });
}

async function toggleNoteCompletion(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
}

document.getElementById("addNoteBtn").addEventListener("click", async () => {
    const noteInput = document.getElementById("noteInput");
    const content = noteInput.value;

    if (content.trim()) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });
        noteInput.value = "";
        fetchNotes();
    }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const notes = document.querySelectorAll("li");
    notes.forEach((note) => {
        const content = note.textContent.toLowerCase();
        note.style.display = content.includes(searchValue) ? "flex" : "none";
    });
});

fetchNotes();
