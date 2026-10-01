# TarotCardMeanings SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TarotCardMeanings",
            "slug": "tarot-card-meanings",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://tarot-api-3hv5.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "card": {},
            },
        },
        "entity": {
      "card": {
        "fields": [
          {
            "name": "arcana",
            "title": "Arcana",
            "type": "`$STRING`",
            "req": True,
            "short": "Type of arcana",
          },
          {
            "name": "desc",
            "title": "Desc",
            "type": "`$STRING`",
            "short": "Description of the card imagery and symbolism",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "meaningRev",
            "title": "Meaning Rev",
            "type": "`$STRING`",
            "short": "Divinatory meaning when card is reversed",
          },
          {
            "name": "meaningUp",
            "title": "Meaning Up",
            "type": "`$STRING`",
            "short": "Divinatory meaning when card is upright",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Full name of the tarot card",
          },
          {
            "name": "nameShort",
            "title": "Name Short",
            "type": "`$STRING`",
            "req": True,
            "short": "Short identifier for the card",
          },
          {
            "name": "suit",
            "title": "Suit",
            "type": "`$STRING`",
            "short": "Suit of the card (for Minor Arcana)",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "short": "Numeric value or rank of the card",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "card",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "cards",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "cards",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cards`",
                },
                "args": {
                  "query": [
                    {
                      "name": "arcana",
                      "orig": "arcana",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "suit",
                      "orig": "suit",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "arcana",
                    "suit",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards/{nameShort}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "cards",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "cards",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "nameShort": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "nameShort",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "ar01",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards/random",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "cards",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "cards",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "n",
                      "orig": "n",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                  ],
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "n",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
