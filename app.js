const table = document.querySelector('tbody');
const addTitle = document.getElementById('addTitle');
const addAuthor = document.getElementById('addAuthor');
const addPages = document.getElementById('addPages');
const addRead = document.getElementById('addRead');
const addButton = document.querySelector('.addBookBTN');
const removeButton = document.querySelector('.remove');

addButton.addEventListener('click', addBookBar)


let myLibrary = [];

addBooktoLibrary('larry', 'larry', 123, true);
addBooktoLibrary('garry', 'garry', 234, false);
addBooktoLibrary('marry', 'marry', 345, false);



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
    myLibrary.forEach(element => {
        let newRow = document.createElement('tr');
        newRow.setAttribute('class','book_' + myLibrary.indexOf(element))
        for (const key in element) {
            let newData = document.createElement('td')

//Makes Read Button

            if (key == 'read') {
                let readButton = document.createElement('input');
                readButton.type = 'button';

                if (element[key]) {
                    readButton.value = 'Read';
                    console.log('no')
                    readButton.setAttribute('class', 'bookRead');
                } else {
                    readButton.value = 'Not Read';
                    readButton.setAttribute('class', 'bookUnRead');
                }
                newData.appendChild(readButton);
                newRow.appendChild(newData);
            } else {
            newData.innerHTML = element[key];
            newRow.appendChild(newData);
            }            
        }
// add remove button
        let deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Remove';
        newRow.appendChild(deleteButton);
        table.appendChild(newRow);
        
        
    });
}

function clearTable() {
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
}

// function makeReadButton(boolean) {
//     let readButton = document.createElement('input');
//     readButton.type = 'button';
    
//     if (boolean == true) {
//         readButton.value = 'Read';
//         console.log('no')
//         readButton.setAttribute('class', 'bookRead');
//     } else {
//         readButton.value = 'Not Read';
//         readButton.setAttribute('class', 'bookUnRead');
//     }
//     .innerHTML = readButton;
// }

function addBookBar() {
    let newTitle = addTitle.value
    let newAuthor = addAuthor.value
    let newPages = addPages.value
    let newRead = addRead.value
    addBooktoLibrary(newTitle, newAuthor, newPages, newRead)
}