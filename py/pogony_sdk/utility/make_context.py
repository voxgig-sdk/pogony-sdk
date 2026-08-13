# Pogony SDK utility: make_context

from pogony_sdk.core.context import PogonyContext


def make_context_util(ctxmap, basectx):
    return PogonyContext(ctxmap, basectx)
