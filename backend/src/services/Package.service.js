import { prisma } from "../lib/prisma.ts";

class PackageService {
    async createPackage(data) {
        return await prisma.renamedpackage.create({
            data: {
                tracking_code: data.trackingCode,      
                sender_id: data.senderId,
                receiver_id: data.receiverId,
                current_status: data.currentStatus,
                current_location: data.currentLocation,
                sender_address_id: data.senderAddressId,
                receiver_address_id: data.receiverAddressId,
                is_canceled: data.isCanceled
            }
        });
    }

    async getAllPackage() {
        return await prisma.renamedpackage.findMany();
    }

    async getPackageId(id) {
        return await prisma.renamedpackage.findFirst({
            where: { id }
        });
    }

    async updatePackage(id, data) {
        return await prisma.renamedpackage.update({
            where: { id },
            data: {
                tracking_code: data.trackingCode,
                sender_id: data.senderId,
                receiver_id: data.receiverId,
                current_status: data.currentStatus,
                current_location: data.currentLocation,
                sender_address_id: data.senderAddressId,
                receiver_address_id: data.receiverAddressId,
                is_canceled: data.isCanceled
            }
        });
    }


    async deletePackage(id) {
        await prisma.renamedpackage.delete({
            where: { id }
        });
    }

    
}

export default PackageService;