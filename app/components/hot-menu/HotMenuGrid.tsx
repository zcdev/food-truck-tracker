import { Food } from '@/app/lib/types';

import HotMenuItem from './HotMenuCard';

type Props = {
    foods: Food[];
};

export default function HotMenuGrid({ foods }: Props) {

    return (
        <div className='hot-menu-grid grid grid-cols-1 md:grid-cols-2 gap-y-15 md:gap-y-0 lg:gap-y-10 gap-x-15 lg:gap-x-20'>
            {foods.map(food => (
                <div className='hot-menu-card' key={food.foodId}>
                    <HotMenuItem food={food} />
                </div>
            ))}
        </div>
    );
}