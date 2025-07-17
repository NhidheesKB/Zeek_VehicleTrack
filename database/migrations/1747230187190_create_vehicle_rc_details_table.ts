import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_rc_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('vehicle_no',10).unique()
      table.string('owner_name',50)
      table.string('colour',20)
      table.string('insurance_validity',20)
      table.string('model',60)
      table.string('manufacturer',60)
      table.string('chassis_number',100)
      table.string('puc_number_upto',20)
      table.json('api_details')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
