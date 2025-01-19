"use server"


import prisma from "@/app/_lib/db";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import {redirect} from "next/navigation";
import {Resend} from "resend";
import {createSession, decrypt} from "@/app/_lib/sessions";
import {cookies} from "next/headers";


const resend = new Resend(process.env.RESEND_API_KEY);

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
                otpVerified: false
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

        await createSession(formData.get("email") as string)


        const otpCode = Math.floor(100000 + Math.random() * 900000);

        await prisma.otp.create({
            data: {
                email: formData.get("email") as string,
                code: otpCode.toString(),
                date: new Date(Date.now()).toISOString()
            }
        })


        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'olafkrawczyk13@icloud.com',
            subject: 'Hello World',
            html: `${otpCode}`
        });




        redirect("/otp")

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {status: "error", code: `${e.meta?.targe}`};
        } else {
            throw e;
        }
}}



export async function getSession() {
    return (await cookies()).get('session')?.value;
}

export async function otpCheck(formData: FormData) {
    console.log(formData.get("value") as unknown);
}