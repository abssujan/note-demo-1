const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closeBtn = popupBox.querySelector('header i');
const popupTitle = popupBox.querySelector("header p");
const addBtn = popupBox.querySelector('button');
const titleTag = popupBox.querySelector('input');
const descriptionTag = popupBox.querySelector('textarea');

const months = ["January","February","March","April","May","June","July","August",
               "September","October","November","December"];
// getting localstorage notes if  exist and parsing them
// to js object else passing an empty arry to notes
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpadate = false, updateId;
// event
addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
})

closeBtn.addEventListener('click', () => {
    isUpadate = false;
    titleTag.value = '';
    descriptionTag.value = '';
    addBtn.innerText = `Add Note`;
    popupTitle.innerText = `Add a new Note`;
    popupBox.classList.remove('show');
})
// create function 
function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
        let liTag = `
        <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span class="deatails">${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li><i onclick="updateNotes(${index}, '${note.title}', '${note.description}')" class="uil uil-pen">edit</i></li>
                    <li><i onclick="deleteNote(${index})" class="uil uil-trash">Delete</i></li>
                </ul>
            </div>
        </div>
    </li>
        `;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();
function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener('click', e => {
        // removing show class from the settings menu on document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    })

}
function deleteNote(noteId){
    notes.splice(noteId, 1); // removing selected note from arry/ task
    // saving updated notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes();

}
function updateNotes(noteId, title, description){
    isUpadate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descriptionTag.value = description;
    addBtn.innerText = `Update your Note`;
    popupTitle.innerText = `Update Note`;
    console.log(noteId, title, description)
}
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let noteTile = titleTag.value;
    let noteDescription = descriptionTag.value;
    if(noteTile || noteDescription){
        let dateObje = new Date();
        let month = months[dateObje.getMonth()];
        let day = dateObje.getDate();
        let year = dateObje.getFullYear();
        
        let noteInfo = {
            title: noteTile,
            description: noteDescription,
            date: `${month} ${day} ${year}`
        }
        if(!isUpadate){
            notes.push(noteInfo) // adding new note to notes
        }else {
            isUpadate = false;
            notes[updateId] = noteInfo; // updating specified note
        }
        
        // saving notes to localStorage
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    closeBtn.click();
    showNotes();
})
