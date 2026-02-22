import express from "express";
import costumer from "./costumer.routes.js";

const routes = (app) => {
    app.use(
        express.json(),
        costumer,
    );
};

export default routes;