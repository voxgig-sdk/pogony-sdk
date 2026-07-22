# Pogony SDK feature factory

from feature.base_feature import PogonyBaseFeature
from feature.test_feature import PogonyTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PogonyBaseFeature(),
        "test": lambda: PogonyTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
