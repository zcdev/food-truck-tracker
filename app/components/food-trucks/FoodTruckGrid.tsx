import { Truck } from '@/app/lib/types';
import { useState } from 'react';

import FoodTruckCard from './FoodTruckCard';

type Props = {
    trucks: Truck[];
    visibleTrucks: Truck[];
    onClick: (truck: Truck) => void;
};

export default function FoodTruckGrid({ trucks, visibleTrucks, onClick }: Props) {

    return (
        <div className='truck-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-[40px] md:mt-[60px]'>
            {trucks.map(truck => {
                const isShowed = visibleTrucks.some(visibleTruck => visibleTruck.truckId === truck.truckId);
                return (
                    <div className='truck-card grid' key={truck.truckId}>
                        <FoodTruckCard truck={truck} onClick={() => onClick(truck)} isShowed={isShowed} />
                    </div>
                );
            })}
        </div>
    );
}