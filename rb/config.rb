# TarotCardMeanings SDK configuration

module TarotCardMeaningsConfig
  def self.make_config
    {
      "main" => {
        "name" => "TarotCardMeanings",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://tarot-api-3hv5.onrender.com",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "card" => {},
        },
      },
      "entity" => {
        "card" => {
          "fields" => [
            {
              "name" => "arcana",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "desc",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "meaning_rev",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "meaning_up",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "name_short",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "suit",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "value",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
          ],
          "name" => "card",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "arcana",
                        "orig" => "arcana",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "suit",
                        "orig" => "suit",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/v1/cards",
                  "parts" => [
                    "api",
                    "v1",
                    "cards",
                  ],
                  "select" => {
                    "exist" => [
                      "arcana",
                      "suit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "ar01",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "name_short",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/v1/cards/{nameShort}",
                  "parts" => [
                    "api",
                    "v1",
                    "cards",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "nameShort" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "n",
                        "orig" => "n",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/v1/cards/random",
                  "parts" => [
                    "api",
                    "v1",
                    "cards",
                    "random",
                  ],
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "n",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TarotCardMeaningsFeatures.make_feature(name)
  end
end
