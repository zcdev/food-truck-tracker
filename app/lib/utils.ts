import { useEffect, useState } from "react";
import { Schedule, Food } from "@/app/lib/types";

// Custom hook to get the current time, updating every second
export function useCurrentTime(intervalMs = 1000) {

    // State to hold the current time in milliseconds since the Unix epoch
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const tick = () => setNow(Date.now());

        tick();
        const interval = setInterval(tick, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return now;
}

export type SortKey = "truckName" | "location" | "minutesAway" | "nextArrival";

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

// Function to parse a comma-separated string of truck IDs into an array of numbers
export function parseTruckIds(value: string | null | undefined): ShowedTruckIds {
    if (!value) return [];

    const ids = value
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => Number(n));

    if (ids.length === 0) return [];

    return Array.from(new Set(ids));
}

// Function to filter items based on showed truck IDs, using a provided function to extract the truck ID from each item
export function filterByTruckIds<T>(
    items: T[],
    showed: ShowedTruckIds,
    getTruckId: (item: T) => number
): T[] {
    if (!showed || showed.length === 0) return items;
    return items.filter(item => showed.includes(getTruckId(item)));
}

// Most popular hot-menu items as recommended
export function recommendFoods(foods: Food[]) {
    return foods.filter(food => food.rating === 5);
}