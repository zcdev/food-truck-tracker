import ImageWrapper from '@/app/components/ui/ImageWrapper';
import { Truck } from '@/app/lib/types';

type Props = {
    truck: Truck;
};

export default function FoodTruckCard({ truck }: Props) {
    return (
        <div className='truck-logos'>
            <ImageWrapper
                src={truck.logo}
                alt={`${truck.truckName} logo`}
                width={200}
                height={200}
            />
        </div>
    );
}