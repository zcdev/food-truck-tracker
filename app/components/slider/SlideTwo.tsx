"use client";
import ImageWrapper from '@/app/components/ui/ImageWrapper';
import { Food } from "@/app/lib/types";
import { useRandomizedItem } from '@/app/lib/utils';

type Props = {
    hotItems: Food[];
};

export default function SlideTwo({ hotItems }: Props) {

    // Get randomized hot item for the current slide
    const hotItem = useRandomizedItem(hotItems);

    // If hot item is not available, stop proceeding
    if (!hotItem) return;

    return (
        <div className="slide slide-two bg-stone-800 mt-8 pl-0 md:pl-47 text-center md:text-right flex">
            <div className="content w-[43%] mr-5">
                <h3 className="text-center md:text-left text-3xl font-bold py-4">Hottest Item</h3>
                <p className="text-center md:text-left text-2xl" >{hotItem.foodName}</p>
                <p className='mt-2 text-md text-center md:text-left max-w-xs'>{hotItem.description}</p>
                <p className="text-center md:text-left text-yellow-100 italic pt-2">@{hotItem.truckName}</p>
                <p className='mt-2 text-lg text-center md:text-left font-bold text-amber-400'>Price: ${hotItem.price.toFixed(2)}</p>
            </div>
            <div className="flex justify-end items-end pr-33 pb-33">
                <ImageWrapper
                    className='food-image inline-flex'
                    src={hotItem.foodImg}
                    alt={`${hotItem.foodName} image`}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}