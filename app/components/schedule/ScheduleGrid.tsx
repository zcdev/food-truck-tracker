import { Schedule } from '@/app/lib/types';
import ScheduleCard from './ScheduleCard';
import { sortScheduleItems, SortDir, SortKey } from "@/app/lib/utils";
import { useMemo, useState } from "react";

type Props = {
    schedules: Schedule[];
    currentTime: number;
};

export default function ScheduleGrid({ schedules, currentTime }: Props) {
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>("asc");

    // Handle sorting when a button in the column header is clicked
    const onSort = (key: SortKey) => {
        setSortKey(prevKey => {
            if (sortKey === key) {
                setSortDir(prev => prev === "asc" ? "desc" : "asc");
                return prevKey; // Keep the same key, just toggle direction
            }
            setSortDir("asc"); // Reset to ascending when changing key
            return key;
        });
    };

    // Memoize the sorted schedules to avoid unnecessary re-sorting on every render
    const sortSchedules: Schedule[] = useMemo(() => {
        return sortScheduleItems(schedules, sortKey, sortDir);
    }, [sortKey, sortDir]);

    const arrow = (key: SortKey) =>
        sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

    return (
        <div className='schedule-grid grid gap-4'>
            <div className='schedule-card grid grid-rows-1 grid-cols-[30%_1fr_1fr_1fr_1fr] text-amber-400 text-lg font-bold border-b border-stone-500 pb-4'>
                <button onClick={() => onSort("truckName")} className="text-left">
                    Truck Name{arrow("truckName")}
                </button>

                <button onClick={() => onSort("location")} className="text-left">
                    Location{arrow("location")}
                </button>

                <button onClick={() => onSort("nextTruck")} className="text-left">
                    Next Truck{arrow("nextTruck")}
                </button>

                <button onClick={() => onSort("minutesAway")} className="text-left">
                    Time Away{arrow("minutesAway")}
                </button>
            </div>
            {sortSchedules.map(schedule => (
                <div className='schedule-grid-items' key={schedule.truckId}>
                    <ScheduleCard schedule={schedule} currentTime={currentTime} />
                </div>
            ))}
        </div>
    );
}