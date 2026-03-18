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
        <div className="slide flex flex-col md:flex-row slide-two-three bg-stone-800 mt-8 pl-0 md:pl-47 text-center md:text-right">
            <div className="content w-full md:w-[43%] mr-0 md:mr-5">
                <h1 className="text-center md:text-left text-3xl font-bold py-4">Hottest Item</h1>
                <p className="text-center md:text-left text-lg md:text-2xl">{hotItem.foodName}</p>
                <p className='mt-2 text-md text-center md:text-left max-w-full md:max-w-xs px-12 md:px-0'>{hotItem.description}</p>
                <p className="text-center md:text-left text-yellow-100 italic pt-2">@{hotItem.truckName}</p>
                <p className='mt-2 text-lg text-center md:text-left font-bold text-amber-400'>Price: ${hotItem.price.toFixed(2)}</p>
            </div>
            <div className="hottest-item flex justify-center md:justify-end items-end md:pr-33 md:pb-33 mt-4 md:mt-0">
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