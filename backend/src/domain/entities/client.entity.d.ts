interface Client {
    id?: number;
    username: string;
    email: string;
    phone: number;
    coordinate: any;
}

const ClientPattern: Client = {
    username: "",
    email: "",
    phone: "",
    coordinate: "",
}

export type {
    Client,
    ClientPattern
}