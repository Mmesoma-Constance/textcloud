const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const searchBar = document.getElementById("search-bar");
const resultContainer = document.getElementById("results");

const texts = [];

// let noteContent = notesContainer.innerHTML;

// function showNotes() {
//   noteContent = localStorage.getItem("notes");
// }
// showNotes();

// function updateStorage() {
//   localStorage.setItem("notes", noteContent);
// }

window.addEventListener("load", showNotes);

createBtn.addEventListener("click", () => {
  createNote();
});

searchBar.addEventListener("input", handleSearch);

function createNote() {
  let inputBox = document.createElement("div");
  let contentBox = document.createElement("div");
  let img = document.createElement("img");
  let time = document.createElement("span");
  let br = document.createElement("br");

  //
  inputBox.className = "input-box";
  contentBox.className = "contentBox";
  time.className = "time";
  contentBox.setAttribute("contenteditable", true);

  //
  img.src = "images/del2.png";
  let now = new Date();
  let date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let timer = now.toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  time.textContent = `${date}, ${timer}`;
  //
  inputBox.appendChild(time);
  inputBox.appendChild(br);
  inputBox.appendChild(contentBox);
  inputBox.appendChild(img);

  notesContainer.prepend(inputBox);

  //   texts.push(inputBox);

  contentBox.focus();

  contentBox.addEventListener("input", updateStorage);
}

function handleSearch() {
  const query = searchBar.value.toLowerCase();
  document.querySelectorAll(".input-box").forEach((inputBox) => {
    const contentBox = inputBox.querySelector(".contentBox");
    const time = inputBox.querySelector("span").textContent.toLowerCase();
    const content = contentBox.textContent.toLowerCase();
    if (content.includes(query) || time.includes(query)) {
      inputBox.classList.remove("hidden");
      highlightText(contentBox, query);
      highlightText(inputBox.querySelector("span"), query);
    } else {
      inputBox.classList.add("hidden");
      removeHighlight(contentBox);
      removeHighlight(inputBox.querySelector("span"));
    }
  });
}

// highlight text
function highlightText(contentBox, query) {
  const content = contentBox.textContent;
  const regex = new RegExp(`(${query})`, "gi");
  const highlighted = content.replace(
    regex,
    '<span class="highlight">$1</span>'
  );
  contentBox.innerHTML = highlighted;
}

function removeHighlight(contentBox) {
  // contentBox.innerHTML = contentBox.innerHTML.replace(
  //   /<span class="highlight">(.*?)<\/span>/gi,
  //   "$1"
  // );

  const text = contentBox.textContent;
  contentBox.innerHTML = text;
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}

document.querySelectorAll("contentBox").forEach((contentBox) => {
  contentBox.addEventListener("input", updateStorage);
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

////////////////////////////////////////////////////////////////////////////

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const searchBar = document.getElementById("search-bar");
const resultContainer = document.getElementById("results");

const texts = [];

// let noteContent = notesContainer.innerHTML;

// function showNotes() {
//   noteContent = localStorage.getItem("notes");
// }
// showNotes();

// function updateStorage() {
//   localStorage.setItem("notes", noteContent);
// }

window.addEventListener("load", showNotes);

createBtn.addEventListener("click", () => {
  createNote();
});

searchBar.addEventListener("input", handleSearch);

function createNote() {
  let inputBox = document.createElement("div");
  let contentBox = document.createElement("div");
  let img = document.createElement("img");
  let time = document.createElement("span");
  let br = document.createElement("br");

  //
  inputBox.className = "input-box";
  contentBox.className = "contentBox";
  time.className = "time";
  contentBox.setAttribute("contenteditable", true);

  //
  img.src = "images/del2.png";
  let now = new Date();
  let date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let timer = now.toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  time.textContent = `${date}, ${timer}`;
  //
  inputBox.appendChild(time);
  inputBox.appendChild(br);
  inputBox.appendChild(contentBox);
  inputBox.appendChild(img);

  notesContainer.insertBefore(inputBox, notesContainer.firstChild);

  //   texts.push(inputBox);

  contentBox.focus();

  contentBox.addEventListener("input", () => {
    updateStorage(inputBox);
  });

  updateStorage(inputBox);
}

function handleSearch() {
  const query = searchBar.value.toLowerCase();
  document.querySelectorAll(".input-box").forEach((inputBox) => {
    const contentBox = inputBox.querySelector(".contentBox");
    const time = inputBox.querySelector("span").textContent.toLowerCase();
    const content = contentBox.textContent.toLowerCase();
    if (content.includes(query) || time.includes(query)) {
      inputBox.classList.remove("hidden");
      highlightText(contentBox, query);
      highlightText(inputBox.querySelector("span"), query);
    } else {
      inputBox.classList.add("hidden");
      removeHighlight(contentBox);
      removeHighlight(inputBox.querySelector("span"), query);
    }
  });
}

// highlight text
function highlightText(contentBox, query) {
  const content = contentBox.textContent;
  const regex = new RegExp(`(${query})`, "gi");
  const highlighted = content.replace(
    regex,
    '<span class="highlight">$1</span>'
  );
  contentBox.innerHTML = highlighted;
}

function removeHighlight(contentBox) {
  // contentBox.innerHTML = contentBox.innerHTML.replace(
  //   /<span class="highlight">(.*?)<\/span>/gi,
  //   "$1"
  // );

  const text = contentBox.textContent;
  contentBox.innerHTML = text;
}

function updateStorage(inputBox) {
  const notes = Array.from(notesContainer.children).map((inputBox) => {
    return {
      time: inputBox.querySelector("span").textContent,
      content: inputBox.querySelector(".contentBox").textContent,
    };
  });
  localStorage.setItem("notes", JSON.stringify(notes));

  if (inputBox) {
    notesContainer.removeChild(inputBox);
    notesContainer.insertBefore(inputBox, notesContainer.firstChild);
  }
}

function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    let inputBox = document.createElement("div");
    let contentBox = document.createElement("div");
    let img = document.createElement("img");
    let time = document.createElement("span");
    let br = document.createElement("br");

    //
    inputBox.className = "input-box";
    contentBox.className = "contentBox";
    time.className = "time";
    contentBox.setAttribute("contenteditable", true);

    //
    img.src = "images/del2.png";

    time.textContent = note.time;
    contentBox.textContent = note.content;
    //
    inputBox.appendChild(time);
    inputBox.appendChild(br);
    inputBox.appendChild(contentBox);
    inputBox.appendChild(img);

    notesContainer.appendChild(inputBox);

    //   texts.push(inputBox);

    // contentBox.focus();

    contentBox.addEventListener("input", () => {
      updateStorage(inputBox);
    });
  });
}

document.querySelectorAll("contentBox").forEach((contentBox) => {
  contentBox.addEventListener("input", updateStorage);
});

notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

// setInterval(function () {
//   document.querySelector(".motion").textContent = "Ideas";
// }, 200);

contentBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log(event.key);
    event.preventDefault();
    const newParagraph = document.createElement("p");
    contentBox.appendChild(newParagraph);
    console.log(contentBox);
    newParagraph.contentEditable = true;
    newParagraph.focus();
    // document.execCommand("insertHTML", false, "<br><br>");
  }
});
