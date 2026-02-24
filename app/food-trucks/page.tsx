'use client';
import { useState, useEffect } from 'react';
import { Truck } from '@/app/lib/types';
import { trucks } from '@/app/lib/data/trucks';
import FoodTruckGrid from "@/app/components/food-trucks/FoodTruckGrid";
import FoodTruckModal from '../components/food-trucks/FoodTruckModal';

export default function FoodTruckPage() {
    // State to track the currently selected truck for the modal
    const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

    // State to track whether the modal is open
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle truck card click to open the modal
    const handleTruckClick = (truck: Truck) => {
        setSelectedTruck(truck);
        setIsModalOpen(true);
    };

    //  Handle modal close
    const closeModal = () => {
        setSelectedTruck(null);
        setIsModalOpen(false);
    };

    // Handle Escape key to close the modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        //  Add event listener for keydown when the component mounts
        document.addEventListener("keydown", handleKeyDown);

        //  Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [isModalOpen, closeModal]);

    return (
        <section className='food-truck-section pt-8 md:pt-16 m-auto'>
            <h2 className='text-3xl font-bold text-center md:text-left'>Food Trucks</h2>
            <FoodTruckGrid
                trucks={trucks}
                onClick={handleTruckClick}
            />
            {isModalOpen
                && selectedTruck
                && <FoodTruckModal
                    truck={selectedTruck}
                    onClose={closeModal}
                />
            }
        </section>
    );
}