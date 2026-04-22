import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorToArticle1 implements MigrationInterface {
    name = 'AddAuthorToArticle1'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "createdAt"`);
    }

}
