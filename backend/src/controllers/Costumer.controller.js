import CostumerService from "../services/Costumer.service.js";

class CostumerController {
    async createCostumer(req, res, next) {
        const { name, email, phone,password } = req.body;
        try {
            const newCostumer = await CostumerService.createCostumer({ name, email, phone, password });
        
            res.status(201).json(newCostumer);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllCostumer(req, res, next) {
        try {
            const costumers = await CostumerService.getAllCostumers();

            res.status(200).json(costumers);
        } catch (error) {
            next(error);
        }
    }

    async getCostumerId(req, res, next) {
        const id = req.params;

        try {
            const costumer =  await CostumerService.getCostumerId(id);

            res.status(200).json(costumer);
        } catch (error) {
            next(error)
        }
    }

    async updateCostumer(req, res, next) {
        const id = req.params;
        const { name, email, phone, password } = req.body;
        try {
            const updatedCostumer = await CostumerService.updateCostumer(id,{name, email, phone, password});

            res.status(200).json(updatedCostumer);
        } catch (error) {
            next(error);
        }
    }

    async deleteCostumer(req, res, next) {
        const id = req.params;
        
        try {
            await CostumerService.deleteCostumer(id);

            res.status(200).json({message: `Costumer deletado com sucesso`});
        } catch (error) {
            next(error);
        }
    }
}


export default new CostumerController();