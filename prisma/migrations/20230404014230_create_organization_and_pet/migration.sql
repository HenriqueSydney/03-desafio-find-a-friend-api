-- CreateEnum
CREATE TYPE "Size" AS ENUM ('VERY_SMALL', 'SMALL', 'MEDIUM', 'BIG', 'VERY_BIG');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('CUB', 'ADULT');

-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "independency_level" "IndependencyLevel" NOT NULL,
    "energy_level" INTEGER NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);
