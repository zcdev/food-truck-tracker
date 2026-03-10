import Link from "next/link";
export default function Nav() {
    return (
        <nav className="flex flex-col md:flex-row gap-1 md:gap-6 justify-center md:justify-start text-sm md:text-lg font-medium text-white mb-6 md:mb-0 mt-3 md:mt-6">
            <Link href="/schedule" className="hover:text-red-500 transition-colors"><span className="inline md:hidden text-lg">» </span>Hot Menu</Link>
            <span className="hidden md:inline"> | </span>
            <Link href="/hot-menu" className="hover:text-red-500 transition-colors"><span className="inline md:hidden text-lg">» </span>Schedule</Link>
            <span className="hidden md:inline"> | </span>
            <Link href="/about" className="hover:text-red-500 transition-colors"><span className="inline md:hidden text-lg">» </span>About Us</Link>
        </nav>
    );
}