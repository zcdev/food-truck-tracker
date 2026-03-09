'use client';
import { schedules } from '@/app/lib/data/schedule';
import ScheduleGrid from '@/app/components/schedule/ScheduleGrid';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCurrentTime, parseTruckIds, filterByTruckIds } from '@/app/lib/utils';

export default function SchedulePage() {

    const currentTime = useCurrentTime();

    const formattedCurrentTime = useMemo(() => {
        if (currentTime == null) return "--:--:--";
        return new Date(currentTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }, [currentTime]);

    const searchParams = useSearchParams();

    return (
        <section className='schedule-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Food Truck Schedule</h2>
            <ScheduleGrid schedules={schedules} currentTime={currentTime} />
            <p className='text-amber-400 text-lg font-bold pt-4'>Current Time: {formattedCurrentTime}</p>
        </section>
    );
}