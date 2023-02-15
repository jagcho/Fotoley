import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import React, { useState } from 'react'


export function Navbar() {
    let data = { file: "" }
    const [input, setInput] = useState(data)
    function handleData(e) {
        setInput((input) => {
            const updatedData = { ...input, [e.target.name]: e.target.value }
            console.log(updatedData)
            return updatedData
        })
    }
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto justify-content-center align-items-center">
                    <Nav.Link to='/community' as={NavLink}>
                        Community
                    </Nav.Link>
                    <Nav.Link to='/gallery' as={NavLink}>
                        Gallery
                    </Nav.Link>
                    <input className='file' type='file' name='file' placeholder='Upload Photo' value={input.file} onChange={handleData} />
                </Nav>

            </Container>
        </NavbarBs>
    )
}