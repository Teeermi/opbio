/*
  Warnings:

  - Added the required column `avatarImg` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerImg` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settings` ADD COLUMN `avatarImg` VARCHAR(191) NOT NULL,
    ADD COLUMN `bannerImg` VARCHAR(191) NOT NULL;
