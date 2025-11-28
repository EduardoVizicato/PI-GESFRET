export interface Travel {
    id: string;
    startDate: string;
    endDate: string;
    origin: {
        zipCode: string;
        street: string;
        number: string;
        neighborhood: string;
        complement: string;
        city: string;
        state: string;
        country: string;
        hemisphere: string;
        xCoord: string;
        yCoord: string;
    },
    destination: {
        zipCode: string;
        street: string;
        number: string;
        neighborhood: string;
        complement: string;
        city: string;
        state: string;
        country: string;
        hemisphere: string;
        xCoord: string;
        yCoord: string;
    }
    load: {
        product: string;
        weight: string;
        loadType: string;
    }
    createdAt: string;
    updatedAt: string;
    price: string;
    isActive: boolean;
    truckId: string;
    filePath: string;
    fileName: null | string;
}
export interface Truck {
    id: string;
    name: string;
    vehicleRegistrationPlate: {
        registrationPlate: string;
    };
    truckType: string;
    wheelType?: string;
    bodyType?: string;
}