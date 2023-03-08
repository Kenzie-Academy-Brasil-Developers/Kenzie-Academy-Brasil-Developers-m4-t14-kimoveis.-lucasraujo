import { MigrationInterface, QueryRunner } from "typeorm";

export class init3Migration1677946224293 implements MigrationInterface {
    name = 'init3Migration1677946224293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD "hour" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP COLUMN "date"`);
    }

}
