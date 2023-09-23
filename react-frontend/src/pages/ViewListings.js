import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";

const parseEvents = async (response) => {
    let json = await response.json(); // await is important here
    json = json._embedded.events[0].name;
    return JSON.stringify(json);
}

// to make requests to the public Discovery API
export function ViewListings() {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {

        const params = ["marketId=102&", "segmentName=music&"]
        let url = "https://app.ticketmaster.com/discovery/v2/events?";
        for (const item of params) {
            url += item;
        }
        url += "apikey=" + process.env.REACT_APP_API_KEY;

        const load = async () => {
            setLoading(true);

            const response = await fetch(url);
            const result = await parseEvents(response);

            setEvents([result]);
            setLoading(false);
        }

         load();

    }, [])

    return (
        <div class="bg-slate-200 w-full h-full fixed">
            <NavBar />
            {loading ? (<h1>loading...</h1>) : (
                <div>
                    {/*<ul>*/}
                    {/*    {events["_embedded"]["events"].map(event => (*/}
                    {/*        <li>{event.name}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                    <p>{events}</p>
                </div>
            )}
        </div>
    );
}
