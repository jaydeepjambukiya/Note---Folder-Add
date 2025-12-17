let trash = JSON.parse(localStorage.getItem("trash")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const trashList = document.getElementById("trashList");

function displayTrash() {
  trashList.innerHTML = "";

  if (trash.length === 0) {
    trashList.innerHTML = `<p class="text-muted">Trash is empty</p>`;
    return;
  }

  trash.forEach((n, i) => {
    trashList.innerHTML += `
      <div class="col-md-3">
        <div class="note-card ${n.color}">
          <h6>${n.title}</h6>
          <p class="small">${n.text}</p>

          <div class="d-flex justify-content-end gap-2 mt-2">
            <button class="btn btn-sm btn-success"
              onclick="restoreNote(${i})">
              Restore
            </button>
            <button class="btn btn-sm btn-danger"
              onclick="deleteForever(${i})">
              Delete
            </button>
          </div>
        </div>
      </div>`;
  });
}

/* Restore Note */
function restoreNote(index) {
  notes.push(trash[index]);
  trash.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("trash", JSON.stringify(trash));

  displayTrash();
}

/* Delete Forever */
function deleteForever(index) {
  if (confirm("Delete permanently?")) {
    trash.splice(index, 1);
    localStorage.setItem("trash", JSON.stringify(trash));
    displayTrash();
  }
}

displayTrash();
