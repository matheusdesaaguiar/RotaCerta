import { prisma } from "../lib/prisma.ts"

class TrackingUpdatesService {
    async createTrackingUpdates(data) {
        return await prisma.tracking_updates.create({
            data: {
                package_id: data.packageId,
                status: data.status,
                location_id: data.locationId,
                courier_id: data.courierId,
                center_id: data.centerId
            }
        });
    }

    async getAllTrackingUpdates() {
        return await prisma.tracking_updates.findMany({});
    }


    async getTrackingUpdatesId(id) {
        return await prisma.tracking_updates.findFirst({
            where: { id }
        });
    }

    async getTrackingUpdatesIdPackage( idPackage ) {
        return await prisma.tracking_updates.findMany({
            where: { 
               package_id: idPackage
            }
        });
    }

    async updateTrackingUpdates(id, data) {
        return await prisma.tracking_updates.update({
            where: { id },
            data: {
                package_id: data.packageId,
                status: data.status,
                location_id: data.locationId,
                courier_id: data.courierId,
                center_id: data.centerId
            }
        })
    }
}

export default new TrackingUpdatesService;