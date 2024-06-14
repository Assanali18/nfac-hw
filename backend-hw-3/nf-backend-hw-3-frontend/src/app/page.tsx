'use client';
import { useEffect, useState } from "react";
import axios from 'axios';

interface Event {
    url: string;
    title: string;
}

interface Data {
    lastUpdated: string;
    events: Event[];
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Data>('https://storage.yandexcloud.net/parse-4/data.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEhbqGZjfHqYHQGfew82W0%2F20240614%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20240614T202038Z&X-Amz-Expires=1800000&X-Amz-Signature=BD8E92B97E360E2A9DF58BE92A53D432E4E4F2D82FF1F8FC4A2779AF9DAA5F68&X-Amz-SignedHeaders=host');
                if (!response.data) throw new Error('Network response was not ok');
                setEvents(response.data.events);
                setLastUpdated(response.data.lastUpdated);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Upcoming Events</h1>
            <p>Last Updated: {lastUpdated}</p>
            {events.length > 0 ? (
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <a href={event.url} target="_blank" style={{ textDecoration: 'underline' }}>{event.title}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events to display.</p>
            )}
        </div>
    );
}
