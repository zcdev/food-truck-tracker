import { Truck } from '@/app/lib/types';
import FoodTruckCard from './FoodTruckCard';

type Props = {
    trucks: Truck[];
};

export default function FoodTruckGrid({ trucks }: Props) {
    return (
        <div className='truck-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {trucks.map(truck => (
                <div className='truck-card' key={truck.truckId}>
                    <FoodTruckCard truck={truck} />
                </div>
            ))}
        </div>
    );
}