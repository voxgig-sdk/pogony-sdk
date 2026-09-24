
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PogonySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PogonySDK.test()
    equal(testsdk instanceof PogonySDK, true,
      'PogonySDK.test() must return a client synchronously')
  })

})
