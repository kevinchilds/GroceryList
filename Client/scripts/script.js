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
const instructions = document.getElementById('instructions');

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
            instructions.remove();
            todoButton.style.visibility = 'visible';
            itemValue.style.visibility = 'visible';
            const response = await fetch(`/all-items/${keyID}`);
            const data = await response.json();
            //create html items
            for(i in data){
                addItem(data[i]);
                inCartDecoration(data[i]);   
            }
            validateItemsInCart();
        }else{
            alert(`List: ${keyID} not found`);
            window.location.href = `/`;
        }
    }
    else{
        listkeyIF.value = '';
        instructions.style.visibility = 'visible';
    }

    

}











