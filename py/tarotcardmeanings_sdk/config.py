# TarotCardMeanings SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "req": True,
            "short": "Type of arcana",
            "type": "`$STRING`",
          },
          {
            "name": "desc",
            "short": "Description of the card imagery and symbolism",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "meaningRev",
            "short": "Divinatory meaning when card is reversed",
            "type": "`$STRING`",
          },
          {
            "name": "meaningUp",
            "short": "Divinatory meaning when card is upright",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Full name of the tarot card",
            "type": "`$STRING`",
          },
          {
            "name": "nameShort",
            "req": True,
            "short": "Short identifier for the card",
            "type": "`$STRING`",
          },
          {
            "name": "suit",
            "short": "Suit of the card (for Minor Arcana)",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "short": "Numeric value or rank of the card",
            "type": "`$STRING`",
          },
        ],
        "name": "card",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "arcana",
                      "orig": "arcana",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "suit",
                      "orig": "suit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards",
                "parts": [
                  "api",
                  "v1",
                  "cards",
                ],
                "select": {
                  "exist": [
                    "arcana",
                    "suit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cards`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "ar01",
                      "kind": "param",
                      "name": "id",
                      "orig": "name_short",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards/{nameShort}",
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "n",
                      "orig": "n",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/cards/random",
                "parts": [
                  "api",
                  "v1",
                  "cards",
                  "random",
                ],
                "select": {
                  "$action": "random",
                  "exist": [
                    "n",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
