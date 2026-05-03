import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1778407296317 implements MigrationInterface {
  name = 'InitSchema1778407296317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "body" text NOT NULL, "tagList" text NOT NULL DEFAULT '', "favoritesCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "UQ_0ab85f4be07b22d79906671d72f" UNIQUE ("slug"), CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "bio" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "follows" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "followerId" integer, "followingId" integer, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_articles_article" ("userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "PK_7b727fee45cb57ceb2c339d3624" PRIMARY KEY ("userId", "articleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f529d06b718e3a6eb3b9067df0" ON "user_favorite_articles_article" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_db2496d27b0c5330a794b6d6d0" ON "user_favorite_articles_article" ("articleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follows" ADD CONSTRAINT "FK_fdb91868b03a2040db408a53331" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follows" ADD CONSTRAINT "FK_ef463dd9a2ce0d673350e36e0fb" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_articles_article" ADD CONSTRAINT "FK_f529d06b718e3a6eb3b9067df06" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_articles_article" ADD CONSTRAINT "FK_db2496d27b0c5330a794b6d6d04" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_articles_article" DROP CONSTRAINT "FK_db2496d27b0c5330a794b6d6d04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_articles_article" DROP CONSTRAINT "FK_f529d06b718e3a6eb3b9067df06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follows" DROP CONSTRAINT "FK_ef463dd9a2ce0d673350e36e0fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follows" DROP CONSTRAINT "FK_fdb91868b03a2040db408a53331"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_db2496d27b0c5330a794b6d6d0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f529d06b718e3a6eb3b9067df0"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_articles_article"`);
    await queryRunner.query(`DROP TABLE "follows"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "article"`);
  }
}
