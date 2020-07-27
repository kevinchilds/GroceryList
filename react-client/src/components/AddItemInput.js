import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import axios from 'axios'

const AddItemInput = ({listkey, groceries, setGroceries}) => {

    const [item, setItem] = useState('')

    const addItem = async (e) => {
        e.preventDefault()

        const data={
            text: item,
            inCart: false,
            listkey: listkey
        };

        try{
            const response = await axios.post('/add-item', data)
            console.log(response)
            let temp = [...groceries]
            temp.push(data)
            setGroceries(temp)
        }catch(error){console.log(error)}
        
    }

    return (
        <AIContainer>
            <AIInput value={item} onChange={(e) => setItem(e.target.value)} placeholder='Add Item'/>
            <Button onClick = {addItem}>Add</Button>
        </AIContainer>
    )
}

export default AddItemInput


export const AIContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    
`;

export const AIInput = styled.input`
    font-size: 18px;
    margin: 0px 5px;
    border-radius: 4px;
    border: none;
    padding: 5px;
    border: #ddd 1px solid;
`;
