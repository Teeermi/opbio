/*
  Warnings:

  - Added the required column `discordInfo` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordStatusBorderColor` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupsTable` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linksTable` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainBorderColor` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nick` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileDescription` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settings` ADD COLUMN `discordInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `discordStatusBorderColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `groupsTable` VARCHAR(191) NOT NULL,
    ADD COLUMN `linksTable` VARCHAR(191) NOT NULL,
    ADD COLUMN `mainBorderColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `nick` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `views` INTEGER NOT NULL;
