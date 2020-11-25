import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1606305732781 implements MigrationInterface {
    name = 'InitialMigration1606305732781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NULL, `email` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `refresh_token` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` varchar(36) NULL, `claimerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `claimer` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `redirectUrl` varchar(255) NOT NULL, `apiKey` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `permissionLevel` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `refresh_token` ADD CONSTRAINT `FK_8e913e288156c133999341156ad` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `refresh_token` ADD CONSTRAINT `FK_e5eb000391c27579d633ed694ff` FOREIGN KEY (`claimerId`) REFERENCES `claimer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `refresh_token` DROP FOREIGN KEY `FK_e5eb000391c27579d633ed694ff`");
        await queryRunner.query("ALTER TABLE `refresh_token` DROP FOREIGN KEY `FK_8e913e288156c133999341156ad`");
        await queryRunner.query("DROP TABLE `claimer`");
        await queryRunner.query("DROP TABLE `refresh_token`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
