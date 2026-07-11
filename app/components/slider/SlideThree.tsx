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
        <div className="slide slide-two-three flex flex-col-reverse md:flex-row bg-stone-800 pl-0 md:pl-47 text-center md:text-left place-content-start">
            <div className="content w-full md:w-[45%] mr-0 md:mr-5">
                <h1 className="text-center md:text-left text-3xl font-bold pt-1 md:pt-10">Featured Trucks</h1>
                <p className="w-auto text-center md:text-left text-yellow-100 italic pt-2">@{featuredTruck.truckName}</p>
                <p className="text-center md:text-left text-white italic max-w-full md:max-w-xs pt-0 md:pt-3 px-15 md:px-0">{featuredTruck.description}</p>
                <Link href="/#about" className="inline-block w-auto text-[17px] md:text-lg text-stone-800 font-bold bg-yellow-100 rounded-lg hover:bg-amber-400 px-4 py-3 mt-3">Trucks</Link>
            </div>
            <div className="featured-truck items-start md:items-end place-content-start mt-4 md:mt-10">
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