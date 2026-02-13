import express from "express";
import routes from "./routes.js";

const PORT = process.env.PORT;

const app = express();

routes(app);

export default app;