import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import axios from 'axios'

const AddItemInput = ({listkey, groceries, setGroceries, nickname}) => {

    const [item, setItem] = useState('')

    const addItem = async (e) => {
        e.preventDefault()
        if(item){
            const data={
                text: item,
                inCart: false,
                listkey: listkey,
                name: nickname
            };

            try{
                const response = await axios.post('/add-item', data)
                console.log(response)
                let temp = [...groceries]
                temp.push(data)
                setGroceries(temp)
                setItem('')
            }catch(error){console.log(error)}
        }else{
            alert("\"Add Item\" field cannot be blank");
        }
        
    }

    return (
        <AIContainer onSubmit={addItem}>
            <AIInput value={item} onChange={(e) => setItem(e.target.value)} placeholder='Add Item'/>
            <Button type='submit' style={{width: '15%', padding: '10px'}}>Add</Button>
        </AIContainer>
    )
}

export default AddItemInput


export const AIContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto;
    width: 95%;

    
`;

export const AIInput = styled.input`
    font-size: 18px;
    border-radius: 4px;
    border: none;
    border: #ddd 1px solid;
    width: 80%;
    padding: 10px;
`;
