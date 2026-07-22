
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { LaunchpicsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCHPICS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCHPICS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchpicsSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCHPICS_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LAUNCHPICS_TEST_IMAGE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const image_ref01_ent = client.Image()
    let image_ref01_data = setup.data.new.image['image_ref01']

    image_ref01_data = await image_ref01_ent.create(image_ref01_data)
    assert(null != image_ref01_data.id)


    // LOAD
    const image_ref01_match_dt0: any = {}
    image_ref01_match_dt0.id = image_ref01_data.id
    const image_ref01_data_dt0 = await image_ref01_ent.load(image_ref01_match_dt0)
    assert(image_ref01_data_dt0.id === image_ref01_data.id)


    // REMOVE
    const image_ref01_match_rm0: any = { id: image_ref01_data.id }
    await image_ref01_ent.remove(image_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/image/ImageTestData.json')

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
    ['image01','image02','image03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LAUNCHPICS_TEST_IMAGE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LAUNCHPICS_TEST_IMAGE_ENTID': idmap,
    'LAUNCHPICS_TEST_LIVE': 'FALSE',
    'LAUNCHPICS_TEST_EXPLAIN': 'FALSE',
    'LAUNCHPICS_APIKEY': 'NONE',
  })

  idmap = env['LAUNCHPICS_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.LAUNCHPICS_TEST_LIVE

  if (live) {
    client = new LaunchpicsSDK(merge([
      {
        apikey: env.LAUNCHPICS_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
