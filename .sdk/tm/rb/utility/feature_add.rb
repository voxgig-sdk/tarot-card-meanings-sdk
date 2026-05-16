# TarotCardMeanings SDK utility: feature_add
module TarotCardMeaningsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
