"use client"

import "./main.css";
import {useRef, useState} from "react";
import {login} from "@/app/_actions/actions";
import {redirect} from "next/navigation";



export default function Page() {
    const verifyOtpRef = useRef<HTMLButtonElement>(null);
    const bg1 = useRef<HTMLDivElement>(null);
    const emailError = useRef<HTMLDivElement>(null);


    function supportRefs(a: HTMLDivElement, b: HTMLDivElement, c: string) {
        a.textContent = c;
        b.classList.add("errorBorder");
    }

    async function handleLogin(formData: FormData) {

        if (!emailError.current || !bg1.current) return;

        if (!(formData.get("password") as string) || !(formData.get("email") as string)) {
            supportRefs(emailError.current, bg1.current, "Email or password is wrong");

            return;


        } else if ((formData.get("email") as string).length >= 50) {
            supportRefs(emailError.current, bg1.current, "Email or password is wrong");
        } else  {
            emailError.current.textContent = "";
            bg1.current.classList.remove("errorBorder");
            const response = await login(formData);

            if (response.code === "NOV") {

                if (verifyOtpRef.current) {
                    verifyOtpRef.current.classList.add("successOtp");
                    verifyOtpRef.current.textContent = "Success";

                    setTimeout(() => {
                        redirect("/otp");
                    }, 5000);
                }

                return;
            } else if (response.status === "error") {
                supportRefs(emailError.current, bg1.current, "Email or password is wrong");
            }else {
                if (verifyOtpRef.current) {
                    verifyOtpRef.current.classList.add("successOtp");
                    verifyOtpRef.current.textContent = "Success";

                    setTimeout(() => {
                        redirect("/dashboard");
                    }, 5000);
                }
            }
        }


    }



    return (
        <form onSubmit={async (e) => { e.preventDefault(); handleLogin(new FormData(e.currentTarget)); }} className="wrapperMain">
            <div className="email">
                <h1>Email or username</h1>
                <div className="bg1" ref={bg1}>
                    <i className="fa-solid fa-envelope"></i>
                    <input name="email" type="text"  />
                </div>
                <h3 className="usernameError" ref={emailError}></h3>
            </div>

            <div className="password">
                <h1>Password</h1>
                <div className="bg2"  >
                    <i className="fa-solid fa-lock"></i>
                    <input name="password" type="password" />
                </div>
            </div>

            <div className="tos">
                <input type="checkbox" id="tosik" required/>
                <label htmlFor="tosik">Remember me</label>
            </div>

            <button className="submitBtn" ref={verifyOtpRef} >Login</button>
        </form>
    )
}