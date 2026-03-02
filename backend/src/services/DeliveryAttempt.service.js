import { defaultMaxListeners } from "node:events";
import { prisma } from "../lib/prisma.js";

class DeliveryAttempt {
    async createDeliveryAttempt(data) {
        return await prisma.delivery_attempt.create({
            data: {
                package_id: data.packageId,    
                courier_id: data.courierId,
                attempt_number: data.attemptNumber,
                status: data.status,
                notes: data.notes,
                attempted_at: data.attemptedAt
            }
        })
    }
    
    async getAllDeliveryAttempt() {
        return await prisma.delivery_attempt.findMany();
    }

    async getDeliveryAttemptId(id) {
        return await prisma.delivery_attempt.findFirst({
            where: { id },
        });
    }


    async updateDeliveryAttempt(id, data) {
        return await prisma.delivery_attempt.update({
            where: { id },
            data: {
                package_id: data.packageId,
                courier_id: data.courierId,
                attempt_number: data.attemptNumber,
                status: data.status,
                notes: data.notes,
                attempted_at: data.attemptedAt
            }
        });
    }

    async deleteDeliveryAttempt(id) {
        return await prisma.delivery_attempt.delete({
            where: { id }
        });
    }
}

export default new DeliveryAttempt;