-- CreateTable
CREATE TABLE `deliveries` (
    `id` VARCHAR(191) NOT NULL,
    `id_client` VARCHAR(191) NOT NULL,
    `id_deliveryman` VARCHAR(191) NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_id_deliveryman_fkey` FOREIGN KEY (`id_deliveryman`) REFERENCES `deliveryman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
