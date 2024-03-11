import { Router } from "express";
import ClientController from "../controllers/clients";

const router = Router()

router.post("/new-client", ClientController.Create)
router.get("/clients", ClientController.ListAll)
router.get("/solve-tsp", ClientController.SolveDistance)

export default router;