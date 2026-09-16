# Pogony SDK feature factory

from pogony_sdk.feature.base_feature import PogonyBaseFeature
from pogony_sdk.feature.ratelimit_feature import PogonyRatelimitFeature
from pogony_sdk.feature.retry_feature import PogonyRetryFeature
from pogony_sdk.feature.test_feature import PogonyTestFeature
from pogony_sdk.feature.timeout_feature import PogonyTimeoutFeature


_FEATURES = {
    "base": lambda: PogonyBaseFeature(),
    "ratelimit": lambda: PogonyRatelimitFeature(),
    "retry": lambda: PogonyRetryFeature(),
    "test": lambda: PogonyTestFeature(),
    "timeout": lambda: PogonyTimeoutFeature(),
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
