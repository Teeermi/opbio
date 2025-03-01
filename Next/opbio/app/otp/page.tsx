"use client";

import "./main.css";
import {
  checkIfOtpVerified,
  getSession,
  resendOtp,
} from "@/app/_actions/actions";
import { useEffect, useRef, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [timerExist, setTimerExist] = useState(false);
  const [testOne, setTestOne] = useState<boolean | undefined>(undefined);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const verifyOtpRef = useRef<HTMLButtonElement>(null);
  const resendCode = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    async function fetchData() {
      const response: string | undefined = await getSession();
      const checkOtp = await checkIfOtpVerified(response);

      setTestOne(checkOtp as boolean | undefined);

      setSession(response);
      setLoading(false);
    }

    fetchData();

    const resendTime = localStorage.getItem("resendTime");

    if (new Date().getTime() - parseInt(resendTime as string) < 60000) {
      setTimerExist(true);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (testOne || !session) return notFound();

  function handleChange(value: string, index: number) {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 5) {
      const element = document.querySelector(
        `.input${index + 2}`
      ) as HTMLElement | null;

      if (element) {
        element.focus();
      } else {
        console.warn(`Element with class .input${index} not found.`);
      }
    }
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      const previousElement = document.querySelector(
        `.input${index}`
      ) as HTMLElement | null;
      if (previousElement) {
        const newArr = [...otp];

        newArr[index - 1] = "";
        setOtp(newArr);

        previousElement.focus();
      }
    }
  }

  async function apiOtpCall() {
    if (otp.join("").length < 6) {
      if (verifyOtpRef.current) {
        verifyOtpRef.current.classList.add("errorOtp");
        verifyOtpRef.current.textContent = "Invalid OTP";
        return;
      }
    }

    const response = await fetch("/api/otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const data = await response.json();

    if (data?.message === "Error") {
      if (verifyOtpRef.current) {
        verifyOtpRef.current.classList.add("errorOtp");
        verifyOtpRef.current.textContent = "Invalid OTP";
        return;
      }
    }

    if (data?.message === "Success") {
      if (verifyOtpRef.current) {
        verifyOtpRef.current.classList.add("successOtp");
        verifyOtpRef.current.textContent = "Success Redirecting...";

        setTimeout(() => {
          redirect("/dashboard");
        }, 5000);
      }
    }
  }

  async function handleResendCode() {
    if (session) {
      if (timerExist && resendCode.current) {
        resendCode.current.textContent = "You can resend code in 5 minutes";
        return;
      }

      const response = await resendOtp(session);

      if (response?.status === "success") {
        if (resendCode.current) {
          resendCode.current.textContent = "Code has been sent";

          const currentTime = new Date().getTime();

          localStorage.setItem("resendTime", currentTime.toString());

          setTimerExist(true);

          setTimeout(() => {
            setTimerExist(false);
          }, 60000);
        }
      }
    }
  }

  return (
    <div className="otpContainer">
      <h1>Verify You Email Address</h1>
      <h2>
        To complete your registration, please verify your email address. Check
        your inbox for a verification link and follow the instructions to
        activate your account
      </h2>
      <form action={apiOtpCall} className="otpForm">
        <div className="inputsContainer">
          {otp.map((digit, index) => (
            <input
              key={index}
              name={`value`}
              type="number"
              max={9}
              className={`input${index + 1}`}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>
        <h3>
          Want to Change Your Email Address?{" "}
          <Link href="/change">Change here</Link>
        </h3>

        <button className="submitBtn" ref={verifyOtpRef}>
          Verify Email
        </button>
      </form>
      <h4 onClick={handleResendCode} ref={resendCode}>
        Resend code
      </h4>
    </div>
  );
}
