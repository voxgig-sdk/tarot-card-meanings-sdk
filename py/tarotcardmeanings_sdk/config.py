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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "desc",
            "type": "`$STRING`",
          },
          {
            "name": "meaningRev",
            "type": "`$STRING`",
          },
          {
            "name": "meaningUp",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "nameShort",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "suit",
            "type": "`$STRING`",
          },
          {
            "name": "value",
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
