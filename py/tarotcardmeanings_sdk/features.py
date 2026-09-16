# TarotCardMeanings SDK feature factory

from tarotcardmeanings_sdk.feature.base_feature import TarotCardMeaningsBaseFeature
from tarotcardmeanings_sdk.feature.ratelimit_feature import TarotCardMeaningsRatelimitFeature
from tarotcardmeanings_sdk.feature.retry_feature import TarotCardMeaningsRetryFeature
from tarotcardmeanings_sdk.feature.test_feature import TarotCardMeaningsTestFeature
from tarotcardmeanings_sdk.feature.timeout_feature import TarotCardMeaningsTimeoutFeature


_FEATURES = {
    "base": lambda: TarotCardMeaningsBaseFeature(),
    "ratelimit": lambda: TarotCardMeaningsRatelimitFeature(),
    "retry": lambda: TarotCardMeaningsRetryFeature(),
    "test": lambda: TarotCardMeaningsTestFeature(),
    "timeout": lambda: TarotCardMeaningsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
