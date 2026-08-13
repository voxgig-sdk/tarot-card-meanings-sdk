# TarotCardMeanings SDK exists test

import pytest
from tarotcardmeanings_sdk import TarotCardMeaningsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TarotCardMeaningsSDK.test(None, None)
        assert testsdk is not None
