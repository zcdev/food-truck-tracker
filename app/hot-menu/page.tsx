'use client';
import { foods } from '@/app/lib/data/hot-menu';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';
import SearchInput from '../components/search/SearchInput';
import { useState, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function HotMenuPage() {
    // State for search query
    const [query, setQuery] = useState('');
    const [searchedFood, setSearchedFoods] = useState(foods);

    // Hooks for managing URL search parameters and navigation
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());
    const queryString = query.trim().toLowerCase() || '';
    const keywords = query.toLowerCase().split(" ");


    // Memoized filtered foods based on the search query
    const { filteredFoods, foodTruckIds } = useMemo(() => {
        if (!queryString && queryString === '') {
            return { filteredFoods: foods, foodTruckIds: null };
        }

        // Filter foods based on the search query matching truck ID, truck name, food name, description, or tags and store as a lowercase string
        const matches = foods.filter(food => {
            const tags = food.tags?.join(' ').toLowerCase() ?? '';
            const haystack = `${food.truckId} ${food.truckName} ${food.foodName} ${food.description} ${tags}`.toLowerCase();
            return keywords.every(keyword => haystack.includes(keyword));
        });

        // Extract truck IDs from the matched foods
        const foodTruckIds: number[] = matches.map(match => match.truckId);

        // Return the filtered foods and the corresponding truck IDs (or null if no query)
        return { filteredFoods: matches ?? null, foodTruckIds: foodTruckIds ?? undefined };
    }, [queryString]);

    // Handler for search input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // Update search query state is handled onSubmit to prevent excessive updates while typing
        setQuery(e.currentTarget.value);

        // If input field is cleared, reset the search results and URL parameters
        if (e.currentTarget.value === '' && query !== '') {
            resetSearch();
        }
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get the food truck IDs as a comma-separated string for the URL query parameter
        const idsString: string | undefined = foodTruckIds?.join(',') ?? '';

        // If there is a valid query string, update the URL with the query and truck IDs
        if (queryString && queryString !== '') {
            params.set('query', queryString);
            router.replace(`${pathname}?${params}&truckIds=${idsString}`);
            setSearchedFoods(filteredFoods);
        } else {
            resetSearch();
        }
    };

    // Function to reset the search results and clear URL parameters
    const resetSearch = () => {
        setQuery('');
        params.delete('query');
        params.delete('truckIds');
        router.replace(`${pathname}`);
        setSearchedFoods(foods);
    };

    return (
        <section className='hot-menu-section max-w-5xl pt-8 md:pt-16'>
            <h2 className='text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <SearchInput
                query={query}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <HotMenuGrid foods={searchedFood} />
        </section>
    );
};