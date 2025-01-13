/*
  Warnings:

  - You are about to drop the column `verified` on the `user` table. All the data in the column will be lost.
  - Added the required column `otpVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `verified`,
    ADD COLUMN `otpVerified` BOOLEAN NOT NULL;
