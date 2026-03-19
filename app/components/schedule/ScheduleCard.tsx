'use client';
import { Schedule } from '@/app/lib/types';
import { useState, useEffect } from 'react';
import { useCurrentTime } from '@/app/lib/utils';

type Props = {
    schedule: Schedule;
};

export default function ScheduleCard({ schedule }: Props) {

    // Get current time now
    const currentTime = useCurrentTime();

    // If currentTime is null, don't proceed
    if (!currentTime) return;

    // As millisecond
    const oneSec = 1000;

    // Store the minutesAway in millisecond for reuse
    const duration = schedule.minutesAway * 60 * oneSec;

    // Store duration in state
    const [timeAway, setTimeAway] = useState(duration);

    // Store the computed next food truck arrival time
    const [nextArrival, setNextArrival] = useState(currentTime + duration);

    // Counting down by 1 sec for the minutes away
    useEffect(() => {
        const remainingTime = setInterval(() => {
            setTimeAway(prev => prev - oneSec);
        }, oneSec);
        return () => clearInterval(remainingTime);
    }, []);

    // Reset when the timer runs out and update the next arrival
    useEffect(() => {
        if (timeAway === 0) {
            setTimeAway(duration);
            setNextArrival(prev => nextArrival + duration);
        }
    }, [timeAway, nextArrival]);

    // Format the total time away as MM:SS, ensuring that minutes and seconds are always two digits
    const formattedMinutesAway = `${Math.floor(timeAway / 60 / oneSec).toString().padStart(2, '0')}:${Math.floor((timeAway / oneSec) % 60).toString().padStart(2, '0')}`;

    // Format the next arrival time as HH:MM in 12-hour format
    const formattedNextArrival = new Date(nextArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className="text-xs md:text-md lg:text-lg text-white border-b border-stone-500 pb-4">
            <td className="w-[40%] pl-3 md:pl-0 py-3 text-yellow-100 italic">@{schedule.truckName}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3">{schedule.location}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3" suppressHydrationWarning>{formattedNextArrival}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3" suppressHydrationWarning>{formattedMinutesAway}</td>
        </tr>
    );
}