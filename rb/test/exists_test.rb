# TarotCardMeanings SDK exists test

require "minitest/autorun"
require_relative "../TarotCardMeanings_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TarotCardMeaningsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
