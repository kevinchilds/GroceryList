import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import axios from 'axios'

const NavBar = ({listkey, nickname, setNickname}) => {

    const addName = (e) => {
        e.preventDefault()

        localStorage.setItem('nickname', nickname);

        alert(`Name changed to ${nickname}`)

    }

    const createList = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/add-list`, {listkey: `${Math.random().toString(36).substr(2, 9)}`})
            console.log(response)
            window.location.href= `/?listkey=${response.data.listkey}`
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Navbar collapseOnSelect bg="dark" variant="dark" expand="xl" style={{boxShadow: '2px 0px 4px #333'}}>
                <Navbar.Brand>Grocery List</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-start" style={{margin: '0px 10px'}}>
                    <NavDropdown.Divider />
                    <Button variant='outline-primary' onClick={createList}>Create New List</Button>
                    <NavDropdown.Divider />
                    </Nav>
                   
                    <Nav className="justify-content-end">  
                    <div style={{display: 'flex'}}>
                        <FormControl placeholder={nickname} aria-label='nickname' aria-describedby="basic-addon1" value = {nickname} onChange={(e) => setNickname(e.target.value)}/>
                        {/* <input value = {nickname} onChange={(e) => setNickname(e.target.value)}/> */}
                        <Button onClick={addName} style={{marginLeft: '5px', width: '150px'}}>Add Name</Button>
                    </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    )
}

export default NavBar;
