import { prisma } from "../lib/prisma.ts";

class CostumerService {
    async createCostumer(data) {
        const newCostumer = await prisma.costumer.create({
            data: {
                name: data.name,
                phone: data.phone,
                email:data.email,
                password: data.password
            }
        })
        return newCostumer;
    }

    async getAllCostumers() {
        return await prisma.customer.findMany({});
    }

    async getCostumerId(id) {
        return await prisma.costumer.findUnique({
            where: { id },
        });
    }

    async updateCostumer(id, data) {
        return await prisma.costumer.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            }
        })
    }

    async deleteCostumer(id) {
        return  await prisma.costumer.delete({
            where: { id }
        });
    }
}

export default new CostumerService();