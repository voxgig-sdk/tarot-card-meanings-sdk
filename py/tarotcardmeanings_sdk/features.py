# TarotCardMeanings SDK feature factory

from tarotcardmeanings_sdk.feature.base_feature import TarotCardMeaningsBaseFeature
from tarotcardmeanings_sdk.feature.test_feature import TarotCardMeaningsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TarotCardMeaningsBaseFeature(),
        "test": lambda: TarotCardMeaningsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
