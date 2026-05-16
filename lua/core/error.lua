-- TarotCardMeanings SDK error

local TarotCardMeaningsError = {}
TarotCardMeaningsError.__index = TarotCardMeaningsError


function TarotCardMeaningsError.new(code, msg, ctx)
  local self = setmetatable({}, TarotCardMeaningsError)
  self.is_sdk_error = true
  self.sdk = "TarotCardMeanings"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TarotCardMeaningsError:error()
  return self.msg
end


function TarotCardMeaningsError:__tostring()
  return self.msg
end


return TarotCardMeaningsError
