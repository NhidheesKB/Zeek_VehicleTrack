import env from "#start/env"

 const numberdata=(lastePlate:any)=>{
    return{
        task_id:env.get('TASK_ID'),
        group_id:env.get('GROUP_ID'),
        data:{
            rc_number:lastePlate
        }
    }
}
export default numberdata