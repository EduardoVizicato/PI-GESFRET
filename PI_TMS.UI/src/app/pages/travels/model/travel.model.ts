export interface Travel {
    id: string; 
    date: string;
    route: {
        origin : {
            zipCode: string;
            street: string;
            number: string;
            neighborhood: string;
            complement: string;
            city: string;
            state: string;
            contry: string;
            hemisphere: string;
            xCoord: string;
            yCoord: string;
        },
        destination : {
            zipCode: string;
            street: string;
            number: string;
            neighborhood: string;
            complement: string;
            city: string;
            state: string;
            contry: string;
            hemisphere: string;
            xCoord: string;
            yCoord: string;
        }
    },
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