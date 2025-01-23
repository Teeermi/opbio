import prisma from "@/app/_lib/db";
import {cookies} from "next/headers";
import {createSession, decrypt, deleteSession} from "@/app/_lib/sessions";
import {getSession} from "@/app/_actions/actions";


export async function POST(request: Request) {
    const res = await request.json();

    const data = res.otp;

    const session = (await cookies()).get('session')?.value

    const privateData = await decrypt(session) as { userId: string } | undefined;

    if (!privateData) {
        return new Response('Session decryption failed', { status: 400 });
    }




    const code = await prisma.otp.findUnique({
        where: {
            email: privateData.userId
        },
    });



    if (code?.code == data.join("")) {

        await prisma.user.update({
            where: {
                email: privateData.userId
            },
            data: {
                otpVerified: true,
            }
        })


       await prisma.otp.delete({
            where: {
                email: privateData.userId
            }
        })

        await deleteSession();

        await createSession(privateData.userId, true);



        return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: 'Error' }), { status: 404 });
    }



}