"use server";

import prisma from "@/app/_lib/db";
import { Prisma } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { createSession, decrypt, deleteSession } from "@/app/_lib/sessions";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createUser(formData: FormData) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      formData.get("password") as string,
      salt
    );
    const invite = await prisma.invites.findUnique({
      where: {
        code: formData.get("invite") as string,
      },
    });
    const existEmail = await prisma.user.findUnique({
      where: {
        email: formData.get("email") as string,
      },
    });
    const existUserName = await prisma.user.findUnique({
      where: {
        username: formData.get("username") as string,
      },
    });

    if (existEmail && existUserName && (!invite || invite.user)) {
      return { status: "error", code: "EEUNINF" };
    }

    if (existEmail && existUserName) {
      return { status: "error", code: "EEUN" };
    }

    if (existEmail && (!invite || invite.user)) {
      return { status: "error", code: "EEINF" };
    }

    if (existUserName && (!invite || invite.user)) {
      return { status: "error", code: "EUNINF" };
    }

    if (existEmail) {
      return { status: "error", code: "EE" };
    }

    if (existUserName) {
      return { status: "error", code: "EUN" };
    }

    if (!invite) {
      return { status: "error", code: "INF" };
    }

    if (invite.user) {
      return { status: "error", code: "RI" };
    }

    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        password: hashedPassword,
        username: formData.get("username") as string,
        invite: formData.get("invite") as string,
        otpVerified: false,
        twoFactorAuth: false,
      },
    });

    await prisma.invites.update({
      where: {
        code: invite.code,
      },
      data: {
        user: formData.get("username") as string,
      },
    });

    await createSession(formData.get("email") as string, false);

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    await prisma.otp.create({
      data: {
        email: formData.get("email") as string,
        code: otpCode.toString(),
        date: new Date(Date.now()).toISOString(),
      },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "olafkrawczyk13@icloud.com",
      subject: "Hello World",
      html: `${otpCode}`,
    });

    return { status: "success", code: "SS" };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { status: "error", code: `${e.meta?.targe}` };
    } else {
      throw e;
    }
  }
}

export async function changeOtpMail(
  emailToChange: string,
  emailFromDB: string
) {
  const existEmail = await prisma.user.findUnique({
    where: {
      email: emailToChange,
    },
  });
  if (existEmail) {
    return { status: "error", code: "EE" };
  }

  console.log(emailToChange, emailFromDB);

  await prisma.user.update({
    where: {
      email: emailFromDB,
    },
    data: {
      email: emailToChange,
    },
  });

  await prisma.otp.delete({
    where: {
      email: emailFromDB,
    },
  });

  const otpCode = Math.floor(100000 + Math.random() * 900000);

  await prisma.otp.create({
    data: {
      email: emailToChange,
      code: otpCode.toString(),
      date: new Date(Date.now()).toISOString(),
    },
  });

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "mailto",
    subject: "Hello World",
    html: `${otpCode}`,
  });

  await deleteSession();

  await createSession(emailToChange, false);

  return { status: "success", code: "SS" };
}

export async function getSession() {
  return (await cookies()).get("session")?.value;
}

export async function getSessionEmail(session: string | undefined) {
  const sessionData = await decrypt(session);

  return sessionData?.userId;
}

export async function checkIfOtpVerified(session: string | undefined) {
  const sessionData = await decrypt(session);

  return sessionData?.otpVerified;
}

export async function resendOtp(session: string) {
  const sessionData = await decrypt(session);
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  await prisma.otp.delete({
    where: {
      email: sessionData?.userId as string,
    },
  });

  await prisma.otp.create({
    data: {
      email: sessionData?.userId as string,
      code: otpCode.toString(),
      date: new Date(Date.now()).toISOString(),
    },
  });

  await resend.emails.send({
    from: sessionData?.userId as string,
    to: "mailto",
    subject: "Hello World",
    html: `${otpCode}`,
  });

  return { status: "success", code: "SS" };
}

export async function login(formData: FormData) {
  const emailOrUsername = formData.get("email") as string;
  const tableFromAbove = emailOrUsername.split("");

  const findIfEmail = tableFromAbove.find((e) => e === "@");
  if (findIfEmail) {
    const existEmail = await prisma.user.findUnique({
      where: {
        email: emailOrUsername,
      },
    });

    if (existEmail) {
      const findPassword = await bcrypt.compare(
        formData.get("password") as string,
        existEmail.password
      );

      if (findPassword) {
        await deleteSession();
        await createSession(emailOrUsername, true);
        return { status: "success", code: "SS" };
      } else {
        return { status: "error", code: "EE" };
      }
    } else {
      return { status: "error", code: "EE" };
    }
  } else {
    const existUsername = await prisma.user.findUnique({
      where: {
        username: emailOrUsername,
      },
    });

    if (existUsername) {
      const findPassword = await bcrypt.compare(
        formData.get("password") as string,
        existUsername.password
      );

      if (findPassword) {
        if (!existUsername.otpVerified) {
          await deleteSession();
          await createSession(existUsername.email, false);
          const session = await getSession();

          await resendOtp(session as string);

          return { status: "error", code: "NOV" };
        }

        await deleteSession();
        await createSession(emailOrUsername, true);
        return { status: "success", code: "SS" };
      } else {
        return { status: "error", code: "EUN" };
      }
    } else {
      return { status: "error", code: "EUN" };
    }
  }
}

export async function findUserSettings(slash: string) {
  const userSettings = await prisma.settings.findUnique({
    where: {
      slash: slash,
    },
  });

  if (!userSettings) {
    return { status: "error", code: "EUN" };
  } else {
    return userSettings;
  }
}
