import express from "express";
import customer from "./customer.routes.js";

const routes = (app) => {
    app.use(
        express.json(),
        customer,
    );
};

export default routes;