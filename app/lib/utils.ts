import { useEffect, useState } from "react";

// Custom hook to get the current time, updating every second
export function useCurrentTime(intervalMs = 1000) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return now;
}