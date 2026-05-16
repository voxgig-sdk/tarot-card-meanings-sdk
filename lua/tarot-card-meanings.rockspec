package = "voxgig-sdk-tarot-card-meanings"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/tarot-card-meanings-sdk.git"
}
description = {
  summary = "TarotCardMeanings SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["tarot-card-meanings_sdk"] = "tarot-card-meanings_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
