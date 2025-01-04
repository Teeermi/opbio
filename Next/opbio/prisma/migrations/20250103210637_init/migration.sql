/*
  Warnings:

  - A unique constraint covering the columns `[invite]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_invite_key` ON `User`(`invite`);
