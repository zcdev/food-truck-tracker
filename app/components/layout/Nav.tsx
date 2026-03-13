import Link from "next/link";
export default function Nav() {
    return (
        <nav className="flex flex-col md:flex-row gap-0 md:gap-6 justify-center md:justify-start text-sm md:text-lg font-medium text-white mb-4 md:mb-0 mt-3">
            <Link href="/#hot-menu" className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>Hot Menu</Link>
            <span className="hidden md:inline"> | </span>
            <Link href="/#schedule" className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>Schedule</Link>
            <span className="hidden md:inline"> | </span>
            <Link href="/#about" className="hover:text-orange-600 transition-colors"><span className="inline md:hidden text-lg">» </span>About Us</Link>
        </nav>
    );
}