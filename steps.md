- Add item to list via form
- Remove items form list by clicking the "X" button
- Clear all items with 'clear' button
- Filter the items by typing in the filter field
- Add localStorage to persist items
- Click on an itrem to put into 'edit mode' and add to form
- Update item
- Deploy to Netlify

# Adding items

```
const itemForm = document.getElementById('item-form'); // form
const itemInput = document.getElementById('item-input'); //input
const itemList = document.getElementById('item-list'); //ul

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //Validate Input or handle empty input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);

  //this will clear the input field
  itemInput.value = ' ';
}

// Button Function
function createButton(classes) {
  const btn = document.createElement('button');
  btn.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}

// create icon function
function createIcon(classes) {
  const iBtn = document.createElement('i');
  iBtn.className = classes;
  return iBtn;
}

//Event Listeners
itemForm.addEventListener('submit', addItem);

```

# Remove & Clear

-
- use event delegation

## Clear UI selection

## Filtering Search

```
//Add Filtering
function filterItems(e) {
  //get the text typed
  const text = e.target.value.toLowerCase();
  console.log(text);

  //Get the list items
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    //Filtering
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

```

## LocalStorage

- Get empty variable
  - Check if items are on local Storage or not
    - If items is not on local array, set emmpty array []
    - get the items if items are in local storages & put it in that variable
  -
- Add to local Storage
- If we delete an item, we want to delete it from local Storage as well
- We also want to load the items when the page loads, we want to fetch from local storage and display items
-

# Update

Problems:

- Add new dulicate items when I click the updates
