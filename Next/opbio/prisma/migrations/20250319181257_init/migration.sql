-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "invite" TEXT NOT NULL,
    "otpVerified" BOOLEAN NOT NULL,
    "twoFactorAuth" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invites" (
    "code" TEXT NOT NULL,
    "user" TEXT
);

-- CreateTable
CREATE TABLE "Otp" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "username" TEXT NOT NULL,
    "slash" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "backGroundImg" TEXT NOT NULL,
    "avatarImg" TEXT NOT NULL,
    "bannerImg" TEXT NOT NULL,
    "mainBorderColor" TEXT NOT NULL,
    "linksTable" TEXT NOT NULL,
    "groupsTable" TEXT NOT NULL,
    "profileDescription" TEXT NOT NULL,
    "discordInfo" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "discordStatusBorderColor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_invite_key" ON "User"("invite");

-- CreateIndex
CREATE UNIQUE INDEX "Invites_code_key" ON "Invites"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "Otp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_username_key" ON "Settings"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_slash_key" ON "Settings"("slash");
