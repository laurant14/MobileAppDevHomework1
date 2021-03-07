export interface Menu{
    name: string;
    price: number;
    category: string;
    url: any;
    description: string;
    id: string;
}

export interface Order{
    id: any;
    quantity: number;
    date: any;
    price: number;
    uid: any;
}

export interface Cart{
    id: any;
    quantity: number;
    date: any;
    price: number;
}