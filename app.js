const table = document.querySelector('tbody');
const addTitle = document.getElementById('addTitle');
const addAuthor = document.getElementById('addAuthor');
const addPages = document.getElementById('addPages');
const addRead = document.getElementById('addRead');
const addButton = document.querySelector('.addBookBTN');
const removeButton = document.querySelector('.remove');
const toggleAddBook = document.querySelector('.showBookForm')
const addForm = document.querySelector('.bookForm')

addButton.addEventListener('click', addBookBar)
toggleAddBook.addEventListener('click', showAddBook)

let myLibrary = [];

addBooktoLibrary('The Hobbit', 'J.R.R. Tolkien', 1234, true);
addBooktoLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1234, false);
addBooktoLibrary('The Way of Kings', 'Brandon Sanderson', 12345, true);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    clearTable();
    render();
}

function render() {    
    //Grabs each book
    myLibrary.forEach(element => {
        let newRow = document.createElement('tr');
        newRow.setAttribute('class','book_' + myLibrary.indexOf(element))
        
        //Grabs books key
        for (const key in element) {
            let newData = document.createElement('td')

            //Makes Read Button
            if (key == 'read') {
                let readButton = document.createElement('input');
                readButton.type = 'button';
                readButton.addEventListener('click',() => toggleRead(newRow))           
                                
                if (element[key]) {                    
                    readButton.value = 'Read';
                    readButton.setAttribute('class', 'bookRead');
                } else {
                    readButton.value = 'Unread';
                    readButton.setAttribute('class', 'bookUnRead');
                }
                newData.appendChild(readButton);
                newRow.appendChild(newData);
            //Fills rest of info
            } else {
            newData.innerHTML = element[key];
            newRow.appendChild(newData);
            }            
        }
        table.appendChild(newRow); 
    });
    addRemoveButton();
}

function clearTable() {
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}

function addBookBar() {
    let newTitle = addTitle.value
    let newAuthor = addAuthor.value
    let newPages = addPages.value    
    let newRead;
    if (addRead.value === 'true') {
        newRead = true;
    } else {
        newRead = false;    
    }
    //If inputs invalid returns
    if (newTitle === '' || hasNumbers(newAuthor) || hasLetters(newPages)) {
        document.querySelector('.warning').setAttribute('style', 'display:block')
        return
    }

    document.querySelector('.warning').setAttribute('style', 'display:none')    
    addBooktoLibrary(newTitle, newAuthor, newPages, newRead)
    showAddBook();
}

function addRemoveButton() {
    let ammount = myLibrary.length

    for(let i = 0; i < ammount; i ++) {
        let tableRow = document.querySelector('.book_'+ i);
        let makeTD = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.value = 'Remove';
        deleteButton.addEventListener('click',() => deleteBook(tableRow))
        makeTD.appendChild(deleteButton)
        tableRow.appendChild(makeTD);
    }
}

function deleteBook(element) {
    let bookIndex = element.className.slice(5,6);

    myLibrary.splice(bookIndex, 1);
    clearTable();
    render();
}

function toggleRead(element) {
    let bookIndex = element.className.slice(5,6);
    let readStatus = myLibrary[bookIndex].read;
    let button = element.querySelector('input');
     
    if(readStatus) {
        myLibrary[bookIndex].read = false;
        button.setAttribute('class', 'Unread')
        button.setAttribute('value', 'Unread')
    } else {
        myLibrary[bookIndex].read = true;
        button.setAttribute('class', 'Read')
        button.setAttribute('value', 'Read')        
    }    
}

function showAddBook() {
    if (addForm.style.display == 'flex') {
        addForm.setAttribute('style', 'display: none');
    } else {
        addForm.setAttribute('style', 'display: flex');
    }    
}

function hasLetters(string) {
    var regex = /\D/g;
    return regex.test(string);
}
function hasNumbers(string) {
    var regex = /\d/g;
    return regex.test(string);
}  