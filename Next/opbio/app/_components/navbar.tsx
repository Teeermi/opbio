"use client";

import "./style.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbarDashboard">
      <img src="/image11.png" alt="" />

      <Link
        href="/dashboard"
        className={`dashboardLink${pathname === "/dashboard" ? "Active" : ""}`}
      >
        <div className={`sqrIcon${pathname === "/dashboard" ? "Active" : ""}`}>
          <i
            className={`fa-solid fa-tablet awesome${
              pathname === "/dashboard" ? "Active" : ""
            }`}
          ></i>
        </div>
        <h1 className={`h1Name${pathname === "/dashboard" ? "Active" : ""}`}>
          Dashboard
        </h1>
      </Link>

      <Link
        href="/customize"
        className={`dashboardLink${pathname === "/customize" ? "Active" : ""}`}
      >
        <div className={`sqrIcon${pathname === "/customize" ? "Active" : ""}`}>
          <i
            className={`fa-solid fa-tablet awesome${
              pathname === "/customize" ? "Active" : ""
            }`}
          ></i>
        </div>
        <h1 className={`h1Name${pathname === "/customize" ? "Active" : ""}`}>
          Customize
        </h1>
      </Link>

      <Link
        href="/customize"
        className={`dashboardLink${pathname === "/customize" ? "Active" : ""}`}
      >
        <div className={`sqrIcon${pathname === "/customize" ? "Active" : ""}`}>
          <i
            className={`fa-solid fa-tablet awesome${
              pathname === "/customize" ? "Active" : ""
            }`}
          ></i>
        </div>
        <h1 className={`h1Name${pathname === "/customize" ? "Active" : ""}`}>
          Customize
        </h1>
      </Link>

      <Link
        href="/customize"
        className={`dashboardLink${pathname === "/customize" ? "Active" : ""}`}
      >
        <div className={`sqrIcon${pathname === "/customize" ? "Active" : ""}`}>
          <i
            className={`fa-solid fa-tablet awesome${
              pathname === "/customize" ? "Active" : ""
            }`}
          ></i>
        </div>
        <h1 className={`h1Name${pathname === "/customize" ? "Active" : ""}`}>
          Customize
        </h1>
      </Link>

      <div className="discordLinkContainer">
        <div className="wrapperDiscordLinkContainer">
          <div className="sqrDiscordIcon">
            <i className="fa-brands fa-discord"></i>
          </div>
          <h1>Link discord?</h1>
          <h2>Click button below</h2>
        </div>

        <Link href={"/"} className="discordLoginButton">
          Login
        </Link>
      </div>
    </div>
  );
}
