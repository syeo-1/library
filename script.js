let myLibrary = [];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.info = function() {
        let info = `${title} by ${author}, ${numPages},`;
        if (read) {
            return `${info} already read`;
        } else {
            return `${info} not read yet`;
        }
    }
}

function Library() {

}