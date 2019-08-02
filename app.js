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
                    readButton.value = 'UnRead';
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

// function makeReadButton(this) {
//     let readButton = document.createElement('input');
//     readButton.type = 'button';
    
//     if (this.value == true) {
//         readButton.value = 'Read';
//         console.log('no')
//         readButton.setAttribute('class', 'bookRead');
//     } else {
//         readButton.value = 'Not Read';
//         readButton.setAttribute('class', 'bookUnRead');
//     }
//     this.innerHTML = readButton;
// }

function addBookBar() {
    let newTitle = addTitle.value
    let newAuthor = addAuthor.value
    let newPages = addPages.value
    let newRead = addRead.value
    addBooktoLibrary(newTitle, newAuthor, newPages, newRead)
}

function addRemoveButton() {
    let ammount = myLibrary.length

    for(let i = 0; i < ammount; i ++) {
        let tableRow = document.querySelector('.book_'+ i);
        let makeTD = document.createElement('td');
        let deleteButton = document.createElement('input');
        deleteButton.type = 'button';
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
        button.setAttribute('class', 'UnRead')
        button.setAttribute('value', 'Unread')
    } else {
        myLibrary[bookIndex].read = true;
        button.setAttribute('class', 'Read')
        button.setAttribute('value', 'Read')        
    }
    
}
