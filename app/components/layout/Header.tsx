import Link from "next/link";
import Nav from "./Nav";
export default function Header() {
    return (
        <header className="fixed z-5 flex flex-col pt-8 md:pt-16 bg-stone-800 border-b-1 border-yellow-100 w-full md:border-0 md:relative px-8 md:px-0">
            <div className="max-w-[280px] md:max-w-full">
                <h1 className="font-headline text-4xl md:text-6xl text-amber-400 text-left"><Link href="/">Food Truck Tracker</Link></h1>
                <h2 className="text-xl md:text-2xl text-yellow-100 tracking-normal text-left">Your next bite is on the <em className='tracking-widest text-flame'>move</em>.</h2>
                <Nav />
            </div>
        </header>
    );
}