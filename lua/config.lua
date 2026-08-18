-- TarotCardMeanings SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TarotCardMeanings",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://tarot-api-3hv5.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["card"] = {},
      },
    },
    entity = {
      ["card"] = {
        ["fields"] = {
          {
            ["name"] = "arcana",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "desc",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meaningRev",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meaningUp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nameShort",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "suit",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "value",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "card",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "arcana",
                      ["orig"] = "arcana",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "suit",
                      ["orig"] = "suit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards",
                ["parts"] = {
                  "api",
                  "v1",
                  "cards",
                },
                ["select"] = {
                  ["exist"] = {
                    "arcana",
                    "suit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.cards`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "ar01",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "name_short",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards/{nameShort}",
                ["parts"] = {
                  "api",
                  "v1",
                  "cards",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["nameShort"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "n",
                      ["orig"] = "n",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards/random",
                ["parts"] = {
                  "api",
                  "v1",
                  "cards",
                  "random",
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "n",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
