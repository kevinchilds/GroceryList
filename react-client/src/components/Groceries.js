import React, {useEffect} from 'react'
import axios from 'axios'
import Item from './Item'



const Groceries = ({listkey, groceries, setGroceries}) => {

    useEffect(() => {
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

        getGroceries()
    }, [listkey, setGroceries])

    return (
        <>
            {groceries.length > 0 ? groceries.map((element, index) => <Item key={index} element = {element} itemPos={index} groceries={groceries} setGroceries={setGroceries}/>) : <></>}
        </>
    )
}

export default Groceries






