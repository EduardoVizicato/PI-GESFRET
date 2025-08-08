export interface Travel {
    id: string; 
    date: string;
    route: string;
    vehiclePlate: string;
    product: string;
    weight: string;
    freightValue: string;
}
export interface Truck {
    id: string;
    name: string;
    vehicleRegistrationPlate: {
        registrationPlate: string;
    };
}