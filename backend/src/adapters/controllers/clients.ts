import { Request, Response } from "express";
import ClientRepository from "@/domain/repositories/client";
import { solve, Point } from "@/utils/solve_tsp"

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

    public async SolveDistance(_: Request, res: Response) {
        const rep = new ClientRepository();
        let results = await rep.SelectAll();

        const points: Point[] = results.map(v => new Point(v.coordinate.x, v.coordinate.y));
        const optimal_path = solve(points);

        const reordered_coordinates = optimal_path.map(i => results[i]);
        
        res.json(reordered_coordinates.map(v => v.coordinate));
    }
    
}

export default new ClientController();