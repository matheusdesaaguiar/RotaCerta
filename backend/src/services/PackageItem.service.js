import { prisma } from "../lib/prisma.js";

class PackageItemServices {
    async createPackageItem(data) {
        return await prisma.package_item.create({
            data: {
                package_id: data.packageId,
                description: data.description,
                weight: data.weight
            }
        });
    }

    async getAllPackageItem() {
        return await prisma.package_item.findMany({});
    }

    async getPackageItemId(id) {
        return await prisma.package_item.findFirst({
            where: { id }
        });
    }

    async updatePackageItem(id, data) {
        return await prisma.package_item.update({
            where: { id },
            data: {
                package_id: data.packageId, 
                description: data.description,
                weight: data.weight
            } 
        });
    }


    async deletePackageItem(id) {
        return await prisma.package_item.delete({
            where: { id }
        });
    }
}

export default PackageItemServices;