'use client';
import { foods } from '@/app/lib/data/hot-menu';
import HotMenuGrid from '@/app/components/hot-menu/HotMenuGrid';
import SearchInput from '../components/search/SearchInput';
import { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseTruckIds, filterByTruckIds, recommendFoods } from '../lib/utils';

export default function HotMenuPage() {

    // Hooks for managing URL search parameters and navigation
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Variables to store searchParams and the current query
    const params = new URLSearchParams(searchParams.toString());
    const currentQuery = searchParams.get('query') ?? '';

    // Store search query, keywords, and foods data to state
    const [query, setQuery] = useState(currentQuery);
    const [isNotFound, setIsNotFound] = useState(false);

    // Store keywords from the query as a string
    const keywords = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

    // Memoized filtered foods based on the keywords
    const { filteredFoods, foodTruckIds } = useMemo(() => {

        // Display default menu items when there are no keywords
        if (!keywords.length) {
            return { filteredFoods: foods, foodTruckIds: null };
        }

        // Filter foods based on the search query matching truck ID, truck name, food name, description, or tags and store as a lowercase string
        const matches = foods.filter(food => {
            const tags = food.tags?.join(' ').toLowerCase() ?? '';
            const haystack = `${food.truckId} ${food.truckName} ${food.foodName} ${food.description} ${tags}`.toLowerCase();
            return keywords.some(keyword => haystack.includes(keyword));
        });

        // Extract truck IDs from the matched foods
        const matchedFoodTruckIds = matches.map(match => match.truckId);

        // Return the filtered foods and the corresponding truck IDs (or an empty array if no query)
        return { filteredFoods: matches ?? [], foodTruckIds: matchedFoodTruckIds ?? [] };
    }, [keywords]);

    // Util helpers to get truckIds from the params and display filtered hot menu items
    const showed = parseTruckIds(searchParams.get('truckIds'));
    const visibleTrucks = filterByTruckIds(filteredFoods, showed, food => food.truckId);

    // Conditionally display foods by checking searched items
    const displayFoods = currentQuery
        ? visibleTrucks.length
            ? visibleTrucks
            : recommendFoods(foods)
        : foods;

    // Function to reset the search results and clear URL parameters
    const resetSearch = () => {
        setQuery('');
        setIsNotFound(false);
        params.delete('query');
        params.delete('truckIds');
        router.replace(`${pathname}`);
    };

    // Handler for search input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const truckIdsString: string | undefined = foodTruckIds?.join(',') ?? '';

        // If keywords are valid, update the URL with the keywords and truck IDs
        if (keywords.length) {
            params.set('query', keywords.join(' '));
            params.set('truckIds', truckIdsString);
        }

        // If searched items not found, set query to "not-found"
        if (!truckIdsString) {
            setIsNotFound(true);
            params.delete('truckIds');
        }

        // Update URL
        router.replace(`${pathname}?${params}`);
    };

    useEffect(() => {
        setQuery(currentQuery);
    }, [currentQuery]);

    return (
        <section id="hot-menu" className='hot-menu-section relative mt-[210px] mb-8 max-w-5xl px-8 md:px-0'>
            <h2 id="hot-menu" className='pt-10 text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <SearchInput
                query={query}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <HotMenuGrid foods={displayFoods} isNotFound={isNotFound} />
        </section>
    );
};