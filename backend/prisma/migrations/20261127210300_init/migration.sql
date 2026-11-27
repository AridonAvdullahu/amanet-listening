-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `externalId` VARCHAR(512) NOT NULL,
    `source` VARCHAR(32) NOT NULL,
    `authorName` VARCHAR(191) NOT NULL,
    `authorHandle` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `url` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Post_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;