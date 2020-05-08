let myLibrary = [];
let addBookButton = document.querySelector("#add-book-button");
let newBookForm = document.querySelector("#book-data");

addBookButton.addEventListener("click", addBook);

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read ? "read" : "unread";

}

Book.prototype.changeReadStatus = function() {
    this.read = (this.read === "read") ? "unread" : "read" ;
};

function removeBook() {
    myLibrary.splice(this.id, 1);
    render();
}

function changeStatus() {
    console.log("words");
}

function getNewTableRows(tbody) {
    for (let [index, book] of myLibrary.entries()) {
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
    getNewTableRows(newTbody);
    if (!document.body.contains(document.getElementsByTagName("tbody")[0])) {
        bookData.appendChild(newTbody);
    } else {
        let oldTbody = document.getElementsByTagName("tbody")[0];
        bookData.replaceChild(newTbody, oldTbody);
    }
    
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
    let newBook = createBook();
    pushBook(newBook);
    newBookForm.reset();
    render()
}


