import { MigrationInterface, QueryRunner } from "typeorm";

export class final1678586521983 implements MigrationInterface {
    name = 'final1678586521983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "realEstateId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_668b5e7ea5760721c0e28a34e32" UNIQUE ("realEstateId")`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" date`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_668b5e7ea5760721c0e28a34e32" FOREIGN KEY ("realEstateId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_668b5e7ea5760721c0e28a34e32"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_668b5e7ea5760721c0e28a34e32"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "realEstateId"`);
    }

}
