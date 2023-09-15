import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
function NavBar() {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Brand className="me-auto" href="/">
                            <div class="text-slate-100">Ticket Finder</div>
                        </Navbar.Brand>
                        <Nav class="text-slate-100">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;