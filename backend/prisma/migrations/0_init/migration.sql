-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "delivery_attempt_status" AS ENUM ('success', 'failed', 'recipient_absent', 'address_not_found', 'refused');

-- CreateEnum
CREATE TYPE "notification_status" AS ENUM ('pending', 'sending', 'failed');

-- CreateEnum
CREATE TYPE "package_status" AS ENUM ('posted', 'in_transit', 'out_for_delivery', 'delivered', 'canceled');

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courier" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "vehicle_type" VARCHAR(50),

    CONSTRAINT "courier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(150),
    "password" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_attempt" (
    "id" UUID NOT NULL,
    "package_id" UUID NOT NULL,
    "courier_id" UUID NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "status" "delivery_attempt_status" NOT NULL,
    "notes" TEXT,
    "attempted_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_center" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "city" VARCHAR(80),
    "state" CHAR(2),

    CONSTRAINT "distribution_center_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" UUID NOT NULL,
    "package_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "sent_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" "notification_status" NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" UUID NOT NULL,
    "tracking_code" VARCHAR(20) NOT NULL,
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,
    "current_status" "package_status" NOT NULL,
    "current_location" VARCHAR(100),
    "sender_address_id" UUID,
    "receiver_address_id" UUID,
    "is_canceled" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_item" (
    "id" UUID NOT NULL,
    "package_id" UUID NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "weight" DOUBLE PRECISION,

    CONSTRAINT "package_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_updates" (
    "id" UUID NOT NULL,
    "package_id" UUID NOT NULL,
    "status" "package_status" NOT NULL,
    "location_id" UUID,
    "courier_id" UUID,
    "center_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "package_tracking_code_key" ON "package"("tracking_code");

-- AddForeignKey
ALTER TABLE "delivery_attempt" ADD CONSTRAINT "delivery_attempt_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "delivery_attempt" ADD CONSTRAINT "delivery_attempt_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_receiver_address_id_fkey" FOREIGN KEY ("receiver_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_sender_address_id_fkey" FOREIGN KEY ("sender_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "package_item" ADD CONSTRAINT "package_item_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracking_updates" ADD CONSTRAINT "tracking_updates_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "distribution_center"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracking_updates" ADD CONSTRAINT "tracking_updates_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracking_updates" ADD CONSTRAINT "tracking_updates_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracking_updates" ADD CONSTRAINT "tracking_updates_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

