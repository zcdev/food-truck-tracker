'use client';
import { Schedule } from '@/app/lib/types';
import { useMemo, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { SortKey } from '@/app/lib/types';
import { sortScheduleItems, parseTruckIds, filterByTruckIds } from "@/app/lib/utils";
import dynamic from 'next/dynamic';

type Props = {
    schedules: Schedule[];
};

// Disable prerendering on ScheduleCard to prevent hydration mismatches
const ScheduleCard = dynamic(() => import('./ScheduleCard'), { ssr: false });

export default function ScheduleGrid({ schedules }: Props) {
    // State to track the current sort key and direction
    const [sortKey, setSortKey] = useState<SortKey>("truckName");
    const [isDesc, setIsDesc] = useState(false);

    // Handle sorting when a button in the column header is clicked
    const onSort = (key: SortKey) => {
        if (key === sortKey) {
            setIsDesc(prev => !prev); // Toggle sort direction if the same button is clicked
        } else {
            setIsDesc(false); // Reset to ascending when changing sort key
        }
        setSortKey(key); // Update state with the key on sort
    };

    // Memoize the sorted schedules to avoid unnecessary re-sorting on every render
    const sortSchedules: Schedule[] = useMemo(() => {
        return sortScheduleItems(schedules, sortKey, isDesc);
    }, [schedules, sortKey, isDesc]);

    // Function to determine the direction of the sort arrow
    const arrow = (key: string) => sortKey === key ? (isDesc ? " ↑" : " ↓") : "";

    const searchParams = useSearchParams();

    // Util helpers to get truckIds from param and display filtered truck logos
    const showed = parseTruckIds(searchParams.get('truckIds'));
    const visibleSchedules = filterByTruckIds(sortSchedules, showed, schedule => schedule.truckId);

    return (
        <div className="schedule-grid text-wrap">
            <table className="w-full table-fixed border-collapse">
                <tbody>
                    <tr className="text-amber-400 text-[11px] md:text-lg font-bold border-b border-stone-500">
                        <td
                            className="text-left pl-3 md:pl-0 pb-3 w-[13%] md:w-[260px]"
                        >
                            <button onClick={() => onSort("truckName")} className="w-full text-left text-nowrap" aria-label={`Truck Name ${isDesc ? "Descending" : "Ascending"}`}>
                                Truck Name{arrow("truckName")}
                            </button>
                        </td>
                        <td
                            className="text-left pl-3 md:pl-0 pb-3 w-[12%] md:w-[212px]"
                        >
                            <button onClick={() => onSort("location")} className="w-full text-left text-nowrap" aria-label={`Location ${isDesc ? "Descending" : "Ascending"}`}>
                                Location{arrow("location")}
                            </button>
                        </td>
                        <td
                            className="text-left pl-3 md:pl-0 pb-3 w-[13%] md:w-[212px]"
                        >
                            <button onClick={() => onSort("nextArrival")} className="w-full text-left text-nowrap" aria-label={`Next Arrival ${isDesc ? "Descending" : "Ascending"}`}>
                                Next Arrival{arrow("nextArrival")}
                            </button>
                        </td>
                        <td
                            className="text-left pl-3 md:pl-0 pb-3 w-[16%] md:w-[212px]"
                        >
                            <button onClick={() => onSort("minutesAway")} className="w-full text-left text-nowrap" aria-label={`Minutes Away ${isDesc ? "Descending" : "Ascending"}`}>
                                Minutes Away{arrow("minutesAway")}
                            </button>
                        </td>
                    </tr>
                    <>
                        {visibleSchedules.map(schedule => {
                            return (
                                <ScheduleCard key={schedule.truckId} schedule={schedule} />
                            );
                        })}
                    </>
                </tbody>
            </table>
        </div>
    );
};