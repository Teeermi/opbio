"use client";
import "./main.css";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { checkInvite, updateInvites } from "@/actions/actions";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Create account");

  const bluredBg = useRef<HTMLDivElement>(null);

  async function handleCreateUser(formData: FormData) {
    if (
      !(await checkInvite(
        formData.get("invite") as string,
        formData.get("username") as string
      ))
    ) {
      setMessage("Invite code is invalid");
      return;
    }

    await signUp.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: ``,
      image: "",
      invite: formData.get("invite") as string,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: async () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setMessage(ctx.error.message);
          return;
        },
        onSuccess: async () => {
          await updateInvites(
            formData.get("invite") as string,
            formData.get("username") as string
          );
          redirect("/dashboard");
        },
      },
    });
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
      <div className="bluredBg" ref={bluredBg}>
        <div className="modalInviteInfo">
          <i className="fa-solid fa-globe"></i>
          <h1>What is invite?</h1>
          <h2>
            An invite is used to register for access. You can receive it from
            someone who already has one or by submting application
          </h2>

          <div className="btnContainer">
            <button className="close" onClick={handleCloseModal}>
              Close
            </button>
            <button className="more">More</button>
          </div>
        </div>
      </div>

      <form action={handleCreateUser} className="wrapperMain">
        <img src="./a7ed008cb385e998bfa2669d055f856d.png" alt="" />

        <div className="username ">
          <h1>Username</h1>
          <div className="bg1">
            <i className="fa-solid fa-user"></i>
            <input name="username" type="text" />
          </div>
          <h3 className="usernameError"></h3>
        </div>

        <div className="password">
          <h1>Password</h1>
          <div className="bg2">
            <i className="fa-solid fa-lock"></i>
            <input name="password" type="password" required />
          </div>
          <h3 className="usernameError"></h3>
        </div>

        <div className="email">
          <h1>Email</h1>
          <div className="bg3">
            <i className="fa-solid fa-envelope"></i>
            <input name="email" type="email" required />
          </div>
          <h3 className="usernameError"></h3>
        </div>

        <div className="invite">
          <div className="invWrapper">
            <h1>Invite code</h1>
            <h2 onClick={handleOpenModal}>What’s that?</h2>
          </div>
          <div className="bg4">
            <i className="fa-solid fa-globe"></i>
            <input name="invite" type="text" required />
          </div>
          <h3 className="usernameError"></h3>
        </div>

        <div className="tos">
          <input type="checkbox" id="tosik" required />
          <label htmlFor="tosik">I have read and agree to the TOS</label>
        </div>

        <button onClick={(e) => toast("Siema")} type="submit" className="reg">
          {loading ? <Loader2 size={16} className="animate-spin" /> : message}
        </button>

        <Link href="/login" className="alr">
          Already have and account? Login
        </Link>
      </form>
    </>
  );
}
