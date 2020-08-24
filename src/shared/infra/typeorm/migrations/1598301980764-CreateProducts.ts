import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1598301980764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [{}],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('products');
  }
}
