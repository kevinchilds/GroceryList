import React, {useEffect} from 'react'
import axios from 'axios'
import Item from './Item'
import Button from 'react-bootstrap/Button'



const Groceries = ({listkey, groceries, setGroceries}) => {
    const getGroceries = async () => {
            try {
                if(listkey !== ''){
                    console.log(listkey)
                    const response = await axios.get(`/all-items/${listkey}`)
                    console.log(response)
                    setGroceries(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

    useEffect(() => {
       getGroceries();
       setInterval(getGroceries, 10000);
    }, [listkey, setGroceries])

    const removeItems = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/remove-all-items',{listkey: listkey})
            console.log(response)
            setGroceries('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {groceries.length > 0 ? (groceries.map((element, index) => <Item key={index} element = {element} itemPos={index} groceries={groceries} setGroceries={setGroceries}/>)) : <></>}
            {groceries.length > 0 ? <Button variant= 'outline-danger' style={{width: '95%', margin: 'auto'}} onClick = {removeItems} block> Clear Items</Button> : <></>}
        </>
    )
}

export default Groceries






