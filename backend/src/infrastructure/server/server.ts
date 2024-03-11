import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import router from "@/adapters/routes/router";

dotenv.config();

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1", router)

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`[server] running in port ${port}`);
})