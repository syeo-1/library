let myLibrary = [];
let addBookButton = document.querySelector("#add-book-button");
let newBookForm = document.querySelector("#book-data");

addBookButton.addEventListener("click", addBook);

class Book {
    constructor(title, author, numPages, read) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read ? "read" : "unread";
    }

    changeReadStatus() {
        this.read = (this.read === "read") ? "unread" : "read";
        updateLocalStorage();
    }
}

// check for local storage compatibility. taken from:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// if local storage is usable and the library already exists, use it
if (storageAvailable('localStorage')) {
    if (localStorage.getItem("myLibrary")) {
        renderLocalStorage()
    }
}

function removeBook() {
    myLibrary.splice(this.id, 1);
    updateLocalStorage();
    render();
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getNewTableRows(tbody, library) {
    for (let [index, book] of library.entries()) {
        let tr = document.createElement("tr");
        for (let value of Object.values(book)) {
            let td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        }
        //add a button to change read status
        let tdChangeStatus = document.createElement("td")
        let changeStatusButton = document.createElement("button");
        changeStatusButton.textContent = "Change Read Status";
        changeStatusButton.addEventListener("click", function() {
            myLibrary[index].changeReadStatus();
            render();
        });
        tdChangeStatus.appendChild(changeStatusButton);

        //add a button for remove
        let tdRemoveButton = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", removeBook);
        tdRemoveButton.appendChild(removeButton);

        //give button identifier for removal
        removeButton.id = (index).toString();

        tr.appendChild(tdChangeStatus);
        tr.appendChild(tdRemoveButton);
        tbody.appendChild(tr);
    }
}

function render() {
    let bookData = document.querySelector(".book-table");
    let newTbody = document.createElement("tbody");
    getNewTableRows(newTbody, myLibrary);
    if (!document.body.contains(document.getElementsByTagName("tbody")[0])) {
        bookData.appendChild(newTbody);
    } else {
        let oldTbody = document.getElementsByTagName("tbody")[0];
        bookData.replaceChild(newTbody, oldTbody);
    }
    
}

function createMyLibrary() {
    let tempBookData = JSON.parse(localStorage.getItem("myLibrary"));
    for (book of tempBookData) {
        let title = book.title;
        let author = book.author;
        let pages = book.numPages;
        let readStatus = (book.read === "read") ? true : false;

        myLibrary.push(new Book(title, author, pages, readStatus));
    }
}

function renderLocalStorage() {
    let bookData = document.querySelector(".book-table");
    let newTbody = document.createElement("tbody");
    getNewTableRows(newTbody, JSON.parse(localStorage.getItem("myLibrary")));
    if (!document.body.contains(document.getElementsByTagName("tbody")[0])) {
        bookData.appendChild(newTbody);
    } else {
        let oldTbody = document.getElementsByTagName("tbody")[0];
        bookData.replaceChild(newTbody, oldTbody);
    }
    createMyLibrary();
}

function createBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read-status").checked;

    return new Book(title, author, pages, read);
}

function pushBook(book) {
    myLibrary.push(book);
}

function addBook() {
    if (document.getElementById("title").value !== "" && 
    document.getElementById("author").value !== "" && 
    document.getElementById("pages").value !== "") {
        let newBook = createBook();
        pushBook(newBook);
        updateLocalStorage();
        newBookForm.reset();
        render()
    } else {
        alert("please fill in title, author, and page number fields");
    }
}


