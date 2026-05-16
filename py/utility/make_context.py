# TarotCardMeanings SDK utility: make_context

from core.context import TarotCardMeaningsContext


def make_context_util(ctxmap, basectx):
    return TarotCardMeaningsContext(ctxmap, basectx)
