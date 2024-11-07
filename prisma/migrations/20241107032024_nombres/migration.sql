/*
  Warnings:

  - Added the required column `nombres` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `nombres` VARCHAR(191) NOT NULL;
