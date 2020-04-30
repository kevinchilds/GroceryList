async function checkIfKeyExist(value){
    const response = await fetch(`/grocery-list/${value}`);
    const data = await response.json();
    
    const found = data.length > 0 ? true : false;

    return found;
}

async function checkKey (event){
    event.preventDefault();
    const found = checkIfKeyExist(listkeyIF.value);
    if (found){
        window.location.href = `/?listkey=${listkeyIF.value}`;
    }else{
        alert(`LIST ${listkeyIF.value} NOT FOUND`);
        listkeyIF.value = '';
        window.location.href = `/`;
    }
 
}

//toggle ClearAllInCartItems button
async function validateItemsInCart(){
    let checkVisiblity = 0;
    const response = await fetch(`/validate-cart/${keyID}`);
    const data = await response.json();
    clearItemBtn.style.visibility = data.length === 0 ? 'hidden' : 'visible'; 
}

//return specific item from DB
async function checkInCart(value){

    let rspnse = await fetch(`/${value}/${keyID}`);
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
   
    fetch(`/toggle-cart/${keyID}`, {
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