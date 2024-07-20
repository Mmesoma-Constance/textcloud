const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");
const searchBar = document.getElementById("search-bar");
const resultContainer = document.getElementById("results");
let contentBox;
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
    weekday: "long",
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
  inputBox.appendChild(br);
  inputBox.appendChild(img);

  notesContainer.insertBefore(inputBox, notesContainer.firstChild);

  //   texts.push(inputBox);

  contentBox.focus();

  // contentBox.addEventListener("keypress", handleKey);
  contentBox.addEventListener("input", () => {
    console.log(document.activeElement);
    // contentBox.;
    updateTime(inputBox);
    moveToTop(inputBox);
    updateStorage();
  });

  // updateStorage();
}

function handleKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("clicked");
    document.execCommand("insertHTML", false, "<br>");
  }

  // if (event.key === "Enter") {
  //   console.log(event.key);
  //   event.preventDefault();
  //   const newParagraph = document.createElement("p");
  //   contentBox.appendChild(newParagraph);
  //   console.log(contentBox);
  //   newParagraph.contentEditable = true;
  //   newParagraph.focus();
  //   // document.execCommand("insertHTML", false, "<br><br>");
  // }
}

function updateStorage() {
  const notes = Array.from(notesContainer.children).map((inputBox) => {
    return {
      time: inputBox.querySelector("span").textContent,
      content: inputBox
        .querySelector(".contentBox")
        .innerHTML.replace(/<br>/g, "[br]"),
    };
  });
  localStorage.setItem("notes", JSON.stringify(notes));

  // if (inputBox) {
  //   notesContainer.removeChild(inputBox);
  //   notesContainer.insertBefore(inputBox, notesContainer.firstChild);
  // }
}

function handleSearch() {
  const query = searchBar.value.toLowerCase();
  document.querySelectorAll(".input-box").forEach((inputBox) => {
    const contentBox = inputBox.querySelector(".contentBox");
    const time = inputBox.querySelector("span").textContent.toLowerCase();
    const content = contentBox.innerHTML.toLowerCase();
    if (content.includes(query) || time.includes(query)) {
      inputBox.classList.remove("hidden");
      highlightText(contentBox, query);
      highlightText(inputBox.querySelector("span"), query);
      contentBox.addEventListener("keypress", handleKey);
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
  contentBox.innerHTML = highlighted.replace(/<br>/g, "[br]");
  contentBox.addEventListener("keypress", handleKey);
}

function removeHighlight(contentBox) {
  // contentBox.innerHTML = contentBox.innerHTML.replace(
  //   /<span class="highlight">(.*?)<\/span>/gi,
  //   "$1"
  // );

  const text = contentBox.textContent;
  contentBox.innerHTML = text.replace(/\[br\]/g, "<br>");
}

function updateTime(inputBox) {
  const time = inputBox.querySelector("span");
  const now = new Date();
  let date = now.toLocaleDateString("en-US", {
    weekday: "long",
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
}

//
function moveToTop(note) {
  // const selection = window.getSelection();
  // const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  notesContainer.prepend(note);

  // if (range) {
  //   selection.removeAllRanges();
  //   selection.addRange(range);
  // }
  const contentBox = note.querySelector(".contentBox");
  contentBox.focus();

  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(contentBox);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  while (notesContainer.firstChild) {
    notesContainer.removeChild(notesContainer.firstChild);
  }
  // notesContainer.innerHTML = "";
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
    contentBox.innerHTML = note.content.replace(/\[br\]/g, "<br>");
    //
    inputBox.appendChild(time);
    inputBox.appendChild(br);
    inputBox.appendChild(contentBox);
    inputBox.appendChild(br);
    inputBox.appendChild(img);

    notesContainer.appendChild(inputBox);

    //   texts.push(inputBox);

    // contentBox.;
    // contentBox.addEventListener("keypress", handleKey);
    contentBox.addEventListener("input", () => {
      // contentBox.;
      updateTime(inputBox);
      moveToTop(inputBox);
      updateStorage();
    });

    // contentBox.addEventListener("keydown", (event) => {
    //   if (event.key === "Enter") {
    //     document.execCommand("insertLineBreak");
    //     event.preventDefault();
    //   }
    // });
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

const motionText = [
  "Passwords",
  "Links",
  "Client information",
  "Documents",
  "Travel itineraries",
  "Ideas",
  "Movies to watch",
  "Recipes",
  "Shopping list",
  "Addresses",
  "Contacts",
  "Journal entries",
  "Helpful Tips",
  "Life hacks",
  "Quotes",
  "Project Plans",
  "Tasks",
  "To-Do-Lists",
  "Sermon outlines",
  "Vendor lists",
  "Budget plans",
  "Incident reports",
  "Emails",
  "Lecture notes",
  "Study materials",
  "Event schedules",
  "Medication schedules",
  "Installation guides",
  "Fitness goals",
  "Packing lists",
  "Books to read",
  "Speech drafts",
  "Holiday plans",
  "Diet plans",
  "Website content",
  "Maintenance schedules",
  "Workout routines",
  "Blueprints",
  "Cycling routes",
  "Allergy lists",
  "Family trees",
  "Creative writing",
];

let index = 0;

// update the text
function updateMotionText() {
  const textContainer = document.querySelector(".motionText");

  textContainer.textContent = motionText[index];

  index = (index + 1) % motionText.length;
}

setInterval(updateMotionText, 2000);

updateMotionText();
