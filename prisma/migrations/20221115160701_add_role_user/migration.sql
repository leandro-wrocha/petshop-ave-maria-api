/*
  Warnings:

  - Changed the type of `roleName` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'client', 'employee');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleName",
ADD COLUMN     "roleName" "Role" NOT NULL;
