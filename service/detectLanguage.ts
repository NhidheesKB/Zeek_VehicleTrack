import { Bhashine_translation_interface } from '#interfaces/completeInterfaces'
import env from '#start/env'
import axios from 'axios'
export async function   language_detect(url: string) {
  const langurl = env.get('LANG_URL') as string
  const payload = {
    pipelineTasks: [
      {
        taskType: 'audio-lang-detection',
        config: {
          serviceId: 'bhashini/iitmandi/audio-lang-detection/gpu',
        },
      },
    ],
    inputData: {
      audio: [
        {
          audioUri: url,
        },
      ],
    },
  }
  try {
    const response=await axios.post(langurl,payload,{
        headers:{
            "Content-Type":"application/json",
            Authorization:env.get("AUTHPARAMETER")
        }
    })
    const audiores = response.data.pipelineResponse;
    return audiores.find((item:Bhashine_translation_interface) => item.taskType == "audio-lang-detection")
      .output[0].langPrediction[0].langCode;
  } catch (error) {
    console.log("error during langcode detection",error.data)

  }
}
