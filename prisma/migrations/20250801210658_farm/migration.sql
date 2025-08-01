-- CreateTable
CREATE TABLE "public"."Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area_ha" DECIMAL(65,30) NOT NULL,
    "total_arable_area_ha" DECIMAL(65,30) NOT NULL,
    "total_vegetation_area_ha" DECIMAL(65,30) NOT NULL,
    "farmer_id" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Farm" ADD CONSTRAINT "Farm_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "public"."Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
