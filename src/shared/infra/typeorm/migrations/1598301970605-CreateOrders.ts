import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrders1598301970605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [{}],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('order');
  }
}
