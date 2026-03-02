'use client';
import { schedules } from '@/app/lib/data/schedule';
import ScheduleGrid from '@/app/components/schedule/ScheduleGrid';
import { useState } from 'react';
import { useCurrentTime } from '@/app/lib/utils';

export default function SchedulePage() {

    const currentTime = useCurrentTime();

    const formmatedCurrentTime = new Date(currentTime).toLocaleTimeString();

    return (
        <section className='schedule-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left gap-10 mb-[30px] md:mb-[50px]'>Food Truck Schedule</h2>
            <ScheduleGrid schedules={schedules} currentTime={currentTime} />
            <h4 className='text-amber-400 text-lg font-bold pt-4'>Current Time: {formmatedCurrentTime}</h4>
        </section>
    );
}