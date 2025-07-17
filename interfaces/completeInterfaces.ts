export interface Vehicle_details_interface {
  bikemanufacturer: string|null
  bikemodel: string
  bikecolor: string
  bikenumber: string
  vin_validity: string
  owner_name: string
  phone_number: string
  email: string|undefined
  address: string
  services:string[]|string
  service_date: string
  estimated_completion: string
  assigned_technician: string[]|string
  service_notes: string
}
export interface Bhashini_single_config_interface{
  serviceId: String,
    modelId: String,
    language: { sourceLanguage: String, sourceScriptCode: String },
    domain: string[]
}
export interface Bhashini_Config_interface{
  asrconfig:Bhashini_single_config_interface[]
  translationconfig:Bhashini_single_config_interface[]
  ttsconfig:Bhashini_single_config_interface[]
}

export interface Bhashini{
  taskType: 'asr' | 'translation' | 'tts';
  config: Bhashini_single_config_interface[]
}

export interface Bhashine_translation_interface{
  taskType: 'translation'|'asr'|"audio-lang-detection",
}
