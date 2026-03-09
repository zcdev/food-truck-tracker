import { Truck } from '@/app/lib/types';

import FoodTruckCard from './FoodTruckCard';

type Props = {
    visibleTrucks: Truck[];
    onClick: (truck: Truck) => void;
};

export default function FoodTruckGrid({ visibleTrucks, onClick }: Props) {
    return (
        <div className='truck-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-[40px] md:mt-[60px]'>
            {visibleTrucks.map(truck => {
                return (
                    <div className='truck-card grid' key={truck.truckId}>
                        <FoodTruckCard truck={truck} onClick={() => onClick(truck)} />
                    </div>
                );
            })}
        </div>
    );
}