"use client";
import Link from "next/link";
import { Schedule } from "@/app/lib/types";
type Props = {
    nextTrucks: Schedule[];
};

export default function SlideOne({ nextTrucks }: Props) {
    const [truckOne, truckTwo] = nextTrucks;

    return (
        <div className="slide slide-one bg-stone-800 pl-0 md:pl-47 text-center md:text-right">
            <h1 className="text-center md:text-left text-3xl font-bold pt-10">Next Trucks</h1>
            <p className="text-center md:text-left text-yellow-100 italic pt-3">@{truckOne?.truckName} → <br className="block md:hidden" /><strong>{truckOne?.location}</strong> in <strong className="text-orange-500">10</strong> mins</p>
            <p className="text-center md:text-left text-yellow-100 italic pt-3">@{truckTwo?.truckName} → <br className="block md:hidden" /><strong>{truckTwo?.location}</strong> in <strong className="text-orange-500">10</strong> mins</p>
            <Link href="#schedule" className="md:relative md:top-[-54px] inline-block w-auto text-[17px] md:text-lg text-stone-800 font-bold bg-yellow-100 rounded-lg hover:bg-amber-400 px-4 py-3 mt-5 md:mt-0 mr-0 md:mr-48">Schedule</Link>
        </div>
    );
}