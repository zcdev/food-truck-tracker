import { Truck } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';

type Props = {
    truck: Truck;
    onClick: () => void;
    isShowed?: boolean;
};

export default function FoodTruckCard({ truck, onClick, isShowed }: Props) {
    return (
        <button className='truck-logo' onClick={onClick} style={{ opacity: isShowed ? 1 : 0.2 }}>
            <ImageWrapper
                src={truck.logo}
                alt={`${truck.truckName} logo`}
                width={200}
                height={200}
            />
        </button>
    );
}