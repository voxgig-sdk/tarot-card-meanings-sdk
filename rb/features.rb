# TarotCardMeanings SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TarotCardMeaningsFeatures
  def self.make_feature(name)
    case name
    when "base"
      TarotCardMeaningsBaseFeature.new
    when "ratelimit"
      TarotCardMeaningsRatelimitFeature.new
    when "retry"
      TarotCardMeaningsRetryFeature.new
    when "test"
      TarotCardMeaningsTestFeature.new
    when "timeout"
      TarotCardMeaningsTimeoutFeature.new
    else
      TarotCardMeaningsBaseFeature.new
    end
  end
end
