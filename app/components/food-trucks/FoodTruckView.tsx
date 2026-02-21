import { Truck } from '@/app/lib/types';
import FoodTruckGrid from "./FoodTruckGrid";

type Props = {
    trucks: Truck[];
};

export default function FoodTruckView({ trucks }: Props) {
    return <FoodTruckGrid trucks={trucks} />;
}