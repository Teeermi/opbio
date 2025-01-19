"use client"

import "./main.css"
import {getSession, otpCheck} from "@/app/_actions/actions";
import {useEffect, useRef, useState} from "react";
import {notFound} from "next/navigation";
import Link from "next/link";




export default function Page() {
    const [session, setSession] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [otp, setOtp] = useState(new Array(6).fill(""));




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

    function handleChange(value: string, index: number) {
        const newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if(value && index < 5){
            const element = document.querySelector(`.input${index + 2}`) as HTMLElement | null;

            if (element) {

                console.log(otp)
                element.focus();
            } else {
                console.warn(`Element with class .input${index} not found.`);
            }
        }
    }



    return <div className="otpContainer" >
        <h1>Verify You Email Address</h1>
        <h2>To complete your registration, please verify your email address. Check your inbox for a verification link and follow the instructions to activate your account</h2>
        <form action={otpCheck} className="otpForm">

            <div className="inputsContainer">
                {otp.map((digit, index) => (
                    <input key={index} name={`value`} type="text" className={`input${index + 1}`} value={digit} onChange={e => handleChange(e.target.value, index)}/>
                ))}
            </div>
            <h3>Want to Change Your Email Address? <Link href="/" >Change here</Link></h3>

            <button className="submitForm">Verify Email</button>
        </form>
        <h4>Resend code</h4>

    </div>;
}