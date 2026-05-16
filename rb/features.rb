# TarotCardMeanings SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TarotCardMeaningsFeatures
  def self.make_feature(name)
    case name
    when "base"
      TarotCardMeaningsBaseFeature.new
    when "test"
      TarotCardMeaningsTestFeature.new
    else
      TarotCardMeaningsBaseFeature.new
    end
  end
end
