let myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function render() {
    let bookData = document.querySelector(".book-data");
    for (let book of myLibrary) {
        let tr = document.createElement("tr");
        for (let value of Object.values(book)) {
            let td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
            // console.log(td.textContent);
        }
        //add a button for remove
        let td = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        td.appendChild(removeButton);
        tr.appendChild(td);
        bookData.appendChild(tr);
        // console.log("------");
    }
}

function getData() {
    let bookData = document.createElement("form");

}

function addBookToLibrary() {
    // myLibrary.push(book);
    // getData();
    // console.log("hello");

    // myLibrary.push(new Book(title, author, pages, readStatus);
    //render should be in here! right after you get the data,
    // append it to the table and the array
}

let addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", addBookToLibrary);

//manually add books first
// let book1 = new Book("The Shining", "Stephen King", "650", true);
// let book2 = new Book("Les Miserables", "Victor Hugo", "500", false);
// let book3 = new Book("Hunger Games", "Suzanne Collins", "450", true);
// addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);
// render();



