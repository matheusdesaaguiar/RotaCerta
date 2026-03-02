import { prisma } from "../lib/prisma.ts";

class CourierService {
    async createCourier(data) {
        return await prisma.courier.create({
            data: {
                name: data.name,    
                vehicle_type: data.vehicle_type
            }
        });
    }

    async getAllCourier() {
        return await prisma.courier.findMany({});
    }

    async getCourierId(id) {
        return await prisma.courier.findFirst({
            where: { id }
        });
    }

    async updateCourier(id, data) {
        return await prisma.courier.update({
            name: data.name,        
            vehicle_type: data.vehicle_type
        });
    }

    async deleteCourier(id) {
        return await prisma.courier.delete({
            where: { id }
        });
    }
}

export default CourierService;