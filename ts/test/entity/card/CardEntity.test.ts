

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TarotCardMeaningsSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('card hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TarotCardMeaningsSDK.test(offline).Card().stream('list')) { }
    }, /offline/)

    for await (const _item of TarotCardMeaningsSDK.test(offline).Card()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TarotCardMeaningsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Card().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TarotCardMeaningsSDK.test().Card().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TarotCardMeaningsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Card().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Card().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TarotCardMeaningsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Card().list({"arcana":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TAROT_CARD_MEANINGS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arcana":{"a":true,"h":"Arcana","n":"arcana","r":true,"sh":"Type of arcana","t":"`$STRING`","key$":"arcana","index$":0},"desc":{"a":true,"h":"Desc","n":"desc","r":false,"sh":"Description of the card imagery and symbolism","t":"`$STRING`","key$":"desc","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"meaningRev":{"a":true,"h":"Meaning Rev","n":"meaningRev","r":false,"sh":"Divinatory meaning when card is reversed","t":"`$STRING`","key$":"meaningRev","index$":3},"meaningUp":{"a":true,"h":"Meaning Up","n":"meaningUp","r":false,"sh":"Divinatory meaning when card is upright","t":"`$STRING`","key$":"meaningUp","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Full name of the tarot card","t":"`$STRING`","key$":"name","index$":5},"nameShort":{"a":true,"h":"Name Short","n":"nameShort","r":true,"sh":"Short identifier for the card","t":"`$STRING`","key$":"nameShort","index$":6},"suit":{"a":true,"h":"Suit","n":"suit","r":false,"sh":"Suit of the card (for Minor Arcana)","t":"`$STRING`","key$":"suit","index$":7},"value":{"a":true,"h":"Value","n":"value","r":false,"sh":"Numeric value or rank of the card","t":"`$STRING`","key$":"value","index$":8}},"id":{"field":"id","name":"id"},"name":"card","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/cards","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"arcana","or":"arcana","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"suit","or":"suit","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/cards","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"}],"t":{"req":"`reqdata`","res":"`body.cards`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/cards/{nameShort}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"ar01","k":"param","n":"id","or":"nameShort","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/cards/{nameShort}","q":{"exist":["id"]},"r":{"param":{"nameShort":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/cards/random","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"n","or":"n","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/cards/random","q":{"$action":"random"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"cards"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":0}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"card_ref01","srcdatavar":"card_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_ref01"}}],"index$":1}]}, 'Card', {"GET /api/v1/cards":{"protocol":"http","parameters":[{"name":"suit","in":"query","description":"Filter cards by suit (cups, pentacles, swords, wands, major)","required":false,"schema":{"type":"string","enum":["cups","pentacles","swords","wands","major"]},"index$":0},{"name":"arcana","in":"query","description":"Filter cards by arcana type","required":false,"schema":{"type":"string","enum":["major","minor"]},"index$":1}]},"GET /api/v1/cards/{nameShort}":{"protocol":"http","parameters":[{"name":"nameShort","in":"path","description":"Short name of the tarot card (e.g., 'ar01', 'wa02', 'cu10')","required":true,"schema":{"type":"string"},"example":"ar01","index$":0}]},"GET /api/v1/cards/random":{"protocol":"http","parameters":[{"name":"n","in":"query","description":"Number of random cards to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":78,"default":1},"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
