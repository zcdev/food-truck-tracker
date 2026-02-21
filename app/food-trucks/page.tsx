import { trucks } from '@/app/lib/data/trucks';

import FoodTruckView from "@/app/components/food-trucks/FoodTruckView";

export default function Page() {
    return <FoodTruckView trucks={trucks} />;
}