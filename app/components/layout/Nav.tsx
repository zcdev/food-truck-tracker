"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
    isHome: Boolean;
};

export default function Nav() {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    // Set params before anchor ID for the edge case when the user clicks on the anchor links
    params.set('show', 'false');

    return (
        <nav className="flex flex-col md:flex-row gap-0 md:gap-6 justify-center md:justify-start text-sm md:text-lg font-medium text-white mb-4 md:mb-0 mt-3">
            <Link href={`/?${params}#hot-menu`} className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>Hot Menu</Link>
            <span className="hidden md:inline"> | </span>
            <Link href={`/?${params}#schedule`} className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>Schedule</Link>
            <span className="hidden md:inline"> | </span>
            <Link href={`/?${params}#about`} className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>About Us</Link>
        </nav>
    );
}