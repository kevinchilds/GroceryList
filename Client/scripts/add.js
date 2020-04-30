//add new item to database
async function newItem (event) {
    event.preventDefault();
    const item={
        text: itemValue.value,
        inCart: false,
        listkey: keyID
    };
    const response = await fetch(`/add-item`, {
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

async function createListKey (event){
    event.preventDefault();

    const newKey = `${Math.random().toString(36).substr(2, 9)}`;
    const groceryList = {
        listkey: newKey
    };

    const response = await fetch(`/add-list`, {
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

    window.location.href = `/?listkey=${data.ops[0].listkey}`;
}