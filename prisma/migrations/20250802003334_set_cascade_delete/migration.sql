-- DropForeignKey
ALTER TABLE "public"."Crop" DROP CONSTRAINT "Crop_farm_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Farm" DROP CONSTRAINT "Farm_farmer_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Farm" ADD CONSTRAINT "Farm_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "public"."Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Crop" ADD CONSTRAINT "Crop_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "public"."Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
