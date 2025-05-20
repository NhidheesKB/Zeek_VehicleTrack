import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'
export default class extends BaseSeeder {
  async run() {
    const hashedpassword=await hash.make('NlK@2002')
    const data={
      email:'nhidhees@gmail.com',
      password:hashedpassword,
      created_at:db.raw('CURRENT_TIMESTAMP'),
      updated_at:db.raw('CURRENT_TIMESTAMP')
    }
    await db.table('users').insert(data);
  }
}