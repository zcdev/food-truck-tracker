'use client';
import { useState } from 'react';
import { Truck } from '@/app/lib/types';
import { trucks } from '@/app/lib/data/trucks';
import FoodTruckGrid from "@/app/components/food-trucks/FoodTruckGrid";
import FoodTruckModal from '../components/food-trucks/FoodTruckModal';

export default function FoodTruckPage() {
    const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTruckClick = (truck: Truck) => {
        setSelectedTruck(truck);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTruck(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <FoodTruckGrid trucks={trucks} onClick={handleTruckClick} />
            {isModalOpen && selectedTruck && <FoodTruckModal truck={selectedTruck} onClose={closeModal} />}
        </>
    );
}