"use client"

import "./main.css"
import {getSession} from "@/app/_actions/actions";
import {useEffect, useState} from "react";
import {notFound} from "next/navigation";
import Link from "next/link";

export default function Page() {
    const [session, setSession] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function essa() {
            const response: string | undefined = await getSession();
            setSession(response);
            setLoading(false);
        }

        essa();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!session) return notFound();

    return <div className="otpContainer" >
        <h1>Verify You Email Address</h1>
        <h2>To complete your registration, please verify your email address. Check your inbox for a verification link and follow the instructions to activate your account</h2>
        <form action="" className="otpForm">
            <input type="number" max={9} required={true}/>
            <input type="number" max={9} required={true}/>
            <input type="number" max={9} required={true}/>
            <input type="number" max={9} required={true}/>
            <input type="number" max={9} required={true}/>

            <h3>Want to Change Your Email Address? <Link href="/" >Change here</Link></h3>

            <button className="submitForm">Verify Email</button>
        </form>
        <h4>Resend code</h4>

    </div>;
}