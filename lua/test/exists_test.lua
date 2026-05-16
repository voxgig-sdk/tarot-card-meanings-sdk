-- ProjectName SDK exists test

local sdk = require("tarot-card-meanings_sdk")

describe("TarotCardMeaningsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
