import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1598301960148
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [{}],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('customers');
  }
}
