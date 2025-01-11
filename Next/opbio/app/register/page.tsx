"use client"
import "./main.css"
import {createUser} from "@/app/_actions/actions";
import {useRef} from "react";
import {cookies} from "next/headers";

interface Response {
    code: string;
   status: string;
}

export default function Page() {

    const usernameError = useRef<HTMLDivElement>(null);
    const passwordError = useRef<HTMLDivElement>(null);
    const emailError = useRef<HTMLDivElement>(null);
    const inviteError = useRef<HTMLDivElement>(null);

    const bg1 = useRef<HTMLDivElement>(null);
    const bg2 = useRef<HTMLDivElement>(null);
    const bg3 = useRef<HTMLDivElement>(null);
    const bg4 = useRef<HTMLDivElement>(null);


    function supportRefs(a: HTMLDivElement, b: HTMLDivElement, c: string) {
        a.textContent = c;
        b.classList.add("errorBorder");
    }

    async function handleCreateUser(formData: FormData) {
        if (!usernameError.current || !bg1.current || !passwordError.current || !bg2.current || !emailError.current || !bg3.current || !inviteError.current || !bg4.current) return;

        if (formData.get("username") as string == "") {
            supportRefs(usernameError.current, bg1.current, "Username is required");
        }
        if (formData.get("password") as string == "") {
            supportRefs(passwordError.current, bg2.current, "Password is required");
        }
        if (formData.get("email") as string == "") {
            supportRefs(emailError.current, bg3.current, "Email is required");
        }
        if (formData.get("invite") as string == "") {
            supportRefs(inviteError.current, bg4.current, "Invite is required");
        }

            const repsonse = await createUser(formData);

        console.log(repsonse);


    }


    return (

        <>
            <form action={handleCreateUser} className="wrapperMain">
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
                        <h2>What’s that?</h2>
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

            <button type="submit" className="reg">Register</button>

            <h1 className="alr">Already have and account? Login</h1>

        </form>
        </>
    )
}