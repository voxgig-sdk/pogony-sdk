

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"crimes":{"a":true,"h":"Crimes","n":"crimes","r":false,"sh":"List of crimes committed","t":"`$ARRAY`","key$":"crimes","index$":0},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Date of the incident or when the crime was reported","t":"`$STRING`","key$":"date","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the crimes and incidents","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the criminal record","t":"`$STRING`","key$":"id","index$":3},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location where the crimes took place","t":"`$STRING`","key$":"location","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the officer","t":"`$STRING`","key$":"name","index$":5},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Military rank of the officer","t":"`$STRING`","key$":"rank","index$":6},"unit":{"a":true,"h":"Unit","n":"unit","r":false,"sh":"Military unit or division","t":"`$STRING`","key$":"unit","index$":7}},"id":{"field":"id","name":"id"},"name":"criminal","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/criminals","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/criminals","q":{},"r":{},"s":[{"lit":"api"},{"lit":"criminals"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"criminal","name__orig":"criminal","Name":"Criminal","name_":"criminal","name-":"criminal","NAME":"CRIMINAL","index$":0}, {"active":true,"entity":"criminal","key$":"BasicCriminalFlow","kind":"basic","name":"BasicCriminalFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"criminal_ref01"}}],"index$":0}]}, 'Criminal', {"GET /api/criminals":{"protocol":"http","operationId":"getCriminalsList","responses":{"200":{"description":"Successful response with list of criminals","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Information about an officer who has committed crimes","properties":{"id":{"type":"string","description":"Unique identifier for the criminal record","key$":"id"},"name":{"type":"string","description":"Name of the officer","key$":"name"},"rank":{"type":"string","description":"Military rank of the officer","key$":"rank"},"unit":{"type":"string","description":"Military unit or division","key$":"unit"},"crimes":{"type":"array","description":"List of crimes committed","items":{"type":"string"},"key$":"crimes"},"description":{"type":"string","description":"Detailed description of the crimes and incidents","key$":"description"},"date":{"type":"string","format":"date","description":"Date of the incident or when the crime was reported","key$":"date"},"location":{"type":"string","description":"Location where the crimes took place","key$":"location"}},"x-ref":"#/components/schemas/Criminal","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
