"use server"


import prisma from "@/app/_lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';



export async function createUser(formData: FormData) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.get("password") as string, salt);
        const invite = await prisma.invites.findUnique({
            where: {
                code: formData.get("invite") as string
            },
        });
        console.log(invite);

        if (!invite) {
            return {status: "error", code: "INF"};
        }

        if (invite.user) {
            return {status: "error", code: "RI"};
        }



        await prisma.user.create({
            data: {
                email: formData.get("email") as string,
                password: hashedPassword,
                username: formData.get("username") as string,
                invite: formData.get("invite") as string,
            }
        })

        await prisma.invites.update({
            where: {
                code: invite.code
            },
            data: {
                user: formData.get("username") as string,
        }
        })

        return {status: "success", code:"DN"}

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {status: "error", code: `${e.meta?.targe}`};
        } else {
            throw e;
        }

}}