"use client";
import Link from "next/link";
import ImageWrapper from '@/app/components/ui/ImageWrapper';
import { trucks } from '@/app/lib/data';
import { useRandomizedItem } from '@/app/lib/utils';

export default function SlideThree() {

    // Get randomized featured truck
    const featuredTruck = useRandomizedItem(trucks);

    // If featured truck is not available, stop proceeding
    if (!featuredTruck) return;

    return (
        <div className="slide slide-two flex flex-row bg-stone-800 mt-8 pl-0 md:pl-47 text-center md:text-left">
            <div className="content w-[45%] mr-5">
                <h3 className="text-center md:text-left text-3xl font-bold py-4">Featured Trucks</h3>
                <p className="w-auto text-center md:text-left text-yellow-100 italic">@{featuredTruck.truckName}</p>
                <p className="text-center md:text-left text-white italic pt-0 md:pt-3">{featuredTruck.description}</p>
                <Link href="/#about" className="inline-block w-auto text-sm md:text-lg text-white font-bold bg-orange-700 rounded-lg hover:bg-orange-500 px-4 py-3 mt-4">Trucks</Link>
            </div>
            <div className="featured-truck flex-col items-end place-content-start mt-10">
                <ImageWrapper
                    className='logo-img'
                    src={featuredTruck.logo}
                    alt={`${featuredTruck.truckName} image`}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}