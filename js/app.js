/* ================= NOTES ================= */

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteList   = document.getElementById("notesList");
const savebtn    = document.getElementById("savebtn");
const noteTitle  = document.getElementById("noteTitle");
const noteText   = document.getElementById("noteText");
const editIndex  = document.getElementById("editIndex");
const noteModal  = document.getElementById("noteModal");

/* Display Notes */
function displayNotes() {
  noteList.innerHTML = "";

  notes.forEach((n, i) => {
    noteList.innerHTML += `
      <div class="col-md-3">
        <div class="note-card ${n.color} animate-note">
          <i class="bi bi-stickies-fill note-icon"></i>
          <h6 class="mt-2">${n.title}</h6>
          <p class="small">${n.text}</p>

          <div class="d-flex justify-content-end gap-2 mt-2">
            <button class="btn btn-sm btn-outline-primary" onclick="editNote(${i})">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteNote(${i})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

/* Save Note */
savebtn.addEventListener("click", () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    return alert("Fill all fields");
  }

  const colors = ["soft-blue", "soft-Pink", "soft-yellow"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const data = {
    title: noteTitle.value.trim(),
    text: noteText.value.trim(),
    color
  };

  if (editIndex.value === "") {
    notes.push(data);
  } else {
    notes[editIndex.value] = data;
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  noteTitle.value = "";
  noteText.value  = "";
  editIndex.value = "";

  bootstrap.Modal.getInstance(noteModal).hide();
  displayNotes();
});

/* Edit Note */
function editNote(i) {
  noteTitle.value = notes[i].title;
  noteText.value  = notes[i].text;
  editIndex.value = i;

  new bootstrap.Modal(noteModal).show();
}

/* Delete Note */
function deleteNote(i) {
  if (confirm("Delete this note?")) {
    notes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }
}

/* ================= DARK MODE ================= */

const darkToggle = document.getElementById("darkToggle");

/* Load mode */
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}

/* Toggle */
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
});

/* ================= FOLDERS ================= */

let folders = JSON.parse(localStorage.getItem("folders")) || [];

const folderList  = document.getElementById("folderList");
const folderName  = document.getElementById("folderName");
const saveFolder  = document.getElementById("saveFolder");
const folderModal = document.getElementById("folderModal");

function displayFolders() {
  folderList.innerHTML = "";

  folders.forEach((f) => {
    folderList.innerHTML += `
      <div class="col-md-3">
        <div class="folder-card ${f.color} animate-folder">
          <h6>${f.name}</h6>
          <p class="small text-muted">${f.date}</p>
        </div>
      </div>
    `;
  });

  /* Add Folder Card */
  folderList.innerHTML += `
    <div class="col-md-3">
      <div class="folder-card add-folder animate-folder" onclick="openFolderModal()">
        <i class="bi bi-folder-plus fs-1"></i>
        <p class="small">New Folder</p>
      </div>
    </div>
  `;
}

/* Open Folder Modal */
function openFolderModal() {
  folderName.value = "";
  new bootstrap.Modal(folderModal).show();
}

/* Save Folder */
saveFolder.addEventListener("click", () => {
  if (!folderName.value.trim()) {
    return alert("Enter folder name");
  }

  const colors = ["soft-blue", "soft-Pink", "soft-yellow"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  folders.push({
    name: folderName.value.trim(),
    date: new Date().toLocaleDateString(),
    color
  });

  localStorage.setItem("folders", JSON.stringify(folders));
  bootstrap.Modal.getInstance(folderModal).hide();
  displayFolders();
});

/* ================= INIT ================= */
displayNotes();
displayFolders();
