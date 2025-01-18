-- CreateTable
CREATE TABLE `Otp` (
    `email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Otp_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
