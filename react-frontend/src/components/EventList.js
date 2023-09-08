import React from 'react';
import { useEffect, useState } from "react"

export function EventList () {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const response = await fetch("http://localhost:8080/event");

            setEvents(await response.json());
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
                <h1>{events.id}</h1>
            )}
        </div>
    );


}


