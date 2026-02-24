import { Truck } from '@/app/lib/types';

import FoodTruckCard from './FoodTruckCard';

type Props = {
    trucks: Truck[];
    onClick: (truck: Truck) => void;
};

export default function FoodTruckGrid({ trucks, onClick }: Props) {
    return (
        <div className='truck-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-[40px] md:mt-[60px]'>
            {trucks.map(truck => (
                <div className='truck-card grid' key={truck.truckId}>
                    <FoodTruckCard truck={truck} onClick={() => onClick(truck)} />
                </div>
            ))}
        </div>
    );
}