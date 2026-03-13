'use client';
import { foods } from '@/app/lib/data/hot-menu';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';
import SearchInput from '../components/search/SearchInput';
import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseTruckIds, filterByTruckIds } from '../lib/utils';

export default function HotMenuPage() {
    // Store search query, foods data to state
    const [query, setQuery] = useState('');
    const [searchedFoods, setSearchedFoods] = useState(foods);

    // Store keywords from the query as a string
    const keywords = query.toLowerCase().split(' ');

    // Hooks for managing URL search parameters and navigation
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams.toString());

    // Memoized filtered foods based on the keywords
    const { filteredFoods, foodTruckIds } = useMemo(() => {

        // Display default menu items when there are no keywords
        if (!keywords && keywords === '') {
            return { filteredFoods: foods, foodTruckIds: null };
        }

        // Filter foods based on the search query matching truck ID, truck name, food name, description, or tags and store as a lowercase string
        const matches = foods.filter(food => {
            const tags = food.tags?.join(' ').toLowerCase() ?? '';
            const haystack = `${food.truckId} ${food.truckName} ${food.foodName} ${food.description} ${tags}`.toLowerCase();
            return haystack.includes(keywords.join(' '));
        });

        // Extract truck IDs from the matched foods
        const foodTruckIds = matches.map(match => match.truckId);

        // Return the filtered foods and the corresponding truck IDs (or an empty array if no query)
        return { filteredFoods: matches ?? [], foodTruckIds: foodTruckIds ?? [] };
    }, [keywords]);

    // Util helpers to get truckIds from the params and display filtered hot menu items
    const showed = parseTruckIds(searchParams.get('truckIds'));
    const visibleTrucks = filterByTruckIds(filteredFoods, showed, food => food.truckId);

    // Function to reset the search results and clear URL parameters
    const resetSearch = () => {
        setQuery('');
        params.delete('query');
        params.delete('truckIds');
        router.replace(`${pathname}`);
        setSearchedFoods(foods);
    };

    // Handler for search input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // If input field is cleared, reset the search results and URL parameters
        if (!e.currentTarget.value.trim()) {
            resetSearch();
        } else {
            // Update search query state is handled onSubmit to prevent excessive updates while typing
            setQuery(e.currentTarget.value);
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get the food truck IDs as a comma-separated string for the URL query parameter
        const idsString: string | undefined = foodTruckIds?.join(',') ?? '';

        // If keywords are valid, update the URL with the keywords and truck IDs
        if (keywords && keywords.length > 0) {
            params.set('query', keywords.join(' '));
            params.set('truckIds', idsString);
            router.replace(`${pathname}?${params}`);

            // Update state for the searched foods by the truck IDs
            setSearchedFoods(visibleTrucks);
        } else {
            // If keywords aren't valid, clear the search result
            resetSearch();
        }
    };

    // Reset searched foods when there's no query
    useEffect(() => {
        const currentQuery = searchParams.get('query') ?? '';
        setQuery(currentQuery);

        if (!currentQuery) {
            setSearchedFoods(foods);
        }
    }, [searchParams]);

    return (
        <section id="hot-menu" className='hot-menu-section relative mt-[210px] mb-8 max-w-5xl px-8 md:px-0'>
            <h2 id="hot-menu" className='pt-10 text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <SearchInput
                query={query}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <HotMenuGrid foods={searchedFoods} />
        </section>
    );
};