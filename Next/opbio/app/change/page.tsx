"use client";

import { notFound, redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  changeOtpMail,
  checkIfOtpVerified,
  getSession,
  getSessionEmail,
} from "@/actions/actions";
import Link from "next/link";
import "./main.css";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [emailFromDB, setEmailFromDB] = useState<string | undefined>(undefined);
  const verifyOtpRef = useRef<HTMLButtonElement>(null);
  const [testOne, setTestOne] = useState<boolean | undefined>(undefined);
  const [session, setSession] = useState<string | undefined>(undefined);

  const bg1 = useRef<HTMLDivElement>(null);
  const emailError = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getSession();
      setSession(response);
      const checkOtp = await checkIfOtpVerified(response);

      setTestOne(checkOtp as boolean | undefined);
      const getMail = (await getSessionEmail(response)) as string | undefined;
      setEmailFromDB(getMail);

      setLoading(false);
    }

    fetchData();
  }, []);

  function supportRefs(a: HTMLDivElement, b: HTMLDivElement, c: string) {
    a.textContent = c;
    b.classList.add("errorBorder");
  }

  if (loading) return <div>Loading...</div>;
  if (testOne || !session) return notFound();

  async function handleChangeOtpMail(formData: FormData) {
    const email = formData.get("email") as string | null;

    if (email === emailFromDB) {
      if (emailError.current && bg1.current) {
        supportRefs(emailError.current, bg1.current, "You can't change email");
        return;
      }
    }

    if (email && emailFromDB) {
      const response = await changeOtpMail(email, emailFromDB);

      if (emailError.current && bg1.current) {
        if (response.code === "EE") {
          supportRefs(
            emailError.current,
            bg1.current,
            "Please enter a valid invite code"
          );
        } else {
          emailError.current.textContent = "";
          bg1.current.classList.remove("errorBorder");

          if (verifyOtpRef.current) {
            verifyOtpRef.current.classList.add("successOtp");
            verifyOtpRef.current.textContent = "Email changed successfully";

            setTimeout(() => {
              redirect("/otp");
            }, 5000);
          }
        }
      }
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleChangeOtpMail(new FormData(e.currentTarget));
      }}
      className="wrapperMain"
    >
      <div className="email">
        <h1>Your email</h1>
        <div className="bg1">
          <i className="fa-solid fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder={emailFromDB}
            disabled={true}
          />
        </div>
      </div>

      <div className="email">
        <h1>Enter email</h1>
        <div className="bg2" ref={bg1}>
          <i className="fa-solid fa-envelope"></i>
          <input name="email" type="email" />
        </div>
        <h3 className="usernameError" ref={emailError}></h3>
      </div>

      <button type="submit" className="reg" ref={verifyOtpRef}>
        Change mail
      </button>

      <Link href="/otp" className="alr">
        You don&#39;t want to change email? Return
      </Link>
    </form>
  );
}
