interface Vechicle{
    model:string,
    vehicle_no:string,   
    owner_name:string,   
    phone_number?:string,   
    services:string,
    service_status:string,
    estimated_completion:string,
}
const todayvehicles=(todayvehicle:Vechicle)=>{
    return{
        label:todayvehicle.model,
        value:todayvehicle.vehicle_no,
        name:todayvehicle.owner_name,
        phone_no:todayvehicle.phone_number||'N/A',
        services:todayvehicle.services.split(',').map((s:string)=>s.trim()),
        service_status:todayvehicle.service_status,
        progress:Number(todayvehicle.service_status.split('Status')[1])*25,
        estimated_completion:todayvehicle.estimated_completion
    }
}
export default todayvehicles