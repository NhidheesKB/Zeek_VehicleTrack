import Ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { Readable } from 'stream'
Ffmpeg.setFfmpegPath(ffmpegPath.path)
export async function audio_convertor(inputstream: Readable):Promise<Buffer> {
  return new Promise((resolve,reject)=>{
    const chunks:Buffer[]=[]
    const outstream=Ffmpeg(inputstream)
    .inputFormat('webm')
    .audioCodec('pcm_s16le')
    .format('wav')
    .audioFrequency(16000)
    .on('end',()=>{
        const wavbuffer= Buffer.concat(chunks)
        resolve(wavbuffer)
    })
    .on('error',(err)=>{
        console.log("error during conversion",err)
        reject(err)

    })
    .pipe()
    outstream.on('data',(chuck)=>chunks.push(chuck))

  });

}
