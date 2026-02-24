'use client';
import { foods } from '@/app/lib/data/hot-menu';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';

export default function HotMenuPage() {
    return (
        <section className='hot-menu-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left'>Hot Menu Items</h2>
            <HotMenuGrid foods={foods} />
        </section>
    );

}