import { Food } from '@/app/lib/types';

import HotMenuItem from './HotMenuCard';

type Props = {
    foods: Food[];
    isNotFound: Boolean;
};

export default function HotMenuGrid({ foods, isNotFound }: Props) {
    return (
        <>
            {isNotFound &&
                <div>
                    <h3 className='text-2xl'> We couldn't find that item. These are <em className='text-yellow-100 font-bold text-flame'>HOT</em> 🔥 right now:</h3>
                </div>
            }
            <div className='hot-menu-grid grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-x-20 md:gap-y-10 mt-[55px] md:mt-0'>
                {foods.map(food => (
                    <div className='hot-menu-card' key={food.truckId}>
                        <HotMenuItem food={food} />
                    </div>
                ))}
            </div>
        </>
    );
}