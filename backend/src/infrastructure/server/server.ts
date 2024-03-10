import dotenv from "dotenv";
import app from "@/adapters/routes/router";

dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`[server] running in port ${port}`);
})