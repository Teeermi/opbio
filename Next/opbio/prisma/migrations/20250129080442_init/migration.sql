/*
  Warnings:

  - A unique constraint covering the columns `[slash]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Settings_slash_key` ON `Settings`(`slash`);
