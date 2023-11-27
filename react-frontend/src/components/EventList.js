import React from 'react';
import {useEffect, useState} from "react"
import {LineChart} from '@mui/x-charts/LineChart';

const getURLs = async (response) => {
    return response.map(event => (
        event.name
    ))
}

const getDetails = async (ids) => {
    let events = [];
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        let event = await fetch("https://app.ticketmaster.com/discovery/v2/events/" + id + "?apikey=" + process.env.REACT_APP_API_KEY);
        event = await event.json();

        // get the prices for this event
        let timepoints = await fetch("http://localhost:8080/api/price?id=" + event.id);
        timepoints = await timepoints.json();

        events.push({
            name: event.name,
            date: event.dates.start.localDate,
            url: event.url,
            venue: event._embedded.venues[0].name,
            min: event.priceRanges ? event.priceRanges[0].min : -1,
            max: event.priceRanges ? event.priceRanges[0].max : -1, // note: max=999 means 999+
            currency: event.priceRanges ? event.priceRanges[0].currency : "",
            id: event.id,
            local_id: event,
            price_dates: timepoints.map(timepoint => new Date(timepoint.date)),
            min_prices: timepoints.map(timepoint => timepoint.minPrice),
            max_prices: timepoints.map(timepoint => timepoint.maxPrice)
        });
    }
    return events;
}

// to make requests to backend
export function EventList() {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            let response = await fetch("http://localhost:8080/api/all");
            response = await response.json();

            setEventIds(
                response.map(event => (
                    event.id
                ))
            );

            // disable to reduce calls to ticketmaster api
            // get url of event and parse
            const ids = await getURLs(response);
            const eventDetails = await getDetails(ids);

            setEvents(eventDetails);

            setLoading(false);
        }
        load();

    }, [])

    const refresh = async () => {
        // todo: make new POST endpoint to add a new timepoint for a given event and then use the endpoint here
        let currDate = new Date();
        currDate = currDate.toISOString().split('T')[0];

        for (let i = 0; i < events.length; i++) {
            const eventId = eventIds[i];
            const event = events[i];

            const url = process.env.REACT_APP_BACKEND_URL + "/api/addPrice?id=" + eventId + "&minPrice="
                + event.min.toString() + "&maxPrice=" + event.max.toString() + "&date=" + currDate;

            try {
                const response = await fetch(url, {
                    method: "POST",
                });
                console.log(response);
            } catch (e) {
                // try catch because gives 400 even when works correctly
            }
        }
    }

    return (
        <div>
            <button class="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={refresh}>Refresh
            </button>

            {loading ? (<h1>loading...</h1>) : (
                <ul>
                    {events.map(event => (
                        <a href={event.url}>
                            <li key={event.id}>{event.name}</li>

                            <LineChart
                                xAxis={[{scaleType: 'time', data: event.price_dates}]}
                                series={[
                                    {
                                        data: event.min_prices,
                                        label: "Min Price",
                                    },
                                    {
                                        data: event.max_prices,
                                        label: "Max Price",
                                    }
                                ]}
                                width={500}
                                height={300}
                            />
                        </a>
                    ))}
                </ul>)}
        </div>
    );
}


