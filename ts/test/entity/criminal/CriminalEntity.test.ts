

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PogonySDK, BaseFeature, stdutil } from '../../..'

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


describe('CriminalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POGONY_TEST_LIVE=TRUE.
  afterEach(liveDelay('POGONY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PogonySDK.test()
    const ent = testsdk.Criminal()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POGONY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'criminal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"crimes","req":false,"short":"List of crimes committed","type":"`$ARRAY`","index$":0},{"active":true,"format":"date","name":"date","req":false,"short":"Date of the incident or when the crime was reported","type":"`$STRING`","index$":1},{"active":true,"name":"description","req":false,"short":"Detailed description of the crimes and incidents","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the criminal record","type":"`$STRING`","index$":3},{"active":true,"name":"location","req":false,"short":"Location where the crimes took place","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the officer","type":"`$STRING`","index$":5},{"active":true,"name":"rank","req":false,"short":"Military rank of the officer","type":"`$STRING`","index$":6},{"active":true,"name":"unit","req":false,"short":"Military unit or division","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"criminal","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/criminals","json":"{\"operationId\":\"getCriminalsList\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Information about an officer who has committed crimes\",\"properties\":{\"crimes\":{\"description\":\"List of crimes committed\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"date\":{\"description\":\"Date of the incident or when the crime was reported\",\"format\":\"date\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the crimes and incidents\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the criminal record\",\"type\":\"string\"},\"location\":{\"description\":\"Location where the crimes took place\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the officer\",\"type\":\"string\"},\"rank\":{\"description\":\"Military rank of the officer\",\"type\":\"string\"},\"unit\":{\"description\":\"Military unit or division\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of criminals\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/criminals","segments":[{"lit":"api"},{"lit":"criminals"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"criminal","name__orig":"criminal","Name":"Criminal","name_":"criminal","name-":"criminal","NAME":"CRIMINAL","index$":0}, {"active":true,"entity":"criminal","key$":"BasicCriminalFlow","kind":"basic","name":"BasicCriminalFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"criminal_ref01"}}],"index$":0}]}, 'Criminal')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let criminal_ref01_data = Object.values(setup.data.existing.criminal)[0] as any

    // LIST
    const criminal_ref01_ent = client.Criminal()
    const criminal_ref01_match: any = {}

    const criminal_ref01_list = (await criminal_ref01_ent.list(criminal_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/criminal/CriminalTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PogonySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['criminal01','criminal02','criminal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POGONY_TEST_CRIMINAL_ENTID': idmap,
    'POGONY_TEST_LIVE': 'FALSE',
    'POGONY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POGONY_TEST_CRIMINAL_ENTID']

  const live = 'TRUE' === env.POGONY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POGONY_TEST_CRIMINAL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PogonySDK(merge([
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
    explain: 'TRUE' === env.POGONY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
