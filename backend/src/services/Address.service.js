import { prisma } from "../lib/prisma.ts";

class AddressSevice {
    async createAddress(data) {
        const newAddress = await prisma.address.create({
            street: data.street,  
            city: data.city,    
            state: data.state,
            zip_code: data.zip_code
        });
        return newAddress;
    }

    async getAllAddress(){
        return await prisma.address.findMany();
    }

    async getAddressId(id) {
        return await prisma.address.findFirst({
            where: { id }
        });
    }


    async updateAddress(id, data) {
        return await prisma.address.update({
            where: { id },
            data: {
                street: data.street,  
                city: data.city,    
                state: data.state,
                zip_code: data.zip_code
            }
        });
    }

    async deleteAddress(id) {
        return await prisma.address.delete({
            where: { id }
        });
    }
}   

export default AddressSevice;