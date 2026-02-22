import { Router } from "express";
import CostumerController from "../controllers/Costumer.controller.js";

const router = new Router();

router.get("/costumer", CostumerController.getAllCostumer);
router.post("router", CostumerController.createCostumer);
router.get("/costumer/:id", CostumerController.getCostumerId);
router.patch("/costumer/:id", CostumerController.updateCostumer);
router.delete("/costumer/:id", CostumerController.deleteCostumer);

export default router;