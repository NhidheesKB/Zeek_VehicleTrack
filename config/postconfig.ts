import env from "#start/env";

const postconfig = (datas:any)=>{
    return{
        method: 'post',
        url: env.get('POST_URL'),
        headers: { 
        'Content-Type': 'application/json',
        'api-key': env.get('API_KEY'),
        'account-id': env.get('ACCOUNT_ID')
        },
        data:JSON.stringify(datas)
    };
};

export default postconfig