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
              "active" => true,
              "name" => "arcana",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "desc",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "meaning_rev",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "meaning_up",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "name_short",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "suit",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "value",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 7,
            },
          ],
          "name" => "card",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "arcana",
                        "orig" => "arcana",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "suit",
                        "orig" => "suit",
                        "reqd" => false,
                        "type" => "`$STRING`",
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
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "ar01",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "name_short",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
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
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "n",
                        "orig" => "n",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
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
                  "index$" => 1,
                },
              ],
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
