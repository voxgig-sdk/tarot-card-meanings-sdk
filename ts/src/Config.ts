
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TarotCardMeanings',
        slug: "tarot-card-meanings",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://tarot-api-3hv5.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      card: {
      },

    }
  }


  entity = {
    "card": {
      "fields": [
        {
          "name": "arcana",
          "req": true,
          "short": "Type of arcana",
          "type": "`$STRING`"
        },
        {
          "name": "desc",
          "short": "Description of the card imagery and symbolism",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "meaningRev",
          "short": "Divinatory meaning when card is reversed",
          "type": "`$STRING`"
        },
        {
          "name": "meaningUp",
          "short": "Divinatory meaning when card is upright",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Full name of the tarot card",
          "type": "`$STRING`"
        },
        {
          "name": "nameShort",
          "req": true,
          "short": "Short identifier for the card",
          "type": "`$STRING`"
        },
        {
          "name": "suit",
          "short": "Suit of the card (for Minor Arcana)",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "Numeric value or rank of the card",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "suit",
                    "orig": "suit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/cards",
              "parts": [
                "api",
                "v1",
                "cards"
              ],
              "select": {
                "exist": [
                  "arcana",
                  "suit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.cards`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/cards/{nameShort}",
              "parts": [
                "api",
                "v1",
                "cards",
                "{id}"
              ],
              "rename": {
                "param": {
                  "nameShort": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "n",
                    "orig": "n",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/cards/random",
              "parts": [
                "api",
                "v1",
                "cards",
                "random"
              ],
              "select": {
                "$action": "random",
                "exist": [
                  "n"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

