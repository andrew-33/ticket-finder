import React from 'react';
import NavBar from "../components/NavBar";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Header = styled.h2`
    color: darkslategrey;
`;

function Landing() {
    return (
        <div>
            <NavBar />
            <Link to={"/add-entry"}>
                <button>Add Manually</button>
            </Link>
            <Link to={"/view-listings"}>
                <button>Find Events</button>
            </Link>


        </div>
    );
}

export default Landing;