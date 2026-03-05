'use client';
import { schedules } from '@/app/lib/data/schedule';
import ScheduleGrid from '@/app/components/schedule/ScheduleGrid';
import { useCurrentTime } from '@/app/lib/utils';
import { useMemo } from 'react';

export default function SchedulePage() {

    // Get the current time using the custom hook, which updates every second
    const currentTime = useCurrentTime();

    // Memoize the formatted current time to avoid unnecessary re-computation on every render
    const formattedCurrentTime = useMemo(() => {
        if (currentTime === 0) return "--:--:--";
        return new Date(currentTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }, [currentTime]);

    return (
        <section className='schedule-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Food Truck Schedule</h2>
            <ScheduleGrid schedules={schedules} currentTime={currentTime} />
            <p className='text-amber-400 text-lg font-bold pt-4'>Current Time: {formattedCurrentTime}</p>
        </section>
    );
}