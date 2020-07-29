import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavBar = ({listkey, nickname, setNickname}) => {

    const addName = (e) => {
        e.preventDefault()

        localStorage.setItem('nickname', nickname);

        alert(`Name changed to ${nickname}`)

    }

    return (

        <Navbar collapseOnSelect bg="light" variant="light" expand="xl">
                <Button>Create New List</Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">  
                    <FormControl placeholder={nickname} aria-label='nickname' aria-describedby="basic-addon1" value = {nickname} onChange={(e) => setNickname(e.target.value)}/>
                        {/* <input value = {nickname} onChange={(e) => setNickname(e.target.value)}/> */}
                        <Button onClick={addName} style={{marginLeft: '5px'}}>Add</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    )
}

export default NavBar;
