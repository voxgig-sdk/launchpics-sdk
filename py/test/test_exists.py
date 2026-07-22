# ProjectName SDK exists test

import pytest
from launchpics_sdk import LaunchpicsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LaunchpicsSDK.test(None, None)
        assert testsdk is not None
