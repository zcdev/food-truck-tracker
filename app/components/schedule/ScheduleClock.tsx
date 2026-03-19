import { useCurrentTime } from '@/app/lib/utils';
import { useEffect, useState } from "react";

export default function ScheduleClock() {
    // Get the current time using the custom hook, which updates every second
    const currentTime = useCurrentTime();

    // Store mounted state
    const [mounted, setMounted] = useState(false);

    // When the component is mounted, update state to true
    useEffect(() => {
        setMounted(true);
    }, []);

    // Render a stable placeholder on the server, then show the live time only after mount
    const formattedCurrentTime =
        mounted && currentTime
            ? new Date(currentTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            : "--:--:--";
    return (
        <>Current Time: {formattedCurrentTime}</>
    );
}