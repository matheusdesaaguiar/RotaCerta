import { prisma } from "../lib/prisma.ts";
import { v4 as uuid4 } from "uuid";

class CustomerService {
    async createCustomer(data) {
        console.log(data);
        const newCostumer = await prisma.customer.create({
            data: {
                id: uuid4(),
                name: data.name,
                phone: data.phone,
                email:data.email,
                password: data.password
            }
        });
        return newCostumer;
    }

    async getAllCustomers() {
        return await prisma.customer.findMany({});
    }

    async getCustomerId(id) {
        return await prisma.customer.findUnique({
            where: { id }
        });
    }

    async updateCustomer(id, data) {
        return await prisma.customer.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            }
        });
    }

    async deleteCustomer(id) {
        return  await prisma.customer.delete({
            where: { id }
        });
    }
}

export default new CustomerService();