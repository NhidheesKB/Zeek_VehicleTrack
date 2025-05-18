import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
export default class extends BaseSeeder {
  async run() {
    const api_details = {
      avg_gross_vehicle_weight: '2220',
      axle_configuration: null,
      chassis_number: 'MA1YG2HUXD2D45559',
      color: 'TORDRRED',
      emission_norms: null,
      engine_number: 'HUD6D17952',
      fitness_upto: '2028-06-12',
      fuel_type: 'PETROL',
      insurance_details: null,
      insurance_validity: '2025-09-05',
      maker_model: 'QUANTO  C8  BS IV',
      manufacturer: 'MAHINDRA & MAHINDRA LIMITED',
      mv_tax_upto: 'ltt',
      owner_name: 'BALAMURUGAN     K',
      owner_number: '',
      permit_issue_date: null,
      permit_number: '',
      permit_type: '',
      permit_validity: null,
      puc_number_upto: '2021-01-01',
      registration_date: '2013-06-13',
      registration_number: 'TN63AE3024',
      rto_name: null,
      status: 'id_found',
      unladen_weight: '1640',
      vehicle_class: 'LMV',
      vehicle_financier: '',
    }
    const record = {
      vehicle_no: 'TN63AE3024',
      api_details:api_details,
      puc_number_upto: api_details.puc_number_upto,
      chassis_number: api_details.chassis_number,
      model: api_details.maker_model,
      manufacturer:api_details.manufacturer,
      insurance_validity: api_details.insurance_validity,
      owner_name: api_details.owner_name,
      colour: api_details.color,
      // created
    }
    await db.table('vehicle_rc_details').knexQuery.insert(record)
    .onConflict('vehicle_no')
    .merge();
  }
}
