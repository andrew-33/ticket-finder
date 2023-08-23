import React from 'react';
import NavBar from "../components/NavBar";
import styled from "styled-components";

const Header = styled.h2`
    color: darkslategrey;
`;

function Landing() {
    return (
        <div>
            <NavBar />
        </div>
    );
}

export default Landing;