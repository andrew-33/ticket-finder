import React from 'react';
import { useEffect, useState } from "react"

const getURLs = async (response) => {
    return (await response.json()).map(event => (
        event.name
    ))
}

const getDetails = async (ids) => {
    let events = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        let event = await fetch("https://app.ticketmaster.com/discovery/v2/events/" + id + "?apikey=" + process.env.REACT_APP_API_KEY);
        event = await event.json();
        events.push({
            name: event.name,
            date: event.dates.start.localDate,
            url: event.url,
            venue: event._embedded.venues[0].name,
            min: event.priceRanges ? event.priceRanges[0].min : -1,
            max: event.priceRanges ? event.priceRanges[0].max : -1, // note: max=999 means 999+
            currency: event.priceRanges ? event.priceRanges[0].currency : "",
            id: event.id
        });
    }
    return events;
}


// to make requests to backend
export function EventList () {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const response = await fetch("http://localhost:8080/api/all");

            // get url of event and parse
            const ids = await getURLs(response);
            const eventDetails = await getDetails(ids);

            setEvents(eventDetails);

            setLoading(false);
        }

        load();

    }, [])

    return (
        <div>
            {loading ? (<h1>loading...</h1>) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>)}
        </div>
    );


}


