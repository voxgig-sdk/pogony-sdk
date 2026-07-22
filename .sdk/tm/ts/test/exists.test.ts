
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PogonySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PogonySDK.test()
    equal(null !== testsdk, true)
  })

})
