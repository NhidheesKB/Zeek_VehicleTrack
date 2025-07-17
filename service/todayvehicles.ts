export interface Vechicle_interface{
    model:string,
    vehicle_no:string,
    owner_name:string,
    phone_number:string,
    services:string,
    service_status:string,
    service_status_style:string,
    estimated_completion:string,
}
const todayvehicles=(todayvehicle:Vechicle_interface)=>{
    return{
        label:todayvehicle.model,
        value:todayvehicle.vehicle_no,
        name:todayvehicle.owner_name,
        phone_no:todayvehicle.phone_number||'N/A',
        services:todayvehicle.services?.split(',').map((s:string)=>s.trim())||null,
        service_status:todayvehicle.service_status||"waiting..",
        service_status_style:todayvehicle.service_status!="Status 4"? "status-in-progress":"status-completed ",
        progress:Number(todayvehicle.service_status?.split('Status')[1])*25||0,
        estimated_completion:todayvehicle.estimated_completion
    }
}
export default todayvehicles
