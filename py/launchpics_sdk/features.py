# Launchpics SDK feature factory

from launchpics_sdk.feature.base_feature import LaunchpicsBaseFeature
from launchpics_sdk.feature.test_feature import LaunchpicsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LaunchpicsBaseFeature(),
        "test": lambda: LaunchpicsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
