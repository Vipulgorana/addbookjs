//developed by vipul gorana on 10/08/2020
// constructor used for creating book object
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI object construtor used for operating ui operations
function UI(){}

//UI prototype method to add data to list or table
UI.prototype.addBookTolist = function(book){
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

//alear show method of UI object
UI.prototype.showAlert = function(message,className){
  
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

//event deligation is used for deleting 
//delete fucntion for deleting book 
//target as parameter will tell function what we are clicking 
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete-item'){
    target.parentElement.parentElement.remove();
  }
  
}
// this method will clear input fields that are previously displayed on page 
UI.prototype.clearElements = function(){
  document.getElementById('title').value = '',
  document.getElementById('author').value = '',
  document.getElementById('isbn').value = '';
}

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
  
  ui.showAlert('book succesfully removed','success');
  e.preventDefault();
});