export default function Header() {
    return (
        <header className="pt-8 md:pt-16">
            <h1 className="font-headline text-4xl md:text-6xl text-amber-400 text-center md:text-left">Food Truck Tracker</h1>
            <h2 className="text-xl md:text-2xl text-yellow-100 tracking-normal text-center md:text-left">Your next bite is on the <em className='tracking-widest text-flame'>move</em>.</h2>
        </header>
    );
}