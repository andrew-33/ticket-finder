import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";

const saveEvent = async (event) => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/add?name=" + event.id + "&url=" + event.url;
    const response = await fetch(url, {
        method: "POST",
    });
    console.log(response);
}

const parseEvents = async (response) => {
    let events = await response.json(); // await is important here
    events = events._embedded.events;
    // parse the events array into simpler json without unused info
    const parsedEvents = events.map(event => (
        {
            name: event.name,
            date: event.dates.start.localDate,
            url: event.url,
            venue: event._embedded.venues[0].name,
            min: event.priceRanges ? event.priceRanges[0].min : -1,
            max: event.priceRanges ? event.priceRanges[0].max : -1, // note: max=999 means 999+
            currency: event.priceRanges ? event.priceRanges[0].currency : "",
            id: event.id
        }
    ));

    return parsedEvents;
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

            setEvents(result);
            setLoading(false);
        }

         load();

    }, [])

    const buttonClass = "shadow appearance-none border rounded w-[10%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

    return (
        <div class="bg-slate-200 w-full h-full fixed overflow-auto">
            <NavBar />

                <br/><br/>
                <h1 class="px-[5%]">Upcoming Events</h1>

            <div className="py-8 px-[15%] ">
                <div class="space-x-20">
                    <h3>Filter</h3>
                    <input className={buttonClass} id="name" name="name" type="text" placeholder="Name" />
                    <input className={buttonClass} id="city" name="city" type="text" placeholder="City" />
                    <input className={buttonClass} id="genre" name="genre" type="text" placeholder="Genre" />
                    <input className={buttonClass} id="venue" name="venue" type="text" placeholder="Venue" />
                </div>
                <br/>

                <button //onClick={} TODO
                        className="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Apply
                </button>
                <br/><br/>

                {loading ? (<h1>loading...</h1>) : (

                    <div>
                        <ul>
                            {events.map(event => (
                                <li>

                                    <b>
                                        <a href={event.url}>
                                            {event.name}
                                        </a>
                                    </b>
                                    <div class="px-5">
                                        <p>{event.date}</p>
                                        <p>{event.venue}</p>
                                        <p>
                                            min: {event.min} {event.currency}
                                        </p>
                                        <p>
                                            max: {event.max} {event.currency}
                                        </p>

                                    </div>


                                    <button onClick={() => saveEvent(event)}
                                            className="bg-dark hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                        Save
                                    </button>
                                    <br/> <br/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
