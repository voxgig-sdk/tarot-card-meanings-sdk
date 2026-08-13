# TarotCardMeanings SDK utility: make_context

from tarotcardmeanings_sdk.core.context import TarotCardMeaningsContext


def make_context_util(ctxmap, basectx):
    return TarotCardMeaningsContext(ctxmap, basectx)
