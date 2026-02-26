'use client';
import { Schedule } from '@/app/lib/types';
import { useState, useEffect } from 'react';

type Props = {
    schedule: Schedule;
    now: Date;
    currentTime: Date;
};

export default function ScheduleCard({ schedule, currentTime }: Props) {

    const [secAway, setSecAway] = useState(schedule.minutesAway * 60); // in seconds

    useEffect(() => {
        const remainingSec = setInterval(() => {
            setSecAway(prev => prev - 1);
        }, 1000 /* 1 second */);

        return () => clearInterval(remainingSec);

    }, [secAway]);

    const nextTruck = new Date(currentTime.getTime() + secAway * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const minutesAway = new Date(secAway * 1000).toISOString().substring(14, 19);

    return (
        <div className='schedule-card grid grid-rows-1 grid-cols-[30%_1fr_1fr_1fr_1fr] text-md text-white border-b border-stone-500 pb-4'>
            <p className='italic text-yellow-100'>@{schedule.truckName}</p>
            <p className='font-semibold'>{schedule.location}</p>
            <p>{nextTruck}</p>
            <p>{minutesAway}</p>
        </div>
    );
}