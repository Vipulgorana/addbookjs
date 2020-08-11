//ES6 Version developed by VIPUL GORANA on 10/08/2020
class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookTolist(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete-item">X</a></td>
    `;

    list.appendChild(row);
    }

  showAlert(message,className){
    //creating div with classname and text node
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //grabbing container and form elements to grab our div in between them
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    //this function will insert our alert div between container and form
    //parent.insertBefore(elementToBeAdded,before element)
    container.insertBefore(div,form);
    
    //setTimeout method will make it dissapper after 3 secs
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },3000);
    }
  
  //delete book from UI
  deleteBook(target){
    if(target.className === 'delete-item'){
      target.parentElement.parentElement.remove();
    }
  }
  //clear Field after each submit operation
  clearElements(){
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
  }
}

//class store fo storing items to local storage
class Store{
  //initial get method to get all elements there in storage will be used in various opertions like add,remove & Display
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }

    else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  //diplaying book that are there in the local storage
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();
      ui.addBookTolist(book);
    });
  }

  //adding books to local storeage
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }

  //removing book from local storage after each delete operation
  static removeBooks(isbn){
    const books = Store.getBooks();
    console.log(isbn);
    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1);
      }    
    });

    localStorage.setItem('books',JSON.stringify(books));
  }
}

//load items stored in local storage each time page is loaded
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//now this will create event when user submits form all opertion will happen
document.getElementById('book-form').addEventListener('submit',
function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;      

  //intiontiate book object      
  const book = new Book(title,author,isbn);

  //intiantiate ui object
  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    //error alert to system
    ui.showAlert('Please Fill up the detail','error');    
  }     
  
  else{
    //calling method that wil add data to table
    ui.addBookTolist(book);

    //add to local storage
      Store.addBook(book); //local storage add method will be used each time item is entered in UI

    //calling method that will clear data of input field 
    ui.clearElements();

    //success alert to the system
    ui.showAlert('Successfully added the book to list','success');
  }
  
 
  //will stop default events to stop uses e as a event object
  e.preventDefault();
});

//we will grab book-list that is our table data and use click event
document.getElementById('book-list').addEventListener('click',
function(e){
  const ui = new UI();

  //here e.target represents the target element when we click on certain element.
  ui.deleteBook(e.target);

  //delete from local storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  //previousElementSibling is used to delete items from LS using ISBN of book
  
  //alert
  ui.showAlert('book succesfully removed','success');
  e.preventDefault();
});