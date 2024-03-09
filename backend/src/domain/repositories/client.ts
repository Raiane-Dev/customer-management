import { InstanceDB } from "@/infrastructure/config/database"
import { Client } from "@/domain/entities/client.entity"

export default class ClientRepository {

    constructor() {
        InstanceDB
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            });

    }

    public async Insert(data: Client) {
        const clients = await InstanceDB.getRepository(Client).create(data);

        return clients;
        
    }

    public async SelectAll() {
        const clients = await InstanceDB.getRepository(Client).find()

        return clients;
    }
}