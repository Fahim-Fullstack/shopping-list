const formItem = document.getElementById('item-form'); //form
const itemInput = document.getElementById('item-input'); //input
const itemList = document.getElementById('item-list'); //ul
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const formBtn = formItem.querySelector('button');
let isEditEnabled = false;

//First, Get the previou item from local storage
function displayItems() {
  const itemsFromStorage = getItemFromLocalStorage();
  itemsFromStorage.forEach((item) => {
    addToDom(item);
  });

  clearUI();
}

/*
 *** Create Items
 */
function addItems(e) {
  e.preventDefault();
  const newItems = itemInput.value.trim();

  //validate input
  if (newItems === '') {
    alert('Please add an item');
    return;
  }

  //Check for edit mode
  if (isEditEnabled) {
    //get the element is is edit-mode
    const itemToEdit = itemList.querySelector('.edit-mode');
    const updateitems = itemToEdit.textContent.trim();

    // remove from localstorage
    removeItemFromLocal(updateitems);

    //remove the item form class & item from UI/DOM
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();

    //make it false the remove item
    isEditEnabled = false;
  } //checking for exsiting items
  else {
    if (checkItemExists(newItems)) {
      alert('It is already existed');
      return; //will not add if we put just return
    }
  }

  //Create & Add to DOM element
  addToDom(newItems);

  //Add to storage
  addToLocalStorage(newItems);

  clearUI();

  itemInput.value = '';
}

//check if Item already exit
function checkItemExists(item) {
  const existingItems = getItemFromLocalStorage();
  return existingItems.includes(item);
}

//Add to DOM
function addToDom(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  //Button & Icon function
  const button = createBtn('remove-item btn-link text-red');
  const iCon = createIcon('fa-solid fa-xmark');
  button.appendChild(iCon);

  //
  li.appendChild(button);
  itemList.appendChild(li);
}

//create button
function createBtn(classes) {
  const button = document.createElement('button');
  button.className = classes;
  return button;
}

//i -icon creation
function createIcon(classes) {
  const iCon = document.createElement('i');
  iCon.className = classes;
  return iCon;
}

//Add to localStorage
function addToLocalStorage(item) {
  const addToLocal = getItemFromLocalStorage();

  //add new to local storage
  addToLocal.push(item);

  // convert to JSON and set to local storage
  localStorage.setItem('items', JSON.stringify(addToLocal));
}

//Get the item from LocalStorage
function getItemFromLocalStorage() {
  let getItemFromLocal;

  if (localStorage.getItem('items') === null) {
    getItemFromLocal = [];
  } else {
    getItemFromLocal = JSON.parse(localStorage.getItem('items'));
  }

  return getItemFromLocal;
}

/*
 *** Filtering
 */
function filterClear() {
  const textFromFilter = filter.value.toLowerCase().trim();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const liText = item.firstChild.textContent.toLowerCase();

    if (liText.indexOf(textFromFilter) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

/*
 *** Remove Items
 */

//clear all
function clearButton() {
  //Clear all from DOM
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //Clear all from Local
  localStorage.removeItem('items');

  clearUI();
}

//remove individual item
function onClickItems(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItems(e.target.parentElement.parentElement);
  } //adding Update
  else {
    setItemToUpdate(e.target);
  }
}

// remove items
function removeItems(item) {
  if (confirm('Are you sure ?')) {
    //remove from DOM
    item.remove();

    //Remove from localStorage
    removeItemFromLocal(item.textContent);
    console.log(item.textContent);
  }

  clearUI();
}

// Remove individual item from localStorage
function removeItemFromLocal(item) {
  let localItems = getItemFromLocalStorage();
  console.log(localItems);

  //Filter out to be removed
  localItems = localItems.filter((i) => i !== item);

  //reset to localstorage
  localStorage.setItem('items', JSON.stringify(localItems));
}

//remove filter & clearAll
function clearUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }

  // reset the update item to add item
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

/*
 *** Updates Items
 */
function setItemToUpdate(items) {
  isEditEnabled = true;

  //disable the edit-mode color
  const lists = itemList.querySelectorAll('li');
  lists.forEach((list) => {
    list.classList.remove('edit-mode');
  });

  items.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = items.textContent.trim();
}

/*
 *** Events Listeners
 */

function init() {
  formItem.addEventListener('submit', addItems);
  itemList.addEventListener('click', onClickItems);
  clearBtn.addEventListener('click', clearButton);
  itemList.addEventListener('input', setItemToUpdate);
  filter.addEventListener('input', filterClear);
  //To display the items from localStorage
  document.addEventListener('DOMContentLoaded', displayItems);

  clearUI();
}

init();
