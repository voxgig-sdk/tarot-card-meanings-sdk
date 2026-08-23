# TarotCardMeanings SDK configuration

module TarotCardMeaningsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "TarotCardMeanings",
        "slug" => "tarot-card-meanings",
        "version" => "0.0.1",
        "target" => "rb",
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
              "name" => "arcana",
              "req" => true,
              "short" => "Type of arcana",
              "type" => "`$STRING`",
            },
            {
              "name" => "desc",
              "short" => "Description of the card imagery and symbolism",
              "type" => "`$STRING`",
            },
            {
              "name" => "meaningRev",
              "short" => "Divinatory meaning when card is reversed",
              "type" => "`$STRING`",
            },
            {
              "name" => "meaningUp",
              "short" => "Divinatory meaning when card is upright",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Full name of the tarot card",
              "type" => "`$STRING`",
            },
            {
              "name" => "nameShort",
              "req" => true,
              "short" => "Short identifier for the card",
              "type" => "`$STRING`",
            },
            {
              "name" => "suit",
              "short" => "Suit of the card (for Minor Arcana)",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "Numeric value or rank of the card",
              "type" => "`$STRING`",
            },
          ],
          "name" => "card",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "arcana",
                        "orig" => "arcana",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "suit",
                        "orig" => "suit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.cards`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "n",
                        "orig" => "n",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
