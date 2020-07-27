import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Item = ({element, groceries, setGroceries, itemPos}) => {

    const deleteItem = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/remove-grocery-item', {id: element._id})
            console.log(response)
            let temp = [...groceries]
            temp.splice(itemPos,1)
            setGroceries(temp)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ItemContainer>
            <FDRow>
                <User>{element.name ? element.name : '?'}</User>
                {!element.inCart ? <OutCartText>{element.text}</OutCartText> : <InCartText>{element.text}</InCartText>}
            </FDRow>
            <div>
                <Button variant='danger' onClick={deleteItem}>Delete</Button>
            </div>
            
            </ItemContainer>
        </>
    )
}

export default Item

export const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-shadow: 0px 0px 4px #333;
    padding: 10px;
    border-radius: 4px;
    margin: 5px auto;
`;

export const InCartText = styled.div`
    font-size: 24px;
    text-decoration: line-through;
`;


export const OutCartText = styled.div`
    font-size: 24px;
`;

export const User = styled.div`
    border-radius: 4px;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    margin: 5px;
`;

export const FDRow = styled.div`
    display: flex;
    align-items: center;
`;

