import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "card",
    "accessor": "Card",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/cards",
    "args": [],
    "select": {
      "arcana": "v1",
      "suit": "v1"
    },
    "headers": [],
    "query": [
      "suit",
      "arcana"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "cards": [
        {
          "arcana": "Major Arcana",
          "desc": "A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.",
          "meaningRev": "Physician, Magus, mental disease, disgrace, disquiet.",
          "meaningUp": "Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.",
          "name": "The Magician",
          "nameShort": "ar01",
          "suit": "major",
          "value": "1"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "card",
    "accessor": "Card",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/cards/{nameShort}",
    "args": [
      {
        "name": "id",
        "wire": "nameShort",
        "value": "ar01"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "The Magician",
      "nameShort": "ar01",
      "value": "1",
      "arcana": "Major Arcana",
      "suit": "major",
      "desc": "A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.",
      "meaningUp": "Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.",
      "meaningRev": "Physician, Magus, mental disease, disgrace, disquiet."
    },
    "idField": "id"
  },
  {
    "entity": "card",
    "accessor": "Card",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/cards/random",
    "action": "random",
    "args": [],
    "select": {
      "n": "v1"
    },
    "headers": [],
    "query": [
      "n"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "name": "The Magician",
      "nameShort": "ar01",
      "value": "1",
      "arcana": "Major Arcana",
      "suit": "major",
      "desc": "A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.",
      "meaningUp": "Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.",
      "meaningRev": "Physician, Magus, mental disease, disgrace, disquiet."
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
