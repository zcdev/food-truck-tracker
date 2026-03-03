'use client';
import { foods } from '@/app/lib/data/hot-menu';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';
import SearchInput from '../components/search/SearchInput';
import { useState, useMemo } from 'react';

export default function HotMenuPage() {
    // State for search query
    const [query, setQuery] = useState("");

    // Memoized filtered foods based on the search query
    const filteredFoods = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return foods;

        // Filter foods based on truck name, food name, description, tags and store them in a refined haystack string for easier searching
        return foods.filter(food => {
            const tags = food.tags?.join(' ').toLowerCase() ?? '';
            const haystack = `${food.truckName} ${food.foodName} ${food.description} ${tags}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [query]);

    return (
        <section className='hot-menu-section max-w-5xl pt-8 md:pt-16'>
            <SearchInput
                query={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <h2 className='text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <HotMenuGrid foods={filteredFoods} />
        </section>
    );
}