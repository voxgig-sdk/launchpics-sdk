

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LaunchpicsSDK, BaseFeature, stdutil } from '../../..'

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


describe('AiProcessingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCHPICS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCHPICS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchpicsSDK.test()
    const ent = testsdk.AiProcessing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCHPICS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ai_processing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"imageId","req":true,"short":"ID of the image to process","type":"`$STRING`","index$":0},{"active":true,"name":"instruction","req":true,"short":"Plain English description of desired edits","type":"`$STRING`","index$":1},{"active":true,"name":"processedImageId","req":false,"short":"ID of the newly processed image","type":"`$STRING`","index$":2},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to access the processed image","type":"`$STRING`","index$":4}],"name":"ai_processing","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /process","json":"{\"operationId\":\"processImage\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"imageId\":{\"description\":\"ID of the image to process\",\"type\":\"string\"},\"instruction\":{\"description\":\"Plain English description of desired edits\",\"example\":\"Make the background blue and remove the person on the right\",\"type\":\"string\"}},\"required\":[\"imageId\",\"instruction\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"processedImageId\":{\"description\":\"ID of the newly processed image\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"},\"url\":{\"description\":\"URL to access the processed image\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Image processed successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - API key missing or invalid\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/process","segments":[{"lit":"process"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"ai_processing","name__orig":"ai_processing","Name":"AiProcessing","name_":"ai_processing","name-":"ai-processing","NAME":"AI_PROCESSING","index$":0}, {"active":true,"entity":"ai_processing","key$":"BasicAiProcessingFlow","kind":"basic","name":"BasicAiProcessingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ai_processing_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'AiProcessing')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ai_processing_ref01_ent = client.AiProcessing()
    let ai_processing_ref01_data = setup.data.new.ai_processing['ai_processing_ref01']

    ai_processing_ref01_data = (await ai_processing_ref01_ent.create(ai_processing_ref01_data)).data()
    assert(null != ai_processing_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ai_processing/AiProcessingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LaunchpicsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ai_processing01','ai_processing02','ai_processing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCHPICS_TEST_AI_PROCESSING_ENTID': idmap,
    'LAUNCHPICS_TEST_LIVE': 'FALSE',
    'LAUNCHPICS_TEST_EXPLAIN': 'FALSE',
    'LAUNCHPICS_APIKEY': '',
  })

  idmap = env['LAUNCHPICS_TEST_AI_PROCESSING_ENTID']

  const live = 'TRUE' === env.LAUNCHPICS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCHPICS_TEST_AI_PROCESSING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LaunchpicsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LAUNCHPICS_APIKEY,
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
    explain: 'TRUE' === env.LAUNCHPICS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
