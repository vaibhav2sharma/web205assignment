const files = [
  { id: 1, name: "document", type: "txt" },
  { id: 2, name: "Music", type: "MP3" },
  { id: 3, name: "Video", type: "MP4" },
  { id: 4, name: "Presentation", type: "PPT" },
  { id: 5, name: "document", type: "txt" },
];

const recycleBin = [];
const history = [];

function displayFiles() {
  const fileList = document.getElementById("files");
  fileList.innerHTML = "";

  files.forEach((file) => {
    fileList.innerHTML += `
        <li>
        <span>${file.name}.${file.type}</span>
        <div>

        <button onclick="editFile(${file.id})">Edit</button>
        <button onclick="deleteFile(${file.id})">Delete</button>


        </div>
        
        </li>
        
        
        
        `;
  });
}

function deletefile(id) {
  const index = files.findIndex((file) => file.id === id);

  if (index !== -1) {
    recycleBin.push(files[index]);
    history.push(`Deleted:${files[index].name}.${files[index].type}`);
    files.splice(index, 1);
    displayFiles();
    displayBin();
  }
}

function editFile(id) {
  const newName = prompt("Enter new file name :");
  if (newName) {
    const file = files.find((file) => file.id === id);
    history.push(`Renamed: ${file.name} to ${newName}`);
    file.name = newName;
    displayFiles();
  }
}

function displayBin() {
  const binList = document.getElementById("bin-files");
  binList.innerHTML = "";
  recycleBin.forEach((file, index) => {
    binList.innerHTML += `
        
        <li>

        <span>${file.name}.${file.type}</span>
        <button onclick="restoredFile(${index})">Restore</button>



        </li>
        
        
        
        
        
        `;
  });
}

function restoreFile(index) {
  files.push(recycleBin[index]);
  history.push(`Restored:${recycleBin[index]}`);
  recycleBin.splice(index, 1);
  displayFiles();
  displayBin();
}

function clearBin() {
  history.push(`Cleared bin with${recycleBin.length} files `);
  recycleBin.length = 0;
  displayBin();
}

function viewHistory() {
  alert(history.join("\n") || "No history recorded");
}

document.getElementById("search").addEventListener("input", function (e) {
  const searchQuery = e.target.value.toLowerCase();
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery)
  );

  const fileList = document.getElementById("files");

  fileList.innerHTML = "";
  filteredFiles.forEach((file) => {
    fileList.innerHTML += `
        <li>

        <span>${file.name}.${file.type}</span>

        <div>
        
        <button onclick="editFile(${file.id})">Edit</button>
        <button onclick="deleteFile(${file.id})">Delete</button>


        </div>




        </li>
        
        
        
        
        
        `;
  });
});

displayFiles();
