import { useEffect, useState } from "react";
import { Schedule } from "@/app/lib/types";

export type SortKey = "truckName" | "location" | "minutesAway" | "nextTruck";
export type SortDir = "asc" | "desc";

// Custom hook to get the current time, updating every second
export function useCurrentTime(intervalMs = 1000) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return now;
}

export function sortScheduleItems(schedules: Schedule[],
    sortKey: SortKey | null,
    sortDir: SortDir = "asc") {

    if (!sortKey) return schedules;

    const dir = sortDir === "asc" ? 1 : -1; // Determine sort direction multiplier as a toggle by flipping between 1 and -1

    return [...schedules].sort((a, b) => {

        // Value for Next Truck is derived from minutesAway, so we handle it as a special case
        if (sortKey === "nextTruck") {
            return (a.minutesAway - b.minutesAway) * dir;
        }

        // Values for other keys
        const valA = a[sortKey] || "";
        const valB = b[sortKey] || "";

        // Numeric sort
        if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * dir;
        }

        // String sort (fallback)
        return String(valA).localeCompare(String(valB)) * dir;

    });

}
