import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('vehicle_no')
      table.string('name',50)
      table.string('phone_number',15)
      table.string('email',50)
      table.string('address',100)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}