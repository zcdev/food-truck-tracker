import { Food } from '@/app/lib/types';

import HotMenuItem from './HotMenuCard';

type Props = {
    foods: Food[];
};

export default function HotMenuGrid({ foods }: Props) {
    return (
        <div className='hot-menu-grid grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-x-20 md:gap-y-10 mt-[55px] md:mt-0'>
            {foods.map(food => (
                <div className='hot-menu-card' key={food.foodId}>
                    <HotMenuItem food={food} />
                </div>
            ))}
        </div>
    );
}