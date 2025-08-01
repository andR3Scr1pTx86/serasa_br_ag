-- CreateTable
CREATE TABLE "public"."Crop" (
    "id" TEXT NOT NULL,
    "crop_yr" INTEGER NOT NULL,
    "planted_crop" TEXT NOT NULL,
    "farm_id" TEXT NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Crop" ADD CONSTRAINT "Crop_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
