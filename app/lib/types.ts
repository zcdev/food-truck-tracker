export type ViewPhase = "home" | "hot-menu" | "schedule" | "food-trucks";

export interface AppTracker {
    phase: ViewPhase;
    truck?: Truck;
    food?: Food;
    schedule?: Schedule;
}

export interface Truck {
    id: number;
    name: string;
    logo: string;
}

export interface Food {
    id: number;
    truckId: Truck;
    name: string; // Hottest item
    description: string;
    price: number;
    rating: number; // 1-5
}

export interface Schedule {
    id: number;
    truckId: Truck;
    location: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
    minutesAway: number; // Time waiting for the next truck
    nextTruck: string; // ISO string: Next arrival time 
    frequency: number; // Interval: period of time between trucks
}