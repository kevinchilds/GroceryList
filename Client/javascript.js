//Global
let keyID = '';
//Selectors
const todoButton = document.querySelector(".itemButton");
const itemValue = document.querySelector(".itemData");
const clearItemBtn = document.querySelector(".clearInCartItems");
const navMessage = document.querySelector(".navText");
const listkeyIF = document.getElementById('listkeyIF');
const createNewListButton = document.querySelector('.createNewList');
const keyButton = document.querySelector('.goToList');

//Event
todoButton.addEventListener("click", newItem);
clearItemBtn.addEventListener("click", clearItems);
createNewListButton.addEventListener("click", createListKey);
keyButton.addEventListener("click", checkKey);

//ON LOAD FUNCTION CALL
window.onload = pullFromDB;

//initial pull from DB - working:4/28 
async function pullFromDB(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    keyID = urlParams.get('listkey');
    
    
    if(keyID !== null){
        listkeyIF.value = `${keyID}`;
        const found = await checkIfKeyExist(listkeyIF.value);
        if(found){
            const response = await fetch(`http://localhost:5000/all-items/${keyID}`);
            const data = await response.json();
            //create html items
            for(i in data){
                addItem(data[i]);
                inCartDecoration(data[i]);   
            }
            validateItemsInCart();
        }else{
            alert(`List: ${keyID} not found`);
            window.location.href = `http://localhost:5000/`;
        }
    }
    else{
        listkeyIF.value = '';
        todoButton.style.visibility = 'hidden';
        itemValue.style.visibility = 'hidden';
    }

    

}



async function createListKey (event){
    event.preventDefault();

    const newKey = `${Math.random().toString(36).substr(2, 9)}`;
    const groceryList = {
        listkey: newKey
    };

    const response = await fetch(`http://localhost:5000/add-list`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groceryList),
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    const data = await response.json();

    window.location.href = `http://localhost:5000/?listkey=${data.ops[0].listkey}`;
}

async function checkIfKeyExist(value){
    const response = await fetch(`http://localhost:5000/grocery-list/${value}`);
    const data = await response.json();
    
    const found = data.length > 0 ? true : false;

    return found;
}

async function checkKey (event){
    event.preventDefault();
    const found = checkIfKeyExist(listkeyIF.value);
    if (found){
        window.location.href = `http://localhost:5000/?listkey=${listkeyIF.value}`;
    }else{
        alert(`LIST ${listkeyIF.value} NOT FOUND`);
        listkeyIF.value = '';
        window.location.href = `http://localhost:5000/`;
    }
 
}

async function clearItems(){
//get all data in collection
    const allItems = await fetch(`http://localhost:5000/all-items/${keyID}`)
    .catch((error) => {
        console.error('Error:', error);
        });
    let data = await allItems.json();
//remove items that are in cart front end
    console.log(data);
    for(i in data){
        if (data[i].inCart === true){
            document.getElementById(data[i].text).remove();
        }
    }
    
 //api call to remove items in cart in backend   
    const removedItems = await fetch(`http://localhost:5000/remove-incart-items/${keyID}`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .catch((error) => {
        console.error('Error:', error);
        });

    let response = await removedItems;
    console.log(response);
    validateItemsInCart(); 
}


//remove item from button event
async function removeItem(event) {
    event.preventDefault();

    const item = {
        text: event.target.value,
        listkey: keyID
    }

    const response = await fetch('http://localhost:5000/remove-item', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        })
        .catch((error) => {
        console.error('Error:', error);
        });

    event.target.parentElement.remove();
    validateItemsInCart();
}

//add new item to database
async function newItem (event) {
    event.preventDefault();
    const item={
        text: itemValue.value,
        inCart: false,
        listkey: keyID
    };
    const response = await fetch('http://localhost:5000/add-item', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    const data = await response.json();
    addItem(item);    
}

//create html item
function addItem (item) {

    //create div with classname. This div will wrap other elemnts below
    let itemDiv = document.createElement("DIV");
    itemDiv.className = "itemStyle";
    itemDiv.id = item.text;
    itemDiv.innerText = item.text;
    itemDiv.value = item.text;

    //create delete button to go in div
    let deleteButton = document.createElement("BUTTON");
    deleteButton.className="deleteButton";
    deleteButton.innerText="Delete";
    deleteButton.value=item.text;

    //append delete button to Div to container
    itemDiv.appendChild(deleteButton);
    document.getElementById("itemsList").appendChild(itemDiv);


    //clear input data
    itemValue.value = "";
    deleteButton.addEventListener("click", removeItem);
    itemDiv.addEventListener("click", toggleCart);
    
}

//toggle ClearAllInCartItems button
async function validateItemsInCart(){
    let checkVisiblity = 0;
    const response = await fetch(`http://localhost:5000/validate-cart/${keyID}`);
    const data = await response.json();
    clearItemBtn.style.visibility = data.length === 0 ? 'hidden' : 'visible'; 
}

//return specific item from DB
async function checkInCart(value){

    let rspnse = await fetch(`http://localhost:5000/${value}/${keyID}`);
    let data = await rspnse.json();
    return data[0];
    
}

//given specific item, will toggle correctly
function inCartDecoration(item){
    const hDiv = document.getElementById(`${item.text}`);

    hDiv.style.backgroundColor = item.inCart ? 'rgb(159, 219, 186)' : 'white';
    hDiv.style.textDecoration = item.inCart ? 'line-through' : 'none';
}

//Toggle in cart value in DB
async function toggleCart(event){
    event.preventDefault();
    let data = await checkInCart(event.target.value);
    console.log(data);
    data.inCart = data.inCart ? false : true; 
    inCartDecoration(data);
   
    fetch(`http://localhost:5000/toggle-cart/${keyID}`, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    
    validateItemsInCart();
}