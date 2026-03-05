'use client';
import { foods } from '@/app/lib/data/hot-menu';
import { Food } from '@/app/lib/types';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';
import SearchInput from '../components/search/SearchInput';
import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function HotMenuPage() {
    // State for search query
    const [query, setQuery] = useState('');

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());
    const queryString = query.trim().toLowerCase() || '';

    // Memoized filtered foods based on the search query
    const { filteredFoods, foodTruckIds } = useMemo(() => {
        if (!queryString && queryString === '') {
            return { filteredFoods: foods, foodTruckIds: null };
        }

        const matches = foods.filter((food) => {
            const tags = food.tags?.join(' ').toLowerCase() ?? '';
            const haystack = `${food.truckId} ${food.truckName} ${food.foodName} ${food.description} ${tags}`.toLowerCase();
            return haystack.toLowerCase().includes(queryString);
        });

        const foodTruckIds: number[] = matches.map(match => match.truckId);

        return { filteredFoods: matches ?? null, foodTruckIds: foodTruckIds ?? undefined };
    }, [queryString]);

    // Debugging logs to check the foodTruckIds and filteredFoods
    // console.log('foodTruckIds:', foodTruckIds);
    console.log('filteredFoods:', filteredFoods);
    console.log('foodTruckIds', foodTruckIds);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.currentTarget.value);

        if (e.currentTarget.value.trim()) router.replace(pathname);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (queryString && queryString !== '') params.set('query', queryString);

            const idsString: string | undefined = foodTruckIds?.join(',') ?? '';

            router.replace(`${pathname}?${params}&truckIds=${idsString}`);
        }
    };

    return (
        <section className='hot-menu-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <SearchInput
                query={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <HotMenuGrid foods={filteredFoods} />
        </section>
    );
};