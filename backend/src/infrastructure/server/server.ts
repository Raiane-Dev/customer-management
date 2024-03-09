import dotenv from "dotenv";
import app from "@/adapters/routes/router";
import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`[server] running`);
})