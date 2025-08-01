"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetailPage() {
    const { title } = useParams();
    const [event, setEvent] = useState<any>(null);

    useEffect(() => {
        axios
            .get(`https://fest-event-app-backend.onrender.com/api/events/title/${title}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error("Event fetch failed:", err));
    }, [title]);

    if (!event) return <p className="text-white">Loading...</p>;

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <img src={event.imageUrl} alt={event.title} className="rounded-md my-4 w-full max-w-md" />
            <Link href={`/organiser/events/${encodeURIComponent(event.title)}/register`}>
                <div className="cursor-pointer p-4 bg-black rounded-xl hover:shadow-xl">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p>{event.description}</p>
                </div>
            </Link>
        </div>
    );
}
