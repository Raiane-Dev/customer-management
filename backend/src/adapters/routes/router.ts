import express, { Request, Response } from "express";
import ClientController from "../controllers/clients";
import path from "path";
import cors from "cors";
import logger from "morgan";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/new-client", ClientController.Create)
app.get("/clients", ClientController.ListAll)
app.get("/solve-tsp", ClientController.SolveDistance)

export default app;