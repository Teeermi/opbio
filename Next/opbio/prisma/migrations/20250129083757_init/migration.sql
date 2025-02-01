/*
  Warnings:

  - You are about to alter the column `linksTable` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `settings` MODIFY `linksTable` JSON NOT NULL;
