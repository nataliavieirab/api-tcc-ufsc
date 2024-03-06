-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GENERAL_ADM', 'FRANCH_ADM', 'BRANCH_ADM', 'WAITER', 'MANAGER', 'RECEPTIONIST', 'CASHIER', 'DELIVERY_ATTENDANT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "roles" "UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
