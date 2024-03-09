import express, { Request, Response } from "express";
import ClientController from "../controllers/clients";

const app = express();

app.post("/new-client", ClientController.Create)
app.get("/clients", ClientController.ListAll)

app.get("/", (req: Request, res: Response) => {
    res.send("hello")
});

export default app;