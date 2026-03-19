'use client';
import { schedules } from '@/app/lib/data/schedule';
import ScheduleGrid from '@/app/components/schedule/ScheduleGrid';
import dynamic from 'next/dynamic';

// Disable prerendering on ScheduleClock to prevent hydration mismatches
const ScheduleClock = dynamic(() => import('../components/schedule/ScheduleClock'), { ssr: false });

export default function SchedulePage() {
    return (
        <section id="schedule" className='schedule-section max-w-5xl mb-8'>
            <h2 className='pt-10 text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Schedule</h2>
            <ScheduleGrid schedules={schedules} />
            <p className='text-amber-400 text-sm md:text-lg font-bold pt-4 pl-3 md:pl-0' suppressHydrationWarning={true}><ScheduleClock /></p>
        </section>
    );
}