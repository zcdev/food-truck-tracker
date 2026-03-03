import { Schedule } from '@/app/lib/types';
import ScheduleCard from './ScheduleCard';
import { sortScheduleItems, SortKey } from "@/app/lib/utils";
import { useMemo, useState } from "react";

type Props = {
    schedules: Schedule[];
    currentTime: number;
};

export default function ScheduleGrid({ schedules, currentTime }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>("truckName");
    const [isDesc, setIsDesc] = useState(false);

    // Handle sorting when a button in the column header is clicked
    const onSort = (key: SortKey) => {
        if (key === sortKey) {
            setIsDesc(prev => !prev);
        } else {
            setIsDesc(false); // Reset to ascending when changing sort key
        }
        setSortKey(key);
        return key;
    };

    // Memoize the sorted schedules to avoid unnecessary re-sorting on every render
    const sortSchedules: Schedule[] = useMemo(() => {
        return sortScheduleItems(schedules, sortKey, isDesc);
    }, [schedules, sortKey, isDesc]);

    // Helper function to determine the direction of the sort arrow
    const arrow = (key: string) => sortKey === key ? (isDesc ? " ↑" : " ↓") : "";

    return (
        <div className='schedule-grid grid gap-4'>
            <div className='schedule-card grid grid-rows-1 grid-cols-[30%_1fr_1fr_1fr_1fr] text-amber-400 text-lg font-bold border-b border-stone-500 pb-4'>
                <button onClick={() => onSort("truckName")}
                    aria-sort={sortKey === "truckName" ? (isDesc ? "descending" : "ascending") : "none"} className="text-left">
                    Truck Name{arrow("truckName")}
                </button>

                <button onClick={() => onSort("location")}
                    aria-sort={sortKey === "location" ? (isDesc ? "descending" : "ascending") : "none"} className="text-left">
                    Location{arrow("location")}
                </button>

                <button onClick={() => onSort("nextArrival")}
                    aria-sort={sortKey === "nextArrival" ? (isDesc ? "descending" : "ascending") : "none"} className="text-left">
                    Next Truck{arrow("nextArrival")}
                </button>

                <button onClick={() => onSort("minutesAway")}
                    aria-sort={sortKey === "minutesAway" ? (isDesc ? "descending" : "ascending") : "none"} className="text-left">
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
};