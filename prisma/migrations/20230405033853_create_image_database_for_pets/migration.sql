-- CreateTable
CREATE TABLE "pets_images" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,

    CONSTRAINT "pets_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets_images" ADD CONSTRAINT "pets_images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
