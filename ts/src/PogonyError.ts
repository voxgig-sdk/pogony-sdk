
import { Context } from './Context'


class PogonyError extends Error {

  isPogonyError = true

  sdk = 'Pogony'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PogonyError
}

