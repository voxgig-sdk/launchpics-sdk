
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LaunchpicsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LaunchpicsSDK.test()
    equal(null !== testsdk, true)
  })

})
