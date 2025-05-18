import type { HttpContext } from '@adonisjs/core/http'
import axios from "axios"
import collect from "collect.js"
import getconfig from '#config/getconfig'
import postconfig from '#config/postconfig'
import numberdata from '../../service/numberdata.js'
import VehicleDetail from '#models/vehicle_rc_details'
import numberplate from '../../service/numberplate.js'
export default class ServicedashboardsController {
    public async platenum({request,response,}:HttpContext){
        const{platenumber}:any=request.body()
        console.log(`plate numberis ${platenumber}`);
        if(!platenumber){
            return response.status(404).json({sucess:false,message:"Then number is not detected"})
        }
        const datas=numberdata(platenumber);
        
        try {
            const config= postconfig(datas)
            const response=(await axios(config)).data;     
            setTimeout(async() => {
                const getresponse=(await axios(getconfig(response.request_id))).data
                console.log("getresponse",getresponse)
                const collection:any=collect(getresponse);
                // console.log("collecetion extra",collection.items[0].result.extraction_output)
                const collresult=collection.first()?.result?.extraction_output;
                console.log(collresult);
                const dbdata={
                    vehicle_no:collresult?.registration_number,
                    owner_name:collresult?.owner_name,
                    colour:collresult?.color,
                    insurance_validity:collresult?.insurance_validity,
                    model:collresult?.maker_model,
                    manufacturer:collresult?.manufacturer,
                    chassis_number:collresult?.chassis_number,
                    puc_number_upto:collresult?.puc_number_upto,
                    api_details:collresult
                }
                await VehicleDetail.updateOrCreate({vehicle_no:collresult?.registration_number},dbdata)
                numberplate.set(platenumber);
            },10000);
                               
        } 
        catch (error) {
            return response.status(500).json({success:false,error:error.data})
            
        }
        
    }
    
}