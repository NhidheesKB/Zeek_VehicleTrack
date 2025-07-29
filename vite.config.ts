import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import path from 'path'

export default defineConfig({
  server:{
    allowedHosts:['vehiicletrack.onrender.com']

  },
  resolve:{
    alias:{
      '#service': path.resolve(__dirname, 'service'),
    }
  },
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],


      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
