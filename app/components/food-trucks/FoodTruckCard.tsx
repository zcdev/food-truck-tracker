import { Truck } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';

type Props = {
    truck: Truck;
    onClick: () => void;
};

export default function FoodTruckCard({ truck, onClick }: Props) {
    return (
        <button className='truck-logos' onClick={onClick}>
            <ImageWrapper
                src={truck.logo}
                alt={`${truck.truckName} logo`}
                width={200}
                height={200}
            />
        </button>
    );
}