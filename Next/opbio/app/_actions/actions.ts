"use server"


import prisma from "@/app/_lib/db";
import bcrypt from 'bcryptjs';



export async function createUser(formData: FormData) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.get("password") as string, salt);


        await prisma.user.create({
            data: {
                email: formData.get("email") as string,
                password: hashedPassword,
                username: formData.get("username") as string,
                invite: formData.get("invite") as string,
            }
        })
    } catch {

    }

    return "siema";

}