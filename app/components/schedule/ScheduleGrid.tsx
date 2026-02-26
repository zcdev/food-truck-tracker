import { Schedule } from '@/app/lib/types';
import ScheduleCard from './ScheduleCard';

type Props = {
    schedules: Schedule[];
    now: Date;
    currentTime: Date;
};

export default function ScheduleGrid({ schedules, now, currentTime }: Props) {
    return (
        <div className='schedule-grid grid gap-4'>
            <div className='schedule-card grid grid-rows-1 grid-cols-[30%_1fr_1fr_1fr_1fr] text-amber-400 text-lg font-bold border-b border-stone-500 pb-4'>
                <h3>Truck Name</h3>
                <h3>Location</h3>
                <h3>Next Truck</h3>
                <h3>Time Away</h3>
            </div>
            {schedules.map(schedule => (
                <div className='schedule-grid-items' key={schedule.truckId}>
                    <ScheduleCard schedule={schedule} now={now} currentTime={currentTime} />
                </div>
            ))}
        </div>
    );
}