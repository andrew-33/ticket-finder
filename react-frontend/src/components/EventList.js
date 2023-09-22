import React from 'react';
import { useEffect, useState } from "react"

// to make requests to backend
export function EventList () {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const response = await fetch("http://localhost:8080/api/all");

            setEvents((await response.json())[0].name);
            setLoading(false);
        }

        load();

    }, [])

    return (
        <div>
            {loading ? (<h1>loading...</h1>) : (
                // <ul>
                //     {events.map(event => (
                //         <li key={event.id}>{event.content}</li>
                //     ))}
                // </ul>
                <h1>{events}</h1>
            )}
        </div>
    );


}


