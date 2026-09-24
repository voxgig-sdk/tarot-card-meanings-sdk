
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TarotCardMeaningsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TarotCardMeaningsSDK.test()
    equal(testsdk instanceof TarotCardMeaningsSDK, true,
      'TarotCardMeaningsSDK.test() must return a client synchronously')
  })

})
