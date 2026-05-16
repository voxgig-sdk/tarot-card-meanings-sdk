
import { Context } from './Context'


class TarotCardMeaningsError extends Error {

  isTarotCardMeaningsError = true

  sdk = 'TarotCardMeanings'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TarotCardMeaningsError
}

