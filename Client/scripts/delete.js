async function clearItems(){

    const vdate = confirm(`Are sure you want to clear items in cart?`);
    if(vdate){
        //get all data in collection
            const allItems = await fetch(`/all-items/${keyID}`)
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
            const removedItems = await fetch(`/remove-incart-items/${keyID}`, {
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
}
    
    
    //remove item from button event
    async function removeItem(event) {
        event.preventDefault();

        const vdate = confirm(`Are sure you want to delete \"${event.target.value}\"?`);
        if(vdate){
            const item = {
                text: event.target.value,
                listkey: keyID
            }
        
            const response = await fetch(`/remove-item`, {
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
    }