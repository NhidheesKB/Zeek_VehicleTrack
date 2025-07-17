import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { store } from '#service/multiPartService'

export default class FileParserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
   await store(ctx.request)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
