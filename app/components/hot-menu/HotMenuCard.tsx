import { Food } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';

type Props = {
    food: Food;
};

// Show rating stars from the food props
const rating = ({ food }: Props) => {
    const stars = food.rating;
    const ratingStars = [];
    for (let i = 0; i < stars; i++) {
        ratingStars.push(
            <span key={i} className='rating-star'>⭐️</span>
        );
    }
    return ratingStars;
};

export default function HotMenuCard({ food }: Props) {
    return (
        <>
            <ImageWrapper
                className='food-image'
                src={food.foodImg}
                alt={`${food.foodName} image`}
                width={300}
                height={300}
            />
            <div className='text-center md:text-left'>
                <h3 className='mt-2 text-2xl text-center md:text-left'>{food.foodName}</h3>
                <div className='mt-2 text-center md:text-left'>{rating({ food })}</div>
                <p className='mt-2 text-lg text-center md:text-left'>{food.description}</p>
                <p className='mt-2 text-md text-center md:text-left text-yellow-100 italic'>@{food.truckName}</p>
                <p className='mt-2 text-lg text-center md:text-left font-bold text-amber-400'>Price: ${food.price.toFixed(2)}</p>
            </div>
        </>
    );
}