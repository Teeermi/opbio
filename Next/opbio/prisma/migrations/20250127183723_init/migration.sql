-- CreateTable
CREATE TABLE `Settings` (
    `username` VARCHAR(191) NOT NULL,
    `backGroundImg` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Settings_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
