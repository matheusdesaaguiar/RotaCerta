import { Router } from "express";
import CustomerController from "../controllers/Customer.controller.js";

const router = new Router();

router.get("/customer", CustomerController.getAllCustomer);
router.post("/customer", CustomerController.createCustomer);
router.get("/customer/:id", CustomerController.getCustomerId);
router.patch("/customer/:id", CustomerController.updateCustomer);
router.delete("/customer/:id", CustomerController.deleteCustomer);

export default router;