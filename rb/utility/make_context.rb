# TarotCardMeanings SDK utility: make_context
require_relative '../core/context'
module TarotCardMeaningsUtilities
  MakeContext = ->(ctxmap, basectx) {
    TarotCardMeaningsContext.new(ctxmap, basectx)
  }
end
