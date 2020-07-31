import React, {useState} from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios'

const Item = ({element, groceries, setGroceries, itemPos}) => {

    const [toggle,setToggle] = useState(element.inCart)
    const [isLoading, setLoading] = useState(false)

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

    const toggleItem = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`/toggle-cart`, {id: element._id})
            setLoading(false)
            console.log(response)
            setToggle(!toggle)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ItemContainer onClick={isLoading ? null : toggleItem}>
                {/* <textarea aria-label="With textarea" value={element.text} style={{padding: '0px', border: 'none', width: '60%', resize: 'none'}} row='auto' col='auto' readonly/>{/* <OutCartText>{element.text}</OutCartText> : <InCartText>{element.text}</InCartText>} */}
                {toggle ? <InCartText>{element.text}</InCartText> : <OutCartText style={{wordWrap: 'break-word', width: 'auto', textAlign: 'left'}}>{element.text}</OutCartText> }
                <FDRow >
                    {element.name !== '?' ? <User>{element.name}</User>:<></>}
                    <Button variant='danger' onClick={deleteItem}>X</Button>
                </FDRow>
            </ItemContainer>
        </>
    )
}

export default Item

export const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    border: #aaa 1px solid;
    padding: 10px;
    border-radius: 4px;
    margin: 5px auto;
    cursor: pointer;
    background-color: white;
`;

export const InCartText = styled.div`
    font-size: 24px;
    text-decoration: line-through;
    overflow: hidden;
    padding: 5px;
    word-wrap: break-word;
    text-align: left;
    width: auto;

    @media only screen and (max-width: 600px) {
        font-size: 16px;
    }
`;


export const OutCartText = styled.div`
    font-size: 24px;
    overflow: hidden;
    padding: 5px;
    word-wrap: break-word;
    text-align: left;
    width: auto;

    @media only screen and (max-width: 600px) { 
        font-size: 16px;
    }
`;

export const User = styled.div`
    border-radius: 4px;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c1d6ff;
    margin: 5px;
`;

export const FDRow = styled.div`
    display: flex;
    align-items: center;
`;

