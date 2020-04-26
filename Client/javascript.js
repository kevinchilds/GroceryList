//global
let items = [];


//Selectors
const todoButton = document.querySelector(".itemButton");
const itemValue = document.querySelector(".itemData");
const clearItemBtn = document.querySelector(".clearInCartItems");
//Event
todoButton.addEventListener("click", newItem);
clearItemBtn.addEventListener("click", clearItems);

//Functions
window.onload = pullFromDB;

function pullFromDB(){
    fetch('http://localhost:5000/all-items')
    .then((response) => {
        return response.json();
     })
     .then((data) => {
        console.log(data);
        items = data;
        for(i in data){
            addItem(data[i]);
            if(data[i].inCart){
                document.getElementById(data[i].text).style.backgroundColor = 'rgb(159, 219, 186)';
                document.getElementById(data[i].text).style.textDecoration = 'line-through';
                
            }
            
        }
        validateItemsInCart();
    });
}

async function clearItems(){

    //document.getElementById(items[i].text).remove();
    const allItems = await fetch('http://localhost:5000/all-items')
    .catch((error) => {
        console.error('Error:', error);
        });

    let data = await allItems.json();
    console.log(data);
    for(i in data){
        if (data[i].inCart === true){
            document.getElementById(data[i].text).remove();
        }
    }
    
    
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



function removeItem(event) {
    event.preventDefault();

    let item = {
        text: event.target.value
    }

    fetch('http://localhost:5000/remove-item', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    event.target.parentElement.remove();

    validateItemsInCart();
}

function newItem (event) {
    event.preventDefault();
    let item={
        text: itemValue.value,
        inCart: false
    };
    fetch('http://localhost:5000/add-item', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    //items.push(item);
    addItem(item);
    console.log(items);
}


function addItem (item) {

    //create div with classname. This div will wrap other elemnts below
    let itemDiv = document.createElement("DIV");
    itemDiv.className = "itemStyle";
    itemDiv.id = item.text;
    itemDiv.innerText = item.text;

    //create delete button to go in div
    let deleteButton = document.createElement("BUTTON");
    deleteButton.className="deleteButton";
    deleteButton.innerText="Delete";
    deleteButton.value=item.text;

    //creat cheIn button
    let inCartButton = document.createElement("BUTTON");
    inCartButton.className="inCartButton";
    inCartButton.innerText="In Cart";
    inCartButton.value=item.text;

    //append delete button to Div to container
    itemDiv.appendChild(deleteButton);
    itemDiv.appendChild(inCartButton);
    document.getElementById("itemsList").appendChild(itemDiv);


    //clear input data
    itemValue.value = "";
    deleteButton.addEventListener("click", removeItem);
    inCartButton.addEventListener("click", toggleCart);
    
}

function validateItemsInCart(){
    let checkVisiblity = 0;
    /* for(i in items){
        if(items[i].inCart === true){checkVisiblity++;}
    } */
    fetch('http://localhost:5000/validate-cart')
    .then((response) => {
        return response.json();
     })
     .then((data) => {
        console.log(data);
        clearItemBtn.style.visibility = data.length === 0 ? 'hidden' : 'visible';
    });

   
}

async function checkInCart(value){

    let rspnse = await fetch(`http://localhost:5000/${value}`);
    let data = await rspnse.json();
    return data;
    
}

async function toggleCart(event){
    event.preventDefault();
    let list = await checkInCart(event.target.value);
    let data = list[0];
    //const data = { text: value, inCart: false };
    console.log(data.inCart);
    data.inCart = data.inCart ? false : true;
    if(data.inCart){
        event.target.parentElement.style.backgroundColor = 'rgb(159, 219, 186)';
        event.target.parentElement.style.textDecoration = 'line-through';
    } else{
        event.target.parentElement.style.backgroundColor = 'white';
        event.target.parentElement.style.textDecoration = 'none';
    }
    fetch('http://localhost:5000/toggle-cart', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    
    validateItemsInCart();
}

function findIndexOfItem(value){
    for(i in items){
        if(items[i].text === value){
            return i;
        }
    }
}



