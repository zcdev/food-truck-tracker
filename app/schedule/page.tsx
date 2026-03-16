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
        <section id="schedule" className='schedule-section max-w-5xl mb-8'>
            <h2 className='pt-10 text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Schedule</h2>
            <ScheduleGrid schedules={schedules} />
            <p className='text-amber-400 text-sm md:text-lg font-bold pt-4 pl-3 md:pl-0'>Current Time: {formattedCurrentTime}</p>
        </section>
    );
}