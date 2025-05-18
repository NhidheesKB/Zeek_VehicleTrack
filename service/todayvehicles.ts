const todayvehicles=(todayvehicle:any)=>{
    return{
        label:todayvehicle.model,
        value:todayvehicle.vehicle_no,
        name:todayvehicle.owner_name,
        phone_no:todayvehicle.phone_number||'N/A'
    }
}
export default todayvehicles