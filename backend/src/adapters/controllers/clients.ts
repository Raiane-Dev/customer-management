import { Request, Response } from "express";
import ClientRepository from "domain/repositories/client";

class ClientController {
    private rep = new ClientRepository();

    public Create(req: Request, res: Response) {


    }
    
    public async ListAll(_: Request, res: Response) {
        let results = this.rep.SelectAll();    

        res.json(results)
    }
    
}

export default new ClientController();