/*
  Warnings:

  - You are about to drop the column `invite` on the `user` table. All the data in the column will be lost.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_invite_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `invite`,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Invites` (
    `code` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NULL,

    UNIQUE INDEX `Invites_code_key`(`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
