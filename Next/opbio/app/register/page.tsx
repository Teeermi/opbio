"use client"
import "./main.css"
import {createUser} from "@/app/_actions/actions";



export default function Page() {

    async function handleCreateUser(formData: FormData) {
        console.log(await createUser(formData));


    }



    return (

        <>

            <div className="notify">
                <div className="sqr">
                    <i className="fa-solid fa-circle-exclamation"></i>
                </div>
            </div>
            <form action={handleCreateUser} className="wrapperMain">
            <img src="./a7ed008cb385e998bfa2669d055f856d.png" alt=""/>

            <div className="username">
                <h1>Username</h1>
                <div className="bg1">
                    <i className="fa-solid fa-user"></i>
                    <input name="username" type="text"/>
                </div>
            </div>

            <div className="password">
                <h1>Password</h1>
                <div className="bg1">
                    <i className="fa-solid fa-lock"></i>
                    <input name="password" type="password"/>
                </div>
            </div>

            <div className="email">
                <h1>Email</h1>
                <div className="bg1">
                    <i className="fa-solid fa-envelope"></i>
                    <input name="email"  type="email"/>
                </div>
            </div>

            <div className="invite">
                <div className="invWrapper">
                    <h1>Invite code</h1>
                    <h2>What’s that?</h2>
                </div>
                <div className="bg1">
                    <i className="fa-solid fa-globe"></i>
                    <input name="invite"  type="text"/>
                </div>
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