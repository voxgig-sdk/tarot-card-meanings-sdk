-- TarotCardMeanings SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TarotCardMeanings",
      slug = "tarot-card-meanings",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
            ["title"] = "Arcana",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Type of arcana",
          },
          {
            ["name"] = "desc",
            ["title"] = "Desc",
            ["type"] = "`$STRING`",
            ["short"] = "Description of the card imagery and symbolism",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meaningRev",
            ["title"] = "Meaning Rev",
            ["type"] = "`$STRING`",
            ["short"] = "Divinatory meaning when card is reversed",
          },
          {
            ["name"] = "meaningUp",
            ["title"] = "Meaning Up",
            ["type"] = "`$STRING`",
            ["short"] = "Divinatory meaning when card is upright",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Full name of the tarot card",
          },
          {
            ["name"] = "nameShort",
            ["title"] = "Name Short",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Short identifier for the card",
          },
          {
            ["name"] = "suit",
            ["title"] = "Suit",
            ["type"] = "`$STRING`",
            ["short"] = "Suit of the card (for Minor Arcana)",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$STRING`",
            ["short"] = "Numeric value or rank of the card",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "card",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "cards",
                  },
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "cards",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.cards`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "arcana",
                      ["orig"] = "arcana",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "suit",
                      ["orig"] = "suit",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "arcana",
                    "suit",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards/{nameShort}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "cards",
                  },
                  {
                    ["var"] = "id",
                  },
                },
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "nameShort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "ar01",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/cards/random",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "cards",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["parts"] = {
                  "api",
                  "v1",
                  "cards",
                  "random",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "n",
                      ["orig"] = "n",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "n",
                  },
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
