export interface Travel {
    id: string;
    name: string;
}
export interface Truck {
    id: string;
    name: string;
    vehicleRegistrationPlate: {
        registrationPlate: string;
    };
}