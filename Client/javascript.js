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
                validateItemsInCart();
            }
            
        }
    });
}

function clearItems(){
    for(i = 0; i < items.length; i++){
        if(items[i].inCart === true){
            document.getElementById(items[i].text).remove();
            items.splice(i--,1);        
        }
    }
    validateItemsInCart();
}

function crossOutItem (event) {
    event.preventDefault();

    //find index to modify
    const indexInCart = findIndexOfItem(event.target.value);

    //toggle index
    if(items[indexInCart].inCart){
        //***Call to Database to update inCart value***
        items[indexInCart].inCart = false;
        event.target.parentElement.style.backgroundColor = 'white';
        event.target.parentElement.style.textDecoration = 'none';
    }else{
        //***Call to Database to update inCart value***
        items[indexInCart].inCart = true;
        event.target.parentElement.style.backgroundColor = 'rgb(159, 219, 186)';
        event.target.parentElement.style.textDecoration = 'line-through';
    }

    validateItemsInCart();

}

function removeItem(event) {
    event.preventDefault();

    const indexToBeRemoved = findIndexOfItem(event.target.value);

    //remove item in array with splice
    items.splice(indexToBeRemoved, 1);
    event.target.parentElement.remove();

    validateItemsInCart();
}

function newItem (event) {
    event.preventDefault();
    let item={
        text: itemValue.value,
        inCart: false
    };
    items.push(item);
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
    inCartButton.addEventListener("click", crossOutItem);
    
}

function validateItemsInCart(){
    let checkVisiblity = 0;
    /* for(i in items){
        if(items[i].inCart === true){checkVisiblity++;}
    } */
    

    clearItemBtn.style.visibility = checkVisiblity === 0 ? 'hidden' : 'visible';
}

function findIndexOfItem(value){
    for(i in items){
        if(items[i].text === value){
            return i;
        }
    }
}



