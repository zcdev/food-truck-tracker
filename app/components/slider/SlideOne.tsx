"use client";
import Link from "next/link";
import { Schedule } from "@/app/lib/types";
type Props = {
    nextTrucks: Schedule[];
};

export default function SlideOne({ nextTrucks }: Props) {
    const [truckOne, truckTwo] = nextTrucks;

    return (
        <div className="slide-one bg-stone-800 mt-16 pl-46 text-right">
            <h1 className="text-left text-3xl font-bold py-4">Next Trucks</h1>
            <p className="text-left text-yellow-100 italic">@{truckOne.truckName} → arriving <strong>{truckOne.location}</strong> in <strong className="text-orange-500">10</strong> mins</p>
            <p className="text-left text-yellow-100 italic pt-3">@{truckTwo.truckName} → arriving <strong>{truckTwo.location}</strong> in <strong className="text-orange-500">10</strong> mins</p>
            <Link href="#schedule" className="relative top-[-54px] inline-block w-auto text-sm md:text-lg text-white font-bold bg-orange-700 rounded-lg hover:bg-orange-500 px-4 py-3 mr-48">Schedule</Link>
        </div>
    );
}