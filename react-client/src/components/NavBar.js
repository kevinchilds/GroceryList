import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavBar = ({listkey, nickname, setNickname}) => {

    const addName = (e) => {
        e.preventDefault()

        localStorage.setItem('nickname', nickname);

    }

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="xl">
            <Button>Create New List</Button>

            <div>
                <input value = {nickname} onChange={(e) => setNickname(e.target.value)}/>
                <Button onClick={addName}>Add Name</Button>
            </div>
        </Navbar>
    )
}

export default NavBar;
