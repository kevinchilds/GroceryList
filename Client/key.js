
let key = document.querySelector('.keyInput');
let keyButton = document.querySelector('.goToListButton');
let createNewListButton = document.querySelector('.createNewList');

keyButton.addEventListener("click", checkKey);
createNewListButton.addEventListener("click", createListKey);

async function checkKey (event){
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/grocery-list/${key.value}`);
    const data = await response.json();
    const found = data.length > 0 ? true : false;
    if (found){
        sessionStorage.setItem("KEY", `${key.value}`);
        window.location.href = "http://localhost:5000/grocery-list.html";
    }else{
        alert(`LIST ${event.target.value} NOT FOUND`);
        key.value = '';
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

    key.value = '';
    sessionStorage.setItem("KEY", `${data.ops[0].listkey}`);
    window.location.href = "http://localhost:5000/grocery-list.html";
}