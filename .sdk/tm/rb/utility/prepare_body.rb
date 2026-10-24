# TarotCardMeanings SDK utility: prepare_body
require_relative 'media'
module TarotCardMeaningsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TarotCardMeaningsUtilities.raw_body(ctx.reqdata) if TarotCardMeaningsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
