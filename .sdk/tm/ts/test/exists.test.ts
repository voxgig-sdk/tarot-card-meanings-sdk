
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TarotCardMeaningsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TarotCardMeaningsSDK.test()
    equal(null !== testsdk, true)
  })

})
