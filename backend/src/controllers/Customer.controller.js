import CustomerService from "../services/Customer.service.js";

class CustomerController {
    async createCustomer(req, res, next) {
        const { name, email, phone, password } = req.body;
        try {
            const newCustomer = await CustomerService.createCustomer({ name, email, phone, password });
        
            res.status(201).json(newCustomer);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllCustomer(req, res, next) {
        try {
            const customers = await CustomerService.getAllCustomers();

            res.status(200).json(customers);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getCustomerId(req, res, next) {
        const { id }= req.params;

        try {
            const customer =  await CustomerService.getCustomerId(id);

            res.status(200).json(customer);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async updateCustomer(req, res, next) {
        const { id } = req.params;
        const { name, email, phone, password } = req.body;
        try {
            const updatedCustomer = await CustomerService.updateCustomer(id,{name, email, phone, password});

            res.status(200).json(updatedCustomer);
        } catch (error) {
            next(error);
        }
    }

    async deleteCustomer(req, res, next) {
        const { id } = req.params;
        
        try {
            await CustomerService.deleteCustomer(id);

            res.status(200).json({message: `cliente deletado com sucesso`});
        } catch (error) {
            next(error);
        }
    }
}


export default new CustomerController();