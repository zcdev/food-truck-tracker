'use client';
import Link from "next/link";
import Nav from "./Nav";
import { useSearchParams } from "next/navigation";

export default function Header() {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    // Preserves params until reset when user hit the home link
    const url = `?${params}#home`;

    return (
        <header className="fixed z-5 max-w-full md:max-w-4xl md:flex bg-stone-800 border-b-1 border-yellow-100 w-full pt-4 px-8 md:px-0 pb-6">
            <div className="max-w-full">
                <Nav />
                <div className="md:pt-4">
                    <h1 className="font-headline text-4xl md:text-6xl text-amber-400 text-center md:text-left"><Link href={`/${url}`}>Food Truck Tracker</Link></h1>
                    <h2 className="text-xl md:text-2xl text-yellow-100 tracking-normal text-center md:text-left">Your next bite is on the <em className="tracking-widest font-bold text-orange-500">MOVE</em>.</h2>
                </div>
            </div>
        </header>
    );
}