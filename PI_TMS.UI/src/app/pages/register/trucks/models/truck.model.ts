export interface Truck {
    id: string;
    name: string;
    vehicleRegistrationPlate: {
        registrationPlate: string;
    };
    userId: string;
    truckType?: string;
    wheelType?: string;
    bodyType?: string;
}