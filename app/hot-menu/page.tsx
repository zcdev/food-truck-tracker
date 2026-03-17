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

    // Variables
    const params = new URLSearchParams(searchParams.toString());
    const currentQuery = searchParams.get('query') ?? '';
    const show = searchParams.get('show') ?? '';

    // Store search query, keywords, and foods data to state
    const [query, setQuery] = useState(currentQuery);
    const [isShow, setIsShow] = useState(false);

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
    const visibleFoods = filterByTruckIds(filteredFoods, showed, food => food.truckId);

    // Conditionally display foods by checking searched items
    const displayFoods = currentQuery
        ? visibleFoods.length
            ? visibleFoods
            : recommendFoods(foods)
        : foods;

    // Function to reset the search results and clear URL parameters
    const resetSearch = () => {
        router.replace(`${pathname}`);
        params.delete('query');
        params.delete('truckIds');
        setQuery('');
        setIsShow(false);
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

        // Get the truck IDs from the recommended foods
        const hotTrucksIds = recommendFoods(foods).map(id => id.truckId);

        // If keywords are valid, update the URL with the keywords and truck IDs
        if (keywords.length) {
            params.set('query', keywords.join(' '));
            params.set('truckIds', truckIdsString);
        }

        // Set item not found status and pass hot truck IDs from recommended foods
        if (keywords.length && !truckIdsString) {
            params.set('status', 'not-found');
            params.set('truckIds', hotTrucksIds.toString());
            setIsShow(true);
        }

        router.replace(`/${pathname}?${params}`);
    };

    useEffect(() => {

        // Set query as currentQuery
        setQuery(currentQuery);

        // In the edge case when users click on the anchor links when no search item is found, delete params
        if (isShow === true && show === 'false') {
            params.delete('query');
            params.delete('truckIds');
        };

        // Reset when users hit home
        const url = new URL(window.location.href).toString();
        if (url.includes('#home')) resetSearch();

    }, [currentQuery, searchParams]);

    return (
        <section id="hot-menu" className='hot-menu-section relative mt-0 mb-8 max-w-5xl px-8 md:px-0' >
            <h2 id="hot-menu" className='pt-10 text-3xl font-bold text-center md:text-left'>Hot Menu</h2>
            <SearchInput
                query={query}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <HotMenuGrid foods={displayFoods} isShow={isShow} />
        </section >
    );
};