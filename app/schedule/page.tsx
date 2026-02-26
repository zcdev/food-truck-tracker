'use client';
import { schedules } from '@/app/lib/data/schedule';
import ScheduleGrid from '@/app/components/schedule/ScheduleGrid';
import { useCurrentTime } from '@/app/lib/utils';

export default function SchedulePage() {

    const now = new Date();

    const currentTime = useCurrentTime();

    return (
        <section className='schedule-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Food Truck Schedule</h2>
            <ScheduleGrid schedules={schedules} now={now} currentTime={currentTime} />
            <h4 className='text-amber-400 text-lg font-bold pt-4'>Current Time: {currentTime.toLocaleTimeString()}</h4>
        </section>
    );
}