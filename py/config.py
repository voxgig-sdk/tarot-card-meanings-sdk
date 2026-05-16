# TarotCardMeanings SDK configuration


def make_config():
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
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "index$": 0,
          },
          {
            "name": "desc",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "meaning_rev",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "meaning_up",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "name_short",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "suit",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "value",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
        ],
        "name": "card",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "arcana",
                      "orig": "arcana",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "suit",
                      "orig": "suit",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "n",
                      "orig": "n",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
