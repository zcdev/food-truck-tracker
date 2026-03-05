export type ViewPhase = "home" | "hot-menu" | "schedule" | "food-trucks";

export interface Truck {
    truckId: number;
    truckName: string;
    logo: string;
    description: string;
}

export interface Food {
    truckId: number;
    truckName: string;
    foodName: string; // Hottest item
    foodImg: string;
    description: string;
    price: number;
    rating: number; // 1-5
    tags?: string[];
}

export interface Schedule {
    truckId: number;
    truckName: string;
    location: string;
    minutesAway: number; // Time waiting for the next truck
}