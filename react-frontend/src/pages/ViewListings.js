import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";

// to make requests to the public Discovery API
export function ViewListings() {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {

        const url = "https://app.ticketmaster.com/discovery/v2/events?marketId=102&apikey=" + process.env.REACT_APP_API_KEY;

        const load = async () => {
            setLoading(true);

            const response = await fetch(url);

            setEvents(await response.json());
            setLoading(false);
        }

         load();

    }, [])

    return (
        <div>
            <NavBar />
            {loading ? (<h1>loading...</h1>) : (
                <div>
                    {/*<ul>*/}
                    {/*    {events["_embedded"]["events"].map(event => (*/}
                    {/*        <li>{event.name}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                    <p>{JSON.stringify(events._embedded)}</p>
                </div>
            )}
        </div>
    );
}
