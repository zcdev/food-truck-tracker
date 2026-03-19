'use client';
import { useEffect, useState } from "react";

export default function ScheduleClock() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        // Update the time every second
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Format the time using standard JS methods
    const formattedTime = time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    return (
        <>Current Time: {formattedTime}</>
    );
}