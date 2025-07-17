import { audio_validator } from '#validators/validator'
import type { HttpContext } from '@adonisjs/core/http'
import { promises as fs } from 'fs'
import { Readable } from 'stream'
import { audio_convertor } from '#service/audioConvertor'
import { language_detect } from '#service/detectLanguage'
import { unlink } from 'fs/promises'
import drive from '@adonisjs/drive/services/main'
import { pipelinecompute } from '#service/pipelineCompute'

export default class CustomerAudioController {
  public async customer_audio({ request, response }: HttpContext) {
    try {
      const { recorder,language} = await request.validateUsing(audio_validator)
      if (!recorder || !recorder.tmpPath) {
        return response.badRequest({ message: 'Invalid audio or missing file' })
      }
      const audiofile = await fs.readFile(recorder.tmpPath)
      const inputstream = new Readable()
      inputstream.push(audiofile)
      inputstream.push(null)
      await unlink(recorder.tmpPath)
      const wavbuffer = await audio_convertor(inputstream)
      const disk = drive.use('s3')
      const filePath = `service-notes/record-${Date.now()}.wav`
      await disk.put(filePath, wavbuffer)
      const url = await disk.getUrl(filePath)
      const langcode = await language_detect(url)
      const errorMsg =
        'The provided audio is too noisy or short. Please provide a clear or longer audio'
      const message = langcode === errorMsg ? (await disk.delete(filePath),errorMsg) : await pipelinecompute(url, langcode,language)
      console.log('url', url)
      console.log('langcoed', langcode)
      console.log('message', message)
      return response.json({
        sucess: true,
        message: typeof message === 'undefined' ? (await disk.delete(filePath),'No Voice is Detected') : message,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
