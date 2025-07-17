import axios from 'axios'
import { Bhashine_translation_interface } from '#interfaces/completeInterfaces'
import env from '#start/env'

export async function pipelinecompute(
  url: string,
  langcode: string,
  targetLang: string,
) {
  const payload = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: {
            sourceLanguage: langcode,
          },
          serviceId: 'bhashini/ai4bharat/conformer-multilingual-asr',
          audioFormat: 'wav',
          samplingRate: 16000,
          preProcessor: ['vad', 'denoiser'],
          postProcessors: ['itn', 'punctuation'],
        },
      },
      {
        taskType: 'translation',
        config: {
          language: {
            sourceLanguage: langcode,
            targetLanguage: targetLang,
          },
          serviceId: 'ai4bharat/indictrans-v2-all-gpu--t4',
        },
      },
      {
        taskType: 'tts',
        config: {
          language: {
            sourceLanguage: targetLang,
          },
          serviceId: 'Bhashini/IITM/TTS',
          gender: 'male',
        },
      },
    ],
    inputData: {
      audio: [{ audioUri: url }],
    },
  }
  try {
    const callbackUrl=env.get('CALLBACKURL')
    const response = await axios.post(callbackUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': env.get('AUTHPARAMETER')
      },
    })
    const finalresponse = response.data.pipelineResponse
    // const asrresponse = finalresponse.find((item:Bhashine_translation_interface) => item.taskType == "asr");
    const translationresponse = finalresponse.find(
      (item: Bhashine_translation_interface) => item.taskType == 'translation'
    )
    // const ttsresponse = finalresponse.find((item) => item.taskType == "tts");
    // console.log("asrres",asrresponse.output[0].source)
    console.log('final res', translationresponse.output[0].target)
    return translationresponse.output[0].target
  } catch (error) {
    console.log('error during traslation', error.response.data)
  }
}
