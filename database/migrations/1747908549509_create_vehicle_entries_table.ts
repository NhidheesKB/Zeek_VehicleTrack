import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('user_details')
      table.string('vehicle_no',10).index().references('vehicle_no').inTable('vehicle_rc_details')
      table.string('services',100)
      table.string('service_status',15)
      table.string('estimated_completion',10)
      table.string('assigned_technician',50)
      table.string('service_notes',100)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
