/*
  Warnings:

  - Added the required column `slash` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settings` ADD COLUMN `slash` VARCHAR(191) NOT NULL;
