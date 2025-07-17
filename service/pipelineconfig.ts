// import env from '#start/env'
// import axios from 'axios'
// import { pipelinecompute } from './pipelineCompute.js'
// export async function pipelineconfig(url: string, langcode: string, targetLang: string) {
//   // const configurl: string = env.get('CONFIG_URL')!
//   // const PipelinePayload = {
//   //   pipelineTasks: [
//   //     {
//   //       taskType: 'asr',
//   //       config: {
//   //         language: {
//   //           sourceLanguage: langcode,
//   //         },
//   //       },
//   //     },
//   //     {
//   //       taskType: 'translation',
//   //       config: {
//   //         language: {
//   //           sourceLanguage: langcode,
//   //           targetLanguage: targetLang,
//   //         },
//   //       },
//   //     },
//   //     {
//   //       taskType: 'tts',
//   //       config: {
//   //         language: {
//   //           sourceLanguage: targetLang,
//   //         },
//   //       },
//   //     },
//   //   ],
//   //   pipelineRequestConfig: {
//   //     pipelineId: '64392f96daac500b55c543cd',
//   //   },
//   // }
//   // const AsrPayload = {
//   //   pipelineTasks: [
//   //     {
//   //       taskType: 'asr',
//   //       config: {
//   //         language: {
//   //           sourceLanguage: langcode,
//   //         },
//   //       },
//   //     },
//   //   ],
//   //   pipelineRequestConfig: {
//   //     pipelineId: '64392f96daac500b55c543cd',
//   //   },
//   // }
//   // const payload = langcode === targetLang ? AsrPayload : PipelinePayload

//   // try {
//   //   // const response = await axios.post(configurl, payload, {
//   //   //   headers: {
//   //   //     'Content-Type': 'application/json',
//   //   //     'userID': env.get('USERID'),
//   //   //     'ulcaApiKey': env.get('ULCAAPIKEY'),
//   //   //   },
//   //   // })
//   //   // const bhasnini = response.data
//     const callbackUrl = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
//     const auth_parameter_key = 'Authorization'
//     const auth_parameter_value = 'vCjKcE_25LB0t5zflf2XUq9DX8jZkcYnW3Kx71xWQymhioz-CGevhk5SuiM7dj6u'
//     console.log("callback",callbackUrl,auth_parameter_key,auth_parameter_value)
//     return pipelinecompute(
//       url,
//       langcode,
//       targetLang,
//     )
// //   } catch (error) {
// //     console.log('error in Bhashini pipelineconfig', error)
// //   }
// }
