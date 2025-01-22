"use client"
import "./main.css"
import {createUser} from "@/app/_actions/actions";
import {useRef} from "react";
import Link from "next/link";
import {redirect} from "next/navigation";




export default function Page() {


    const usernameError = useRef<HTMLDivElement>(null);
    const passwordError = useRef<HTMLDivElement>(null);
    const emailError = useRef<HTMLDivElement>(null);
    const inviteError = useRef<HTMLDivElement>(null);
    const verifyOtpRef = useRef<HTMLFormElement>(null);

    const bg1 = useRef<HTMLDivElement>(null);
    const bg2 = useRef<HTMLDivElement>(null);
    const bg3 = useRef<HTMLDivElement>(null);
    const bg4 = useRef<HTMLDivElement>(null);

    const bluredBg = useRef<HTMLDivElement>(null);


    function supportRefs(a: HTMLDivElement, b: HTMLDivElement, c: string) {
        a.textContent = c;
        b.classList.add("errorBorder");
    }

    async function handleCreateUser(formData: FormData) {
        if (!usernameError.current || !bg1.current || !passwordError.current || !bg2.current || !emailError.current || !bg3.current || !inviteError.current || !bg4.current) return;

        if (formData.get("username") as string == "") {
            supportRefs(usernameError.current, bg1.current, "Username is required");

        } else if ((formData.get("username") as string).length > 13) {
            supportRefs(usernameError.current, bg1.current, "Username is too long");
        } else {
            usernameError.current.textContent = "";
            bg1.current.classList.remove("errorBorder");
        }

        if (formData.get("password") as string == "") {
            supportRefs(passwordError.current, bg2.current, "Password is required");

        } else  {
            passwordError.current.textContent = "";
            bg2.current.classList.remove("errorBorder");
        }
        if (formData.get("email") as string == "") {
            supportRefs(emailError.current, bg3.current, "Email is required");
        } else {
            emailError.current.textContent = "";
            bg3.current.classList.remove("errorBorder");
        }
        if (formData.get("invite") as string == "") {
            supportRefs(inviteError.current, bg4.current, "Invite is required");

        } else {
            inviteError.current.textContent = "";
            bg4.current.classList.remove("errorBorder");
        }



        if ((formData.get("username") as string).length <= 13 && formData.get("password") as string && formData.get("email") as string && formData.get("invite") as string) {

            const response = await createUser(formData);
            console.log(response);

            if (response.code === "INF" || response.code === "RI") {
                supportRefs(inviteError.current, bg4.current, "Please enter a valid invite code");
            }

            if (response.code === "EE") {
                supportRefs(emailError.current, bg3.current, "Email is already in use");
            }

            if (response.code === "EUN") {
                supportRefs(usernameError.current, bg1.current, "Username is already in use");
            }

            if (response.code === "EEUNI") {
                supportRefs(emailError.current, bg3.current, "Email is already in use");
                supportRefs(usernameError.current, bg1.current, "Username is already in use");
                supportRefs(inviteError.current, bg4.current, "Please enter a valid invite code");
            }

            if (response.code === "EEUN") {
                supportRefs(emailError.current, bg3.current, "Email is already in use");
                supportRefs(usernameError.current, bg1.current, "Username is already in use");
            }

            if (response.code === "EEUNINF") {
                supportRefs(emailError.current, bg3.current, "Email is already in use");
                supportRefs(usernameError.current, bg1.current, "Username is already in use");
                supportRefs(inviteError.current, bg4.current, "Please enter a valid invite code");
            }

            if (response.code === "EEINF") {
                supportRefs(emailError.current, bg3.current, "Email is already in use");
                supportRefs(inviteError.current, bg4.current, "Please enter a valid invite code");
            }

            if (response.code === "EUNINF") {
                supportRefs(usernameError.current, bg1.current, "Username is already in use");
                supportRefs(inviteError.current, bg4.current, "Please enter a valid invite code");
            }


            if (verifyOtpRef.current) {
                verifyOtpRef.current.classList.add("successOtp");
                verifyOtpRef.current.textContent = "Account created! Moving to OTP page...";

                setTimeout(() => {
                    redirect("/otp");
                }, 5000);
            }

        }

    }

    function handleOpenModal() {
        if (!bluredBg.current) return;

        bluredBg.current.style.display = "flex";
    }

    function handleCloseModal() {
        if (!bluredBg.current) return;

        bluredBg.current.style.display = "none";
    }



    return (

        <>
            <div className="bluredBg" ref={bluredBg} >
                    <div className="modalInviteInfo">
                        <i className="fa-solid fa-globe"></i>
                        <h1>What is invite?</h1>
                        <h2>An invite is used to register for access. You can receive it from someone who already has one or by submting application</h2>

                        <div className="btnContainer">
                            <button className="close" onClick={handleCloseModal} >Close</button>
                            <button className="more">More</button>
                        </div>
                    </div>
            </div>


            <form onSubmit={async (e) => { e.preventDefault(); await handleCreateUser(new FormData(e.currentTarget)); }} className="wrapperMain">
                <img src="./a7ed008cb385e998bfa2669d055f856d.png" alt=""/>

                <div className="username ">
                <h1>Username</h1>
                <div className="bg1" ref={bg1} >
                    <i className="fa-solid fa-user"></i>
                    <input name="username" type="text" />
                </div>
                    <h3 className="usernameError" ref={usernameError} ></h3>
            </div>

                <div className="password">
                    <h1>Password</h1>
                    <div className="bg2" ref={bg2} >
                        <i className="fa-solid fa-lock"></i>
                        <input name="password" type="password" />
                    </div>
                    <h3 className="usernameError" ref={passwordError}></h3>
                </div>

                <div className="email">
                    <h1>Email</h1>
                    <div className="bg3" ref={bg3}>
                        <i className="fa-solid fa-envelope"></i>
                        <input name="email" type="email"  />
                    </div>
                    <h3 className="usernameError" ref={emailError}></h3>
                </div>

                <div className="invite">
                    <div className="invWrapper">
                        <h1>Invite code</h1>
                        <h2 onClick={handleOpenModal} >What’s that?</h2>
                    </div>
                    <div className="bg4" ref={bg4}>
                        <i className="fa-solid fa-globe"></i>
                        <input name="invite" type="text"  />
                    </div>
                    <h3 className="usernameError" ref={inviteError}></h3>
                </div>

                <div className="tos">
                    <input type="checkbox" id="tosik" required/>
                <label htmlFor="tosik">I have read and agree to the TOS</label>
            </div>

            <button type="submit" className="reg" ref={verifyOtpRef} >Register</button>

            <Link href='/login' className="alr"  >Already have and account? Login</Link>

        </form>
        </>
    )
}