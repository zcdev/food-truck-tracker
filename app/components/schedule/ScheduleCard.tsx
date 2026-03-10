'use client';
import { Schedule } from '@/app/lib/types';
import { useState, useEffect } from 'react';

type Props = {
    schedule: Schedule;
    currentTime: number;
};

export default function ScheduleCard({ schedule, currentTime }: Props) {

    const milliSec = 1000; // 1 second in milliseconds

    const milliSecAway = schedule.minutesAway * 60 * milliSec; // Convert minutesAway to milliseconds

    const nextArrivalTime = currentTime + milliSecAway; // Calculate the sum of current time and milliSecAway to get the next arrival time

    // State to track the remaining time until the next truck arrives, initialized with the calculated milliSecAway
    const [nextArrival, setNextArrival] = useState(nextArrivalTime);
    const [timeAway, setTimeAway] = useState(milliSecAway);

    // Set up an interval to update the remaining time every second
    useEffect(() => {
        const remainingTime = setInterval(() => {
            setTimeAway(prev => prev - milliSec); // Count down by 1 second
        }, milliSec);

        return () => clearInterval(remainingTime); // Clean up the interval on component unmount
    }, []);

    // Reset when the timer runs out and update the next arrival
    useEffect(() => {
        if (timeAway <= 0) {
            setTimeAway(milliSecAway);
            setNextArrival(nextArrivalTime);
        }
    }, [timeAway, nextArrival]);

    // Get the total time away in milliseconds
    const totalTimeAway = new Date(timeAway).getTime();

    // Format the total time away as MM:SS, ensuring that minutes and seconds are always two digits
    const formattedMinutesAway = `${Math.floor(totalTimeAway / 60 / milliSec).toString().padStart(2, '0')}:${Math.floor((totalTimeAway / milliSec) % 60).toString().padStart(2, '0')}`;

    // Format the next arrival time as HH:MM in 12-hour format
    const formattedNextArrival = new Date(nextArrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className="text-xs md:text-md lg:text-lg text-white border-b border-stone-500 pb-4">
            <td className="w-[40%] pl-3 md:pl-0 py-3 text-yellow-100 italic">@{schedule.truckName}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3">{schedule.location}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3">{formattedNextArrival}</td>
            <td className="w-[20%] pl-3 md:pl-0 py-3">{formattedMinutesAway}</td>
        </tr>
    );
}