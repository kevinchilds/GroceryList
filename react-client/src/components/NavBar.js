import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavBar = ({listkey}) => {
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="xl">
            <Form inline>
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Key</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder={listkey}
                    aria-label="Key"
                    aria-describedby="basic-addon1"
                />
                </InputGroup>
                <Button style={{marginLeft: '5px'}}>Create New Key</Button>
            </Form>
        </Navbar>
    )
}

export default NavBar;
