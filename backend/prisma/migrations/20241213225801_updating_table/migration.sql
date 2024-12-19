/*
  Warnings:

  - You are about to alter the column `status` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `campaign` MODIFY `status` ENUM('Active', 'COMPLETED', 'EXPIRED') NOT NULL DEFAULT 'Active';
