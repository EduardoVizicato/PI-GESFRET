export interface Travel {
    id: string;
    startDate: string;
    endDate: string;
    load: {
        product: string;
        weight: string;
        loadType: string;
    }
    price: string;
    isActive: boolean;
}