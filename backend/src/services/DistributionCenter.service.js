import { prisma } from "../lib/prisma.ts";

class DistributionCenter {
    async createDistributionCenter(data) {
        return await prisma.distribution_center.create({
            data: {
                name: data.name,
                city: data.city,
                state: data.state
            }
        });
    }

    async getAllDistributionCenter() {
        return await prisma.distribution_center.findMany({});
    } 

    async getDistributionCenterId(id) {
        return await prisma.distribution_center.findFirst({
            where: { id }
        });
    }

    async updateDistributionCenter(id, data) {
        return await prisma.distribution_center.update({
            where: { id },
            data: {
                name: data.name, 
                city: data.city,
                state: data.state
            }
        });
    }

    async deleteDistributionCenter(id) {
        return await prisma.distribution_center.delete({
            where: { id }
        });
    }
}

export default new DistributionCenter;