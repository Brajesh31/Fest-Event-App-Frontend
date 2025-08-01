"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const RegisterPage = () => {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [organiserDetails, setOrganiserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        eventId: "",
        eventName: params.title || "",
        imageUrls: "",
    });
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params && typeof params.title === "string") {
          setTitle(params.title);
        }
      }, [params]);
    
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`https://fest-event-app-backend.onrender.com/api/events/title/${params.title}`);
                const data = await res.json();
                setEvent(data);
                setOrganiserDetails((prev) => ({
                    ...prev,
                    eventId: data._id,
                    eventName: data.title,
                }));
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [params.title]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOrganiserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formattedDetails = {
            ...organiserDetails,
            imageUrls: organiserDetails.imageUrls
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url !== ""),
        };

        try {
            if (!formattedDetails.eventId || !formattedDetails.eventName) {
                alert("Missing event ID or name.");
                return;
            }

            const response = await fetch("https://fest-event-app-backend.onrender.com/api/organiserdetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Server error");
            }

            alert("Organizer registered successfully!");
            setOrganiserDetails({
                name: "",
                phone: "",
                address: "",
                eventId: event._id,
                eventName: event.title,
                imageUrls: "",
            });
        } catch (error) {
            console.error("Error submitting organizer:", error);
            alert("Error submitting organizer: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Organizer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={organiserDetails.name}
                    onChange={handleChange}
                    placeholder="Organizer Name"
                    required
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                    type="text"
                    name="phone"
                    value={organiserDetails.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <textarea
                    name="address"
                    value={organiserDetails.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <input
                    type="text"
                    name="imageUrls"
                    value={organiserDetails.imageUrls}
                    onChange={handleChange}
                    placeholder="Image URLs (comma-separated)"
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500"
                >
                    {loading ? "Submitting..." : "Submit Organizer"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
