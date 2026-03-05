import { useEffect, useState } from "react";
import { Schedule } from "@/app/lib/types";

export type SortKey = "truckName" | "location" | "minutesAway" | "nextArrival";

// Custom hook to get the current time, updating every second
export function useCurrentTime(intervalMs = 1000) {
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return now;
}

// Function to sort schedule items based on the specified key and direction
export function sortScheduleItems(schedules: Schedule[], sortKey: SortKey, isDesc: boolean): Schedule[] {

    const dir = isDesc ? -1 : 1; // Determine sort direction multiplier as a toggle by flipping between -1 and 1

    return [...schedules].sort((a, b) => {

        // Value for Next Truck is derived from minutesAway, so we handle it as a special case
        if (sortKey === "nextArrival") {
            return (a.minutesAway - b.minutesAway) * dir;
        }

        // Values for other keys
        const valA = a[sortKey] ?? null;
        const valB = b[sortKey] ?? null;

        // Numeric sort
        if (typeof valA === "number" && typeof valB === "number") {
            return (valA - valB) * dir;
        }

        // String sort (fallback)
        return String(valA).localeCompare(String(valB)) * dir;
    });
}

export type ShowedTruckIds = number[] | null;

export function parseTruckIds(value: string | null | undefined): ShowedTruckIds {
    if (!value) return null;

    const ids = value
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => Number.isFinite(n));

    if (ids.length === 0) return [];

    return Array.from(new Set(ids));
}

// Function to filter items based on showed truck IDs, using a provided function to extract the truck ID from each item
export function filterByTruckIds<T>(
    items: T[],
    showed: ShowedTruckIds,
    getTruckId: (item: T) => number
): T[] {
    if (showed === null) return items;
    if (showed.length === 0) return [];
    return items.filter(item => showed.includes(getTruckId(item)));
}
