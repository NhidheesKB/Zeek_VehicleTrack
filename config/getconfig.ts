import env from '#start/env'
const getconfig = (request_id:string) => {
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url: env.get('GET_URL')+request_id,
    headers: {
      'Content-Type': 'application/json',
      'api-key': env.get('API_KEY'),
      'account-id': env.get('ACCOUNT_ID'),
    },
  }
}

export default getconfig
