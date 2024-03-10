import Pool from "@/infrastructure/config/database"
import { Client } from "@/domain/entities/client.entity"

export default class ClientRepository {

    constructor() { }

    public async Insert(data: Client) {
        const db = await Pool.connect();
        try {
            await db.query(`
                INSERT INTO clients 
                (name, email, phone, coordinate) 
                VALUES ($1, $2, $3, $4)`,
                [
                    data.username,
                    data.email,
                    data.phone,
                    data.coordinate,
                ]);
        } finally {
            db.release();
        }

    }


    public async SelectAll(): Promise<any[]> {
        const db = await Pool.connect();
        try {
            const result = await db.query('SELECT * FROM clients');
            return result.rows;
        } finally {
            db.release();
        }

    }
}