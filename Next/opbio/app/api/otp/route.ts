import prisma from "@/app/_lib/db";
import {cookies} from "next/headers";
import {decrypt} from "@/app/_lib/sessions";
import {redirect} from "next/navigation";

export async function GET(request: Request) {
    return new Response('Hello, Next.js 15!');
}



export async function POST(request: Request) {
    const res = await request.json();

    const data = res.otp;

    const session = (await cookies()).get('session')?.value
    const privateData : unknown = await decrypt(session);




    const code = await prisma.otp.findUnique({
        where: {
            email: privateData.userId
        },
    });




    if (code.code == data.join("")) {
       console.log("DZIALA")
    } else {
        console.log("ZLY KOD")
    }





    return Response.json({ res });
}