//Selectors
const todoButton = document.querySelector(".itemButton");
const itemValue = document.querySelector(".itemData");
const clearItemBtn = document.querySelector(".clearInCartItems");
const navMessage = document.querySelector(".navClass");

//Event
todoButton.addEventListener("click", newItem);
clearItemBtn.addEventListener("click", clearItems);

//ON LOAD FUNCTION CALL
window.onload = pullFromDB;

//initial pull from DB
async function pullFromDB(){
    //const response = await fetch(`http://localhost:5000/all-items/${ID}`);
    const response = await fetch(`${window.location.href}`);
    const data = await response.json();
//create html items
    for(i in data){
        addItem(data[i]);
        inCartDecoration(data[i]);   
    }
    validateItemsInCart(); 
}

async function clearItems(){
//get all data in collection
    const allItems = await fetch('http://localhost:5000/all-items')
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
    const removedItems = await fetch('http://localhost:5000/remove-incart-items', {
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
        text: event.target.value
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
        listkey: ID
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
    const response = await fetch('http://localhost:5000/validate-cart');
    const data = await response.json();
    clearItemBtn.style.visibility = data.length === 0 ? 'hidden' : 'visible'; 
}

//return specific item from DB
async function checkInCart(value){

    let rspnse = await fetch(`http://localhost:5000/${value}`);
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
    data.inCart = data.inCart ? false : true; 
    inCartDecoration(data);
   
    fetch('http://localhost:5000/toggle-cart', {
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