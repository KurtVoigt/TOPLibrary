//variable that checks whether local storage is available or not
var ls;
var myLibrary;

if (storageAvailable('localStorage')) {
    //local storage available
    ls = true;
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    console.log(myLibrary)
    if(myLibrary === null){
        myLibrary = [];
    }
    else(myLibrary.length > 0)
        render();
  }
  else {
    // Too bad, no localStorage for us
    ls = false;
    myLibrary = [];

  }

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", function (){addBookToLibrary()});



//a simple class for a book
class Book{
    constructor(title, author, numPages, haveRead ){
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }

    info() {
        let read = "";
        if(this.haveRead){
            read = "already read";
        }
        else{
            read = "not read yet";
        }
        return this.title + " by " + this.author + ", " + this.numPages + " pages, " + read;
    }
}


function addBookToLibrary(){
    //event.preventDefault();
    const title = document.forms["newBookForm"]["title"].value;
    const author = document.forms["newBookForm"]["author"].value;
    const pages = document.forms["newBookForm"]["pages"].value;
    const read = document.forms["newBookForm"]["read"].checked;
    
    

    //let libDiv = document.getElementById("bookDisplayer")
    if(title == ""){
        window.alert("Please fill in the Title information");
        return;
    }
    if(author == ""){
        window.alert("Please fill in the Author's name");
        return;
    }
    if(pages == ""){
        window.alert("Please fill in the number of pages information");
        return;
    }
    if(!pages.match(/^[0-9]+$/)){
        window.alert("Please use numerical symbols for the number of pages");
        return;
    }
    bookObject = new Book(title, author, pages, read);
    console.log(read);
    myLibrary.push(bookObject);
    if(ls)
        saveToLocal();
    //render what is in the library array

    render();

    /*if(read)
        readString = "Read"
    else
        readString = "Not Read"

    libDiv.innerHTML = libDiv.innerHTML + "<div class='bookBox'>" + "<div class='bookChild'>" + bookObject.title + "</div>" 
    + "<div class='bookChild'>" + bookObject.author + "</div>" + "<div class='bookChild'>" + bookObject.numPages + "</div>"
    + "<div class='bookChild'>" + "<div class='bookChild'><button>" + readString +"</button></div>"
     + "<div class='bookChild'><button>" + "Remove" +"</button></div>" + "</div>";*/

	
}

function render(){
    let libDiv = document.getElementById("bookDisplayer")
    libDiv.innerHTML="";
    const bookBox = document.createElement("div");
    bookBox.classList.add("bookBox");
    //for each loop learned
    myLibrary.forEach((bookObject) =>{
        const bookBox = document.createElement("div");
        bookBox.classList.add("bookBox");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add('bookChild');
        titleDiv.innerText = bookObject.title;
        bookBox.appendChild(titleDiv);

        const authorDiv = document.createElement("div");
        authorDiv.classList.add('bookChild');
        authorDiv.innerText = bookObject.author;
        bookBox.appendChild(authorDiv);

        const pagesDiv = document.createElement("div");
        pagesDiv.classList.add('bookChild');
        pagesDiv.innerText = bookObject.numPages;
        bookBox.appendChild(pagesDiv);

        const readBtn = document.createElement("button");
        if(bookObject.haveRead){
            readBtn.innerText = "Read";
            readBtn.style.backgroundColor = '#009900';
        }
        else{
            readBtn.innerText = "Not Read";
            readBtn.style.backgroundColor = '#cc0000';
        }
        const readBtnDiv = document.createElement("div");
        readBtnDiv.appendChild(readBtn);
        readBtnDiv.classList.add('bookChild');
        bookBox.appendChild(readBtnDiv);
        readBtn.addEventListener("click", () => {
            bookObject.haveRead = !bookObject.haveRead;
            render();
        });

        const removeBtn = document.createElement("button");
        const removeBtnDiv = document.createElement("div");
        removeBtnDiv.classList.add('bookChild');
        removeBtn.innerText = "Remove";
        removeBtnDiv.appendChild(removeBtn);
        bookBox.appendChild(removeBtnDiv);
        removeBtn.addEventListener("click",  () => {
            myLibrary.splice(myLibrary.indexOf(bookObject), 1);
            render();
        });

        //html hierarchy now made, append to flex container

        libDiv.appendChild(bookBox);

    })

}

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

function saveToLocal(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


