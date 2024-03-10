import { Request, Response } from "express";
import ClientRepository from "domain/repositories/client";

class ClientController {

    public Create(req: Request, res: Response) {

        const { name, email, phone, coordinate } = req.body;

        let result = new ClientRepository().Insert({
            username: name,
            email: email,
            phone: phone,
            coordinate: coordinate,
        });

        res.json(result)
    }
    
    public async ListAll(_: Request, res: Response) {
        const rep = new ClientRepository();
        let results = await rep.SelectAll();

        res.json(results)
    }
    
}

export default new ClientController();