"use client";

import "./main.css";
import { useRef, useState } from "react";
import { signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Page() {
  const verifyOtpRef = useRef<HTMLButtonElement>(null);
  const bg1 = useRef<HTMLDivElement>(null);
  const emailError = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  function supportRefs(a: HTMLDivElement, b: HTMLDivElement, c: string) {
    a.textContent = c;
    b.classList.add("errorBorder");
  }

  async function handleLogin(formData: FormData) {
    await signIn.email(
      {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          setLoading(false);
        },
        onSuccess: async () => {
          redirect("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <form action={handleLogin} className="wrapperMain">
      <div className="email">
        <h1>Email or username</h1>
        <div className="bg1" ref={bg1}>
          <i className="fa-solid fa-envelope"></i>
          <input name="email" type="text" />
        </div>
        <h3 className="usernameError" ref={emailError}></h3>
      </div>

      <div className="password">
        <h1>Password</h1>
        <div className="bg2">
          <i className="fa-solid fa-lock"></i>
          <input name="password" type="password" />
        </div>
      </div>

      <div className="tos">
        <input type="checkbox" id="tosik" required />
        <label htmlFor="tosik">Remember me</label>
      </div>

      <button className="submitBtn" ref={verifyOtpRef}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
      </button>
    </form>
  );
}
