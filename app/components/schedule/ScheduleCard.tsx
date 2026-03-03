'use client';
import { Schedule } from '@/app/lib/types';
import { useState, useEffect } from 'react';

type Props = {
    schedule: Schedule;
    currentTime: number;
};

export default function ScheduleCard({ schedule, currentTime }: Props) {

    const milliSec = 1000;

    const milliSecAway = schedule.minutesAway * 60 * milliSec;

    const nextArrivalTime = currentTime + milliSecAway;

    const [timeAway, setTimeAway] = useState(milliSecAway);

    const [nextArrival, setNextArrival] = useState(nextArrivalTime);

    useEffect(() => {
        const remainingTime = setInterval(() => {
            setTimeAway(prev => prev - milliSec); // Decrease by 1 second
        }, milliSec);

        return () => clearInterval(re.mainingTime);
    }, []);

    useEffect(() => {
        if (timeAway < 0) {
            setTimeAway(milliSecAway);
            setNextArrival(nextArrivalTime);
        }
    }, [timeAway, nextArrival]);

    const formattedTimeAway = new Date(timeAway).toISOString().slice(11, 19); // Format as HH:MM:SS

    const formattedNextArrival = new Date(nextArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className='schedule-card grid grid-rows-1 grid-cols-[30%_1fr_1fr_1fr_1fr] text-md text-white border-b border-stone-500 pb-4'>
            <p className='italic text-yellow-100'>@{schedule.truckName}</p>
            <p className='font-semibold'>{schedule.location}</p>
            <p>{formattedNextArrival}</p>
            <p>{formattedTimeAway}</p>
        </div>
    );
}