# Launchpics SDK feature factory

from feature.base_feature import LaunchpicsBaseFeature
from feature.test_feature import LaunchpicsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LaunchpicsBaseFeature(),
        "test": lambda: LaunchpicsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
