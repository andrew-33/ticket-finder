import React from 'react';
import NavBar from "../components/NavBar";
import {Link} from "react-router-dom";
import {EventList} from "../components/EventList";

function Landing() {
    return (
        <div class="bg-slate-200 w-screen h-screen fixed overflow-auto">
            <NavBar />
            <div class="py-4 space-x-20 flex justify-center">
                <Link to={"/add-entry"}>
                    <button class="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Add Manually</button>
                </Link>
                <Link to={"/view-listings"}>
                    <button class="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Find Events</button>
                </Link>
            </div>
            <div class="px-[20%]">
                <h2>Saved Events</h2>
                <EventList/>
            </div>
        </div>
    );
}

export default Landing;