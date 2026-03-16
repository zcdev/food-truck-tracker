export interface Truck {
    truckId: number;
    truckName: string;
    logo: string;
    description: string;
}

export interface Food {
    truckId: number;
    truckName: string;
    foodName: string;
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
    minutesAway: number;
}