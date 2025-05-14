export interface Truck {
    name: string;
    type: string;
    capacity: number;
    licensePlate: string;
    driverId: string;
    status: 'available' | 'in-use' | 'maintenance';
    }