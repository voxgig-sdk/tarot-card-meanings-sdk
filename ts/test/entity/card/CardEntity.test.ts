

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TarotCardMeaningsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TAROT_CARD_MEANINGS_TEST_LIVE=TRUE.
  afterEach(liveDelay('TAROT_CARD_MEANINGS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TarotCardMeaningsSDK.test()
    const ent = testsdk.Card()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TAROT_CARD_MEANINGS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"arcana","req":true,"short":"Type of arcana","type":"`$STRING`","index$":0},{"active":true,"name":"desc","req":false,"short":"Description of the card imagery and symbolism","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"meaningRev","req":false,"short":"Divinatory meaning when card is reversed","type":"`$STRING`","index$":3},{"active":true,"name":"meaningUp","req":false,"short":"Divinatory meaning when card is upright","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":true,"short":"Full name of the tarot card","type":"`$STRING`","index$":5},{"active":true,"name":"nameShort","req":true,"short":"Short identifier for the card","type":"`$STRING`","index$":6},{"active":true,"name":"suit","req":false,"short":"Suit of the card (for Minor Arcana)","type":"`$STRING`","index$":7},{"active":true,"name":"value","req":false,"short":"Numeric value or rank of the card","type":"`$STRING`","index$":8}],"id":{"field":"id","name":"id"},"name":"card","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"arcana","orig":"arcana","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"suit","orig":"suit","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/v1/cards","json":"{\"operationId\":\"getCards\",\"parameters\":[{\"description\":\"Filter cards by suit (cups, pentacles, swords, wands, major)\",\"in\":\"query\",\"name\":\"suit\",\"required\":false,\"schema\":{\"enum\":[\"cups\",\"pentacles\",\"swords\",\"wands\",\"major\"],\"type\":\"string\"}},{\"description\":\"Filter cards by arcana type\",\"in\":\"query\",\"name\":\"arcana\",\"required\":false,\"schema\":{\"enum\":[\"major\",\"minor\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cards\":{\"items\":{\"properties\":{\"arcana\":{\"description\":\"Type of arcana\",\"enum\":[\"Major Arcana\",\"Minor Arcana\"],\"example\":\"Major Arcana\",\"type\":\"string\"},\"desc\":{\"description\":\"Description of the card imagery and symbolism\",\"example\":\"A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.\",\"type\":\"string\"},\"meaningRev\":{\"description\":\"Divinatory meaning when card is reversed\",\"example\":\"Physician, Magus, mental disease, disgrace, disquiet.\",\"type\":\"string\"},\"meaningUp\":{\"description\":\"Divinatory meaning when card is upright\",\"example\":\"Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the tarot card\",\"example\":\"The Magician\",\"type\":\"string\"},\"nameShort\":{\"description\":\"Short identifier for the card\",\"example\":\"ar01\",\"type\":\"string\"},\"suit\":{\"description\":\"Suit of the card (for Minor Arcana)\",\"enum\":[\"cups\",\"pentacles\",\"swords\",\"wands\",\"major\"],\"example\":\"major\",\"type\":\"string\"},\"value\":{\"description\":\"Numeric value or rank of the card\",\"example\":\"1\",\"type\":\"string\"}},\"required\":[\"name\",\"nameShort\",\"arcana\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/cards","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"}],"select":{"exist":["arcana","suit"]},"transform":{"req":"`reqdata`","res":"`body.cards`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"ar01","kind":"param","name":"id","orig":"name_short","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/cards/{nameShort}","json":"{\"operationId\":\"getCardByName\",\"parameters\":[{\"description\":\"Short name of the tarot card (e.g., 'ar01', 'wa02', 'cu10')\",\"example\":\"ar01\",\"in\":\"path\",\"name\":\"nameShort\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"arcana\":{\"description\":\"Type of arcana\",\"enum\":[\"Major Arcana\",\"Minor Arcana\"],\"example\":\"Major Arcana\",\"type\":\"string\"},\"desc\":{\"description\":\"Description of the card imagery and symbolism\",\"example\":\"A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.\",\"type\":\"string\"},\"meaningRev\":{\"description\":\"Divinatory meaning when card is reversed\",\"example\":\"Physician, Magus, mental disease, disgrace, disquiet.\",\"type\":\"string\"},\"meaningUp\":{\"description\":\"Divinatory meaning when card is upright\",\"example\":\"Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the tarot card\",\"example\":\"The Magician\",\"type\":\"string\"},\"nameShort\":{\"description\":\"Short identifier for the card\",\"example\":\"ar01\",\"type\":\"string\"},\"suit\":{\"description\":\"Suit of the card (for Minor Arcana)\",\"enum\":[\"cups\",\"pentacles\",\"swords\",\"wands\",\"major\"],\"example\":\"major\",\"type\":\"string\"},\"value\":{\"description\":\"Numeric value or rank of the card\",\"example\":\"1\",\"type\":\"string\"}},\"required\":[\"name\",\"nameShort\",\"arcana\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Card not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/cards/{nameShort}","rename":{"param":{"nameShort":"id"}},"segments":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"n","orig":"n","reqd":false,"type":"`$INTEGER`"}]},"contract":{"id":"GET /api/v1/cards/random","json":"{\"operationId\":\"getRandomCard\",\"parameters\":[{\"description\":\"Number of random cards to return\",\"in\":\"query\",\"name\":\"n\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":78,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"arcana\":{\"description\":\"Type of arcana\",\"enum\":[\"Major Arcana\",\"Minor Arcana\"],\"example\":\"Major Arcana\",\"type\":\"string\"},\"desc\":{\"description\":\"Description of the card imagery and symbolism\",\"example\":\"A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.\",\"type\":\"string\"},\"meaningRev\":{\"description\":\"Divinatory meaning when card is reversed\",\"example\":\"Physician, Magus, mental disease, disgrace, disquiet.\",\"type\":\"string\"},\"meaningUp\":{\"description\":\"Divinatory meaning when card is upright\",\"example\":\"Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the tarot card\",\"example\":\"The Magician\",\"type\":\"string\"},\"nameShort\":{\"description\":\"Short identifier for the card\",\"example\":\"ar01\",\"type\":\"string\"},\"suit\":{\"description\":\"Suit of the card (for Minor Arcana)\",\"enum\":[\"cups\",\"pentacles\",\"swords\",\"wands\",\"major\"],\"example\":\"major\",\"type\":\"string\"},\"value\":{\"description\":\"Numeric value or rank of the card\",\"example\":\"1\",\"type\":\"string\"}},\"required\":[\"name\",\"nameShort\",\"arcana\"],\"type\":\"object\"},{\"properties\":{\"cards\":{\"items\":{\"properties\":{\"arcana\":{\"description\":\"Type of arcana\",\"enum\":[\"Major Arcana\",\"Minor Arcana\"],\"example\":\"Major Arcana\",\"type\":\"string\"},\"desc\":{\"description\":\"Description of the card imagery and symbolism\",\"example\":\"A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes.\",\"type\":\"string\"},\"meaningRev\":{\"description\":\"Divinatory meaning when card is reversed\",\"example\":\"Physician, Magus, mental disease, disgrace, disquiet.\",\"type\":\"string\"},\"meaningUp\":{\"description\":\"Divinatory meaning when card is upright\",\"example\":\"Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; self-confidence, will; the Querent, if male.\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the tarot card\",\"example\":\"The Magician\",\"type\":\"string\"},\"nameShort\":{\"description\":\"Short identifier for the card\",\"example\":\"ar01\",\"type\":\"string\"},\"suit\":{\"description\":\"Suit of the card (for Minor Arcana)\",\"enum\":[\"cups\",\"pentacles\",\"swords\",\"wands\",\"major\"],\"example\":\"major\",\"type\":\"string\"},\"value\":{\"description\":\"Numeric value or rank of the card\",\"example\":\"1\",\"type\":\"string\"}},\"required\":[\"name\",\"nameShort\",\"arcana\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/cards/random","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"},{"lit":"random"}],"select":{"$action":"random","exist":["n"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":0}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"card_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"card_ref01","srcdatavar":"card_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_ref01"}}],"index$":1}]}, 'Card')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_ref01_data = Object.values(setup.data.existing.card)[0] as any

    // LIST
    const card_ref01_ent = client.Card()
    const card_ref01_match: any = {}

    const card_ref01_list = (await card_ref01_ent.list(card_ref01_match)).map((e: any) => e.data())


    // LOAD
    const card_ref01_match_dt0: any = {}
    card_ref01_match_dt0.id = card_ref01_data.id
    const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data()
    assert(card_ref01_data_dt0.id === card_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card/CardTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TarotCardMeaningsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TAROT_CARD_MEANINGS_TEST_CARD_ENTID': idmap,
    'TAROT_CARD_MEANINGS_TEST_LIVE': 'FALSE',
    'TAROT_CARD_MEANINGS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TAROT_CARD_MEANINGS_TEST_CARD_ENTID']

  const live = 'TRUE' === env.TAROT_CARD_MEANINGS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TAROT_CARD_MEANINGS_TEST_CARD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TarotCardMeaningsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TAROT_CARD_MEANINGS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
