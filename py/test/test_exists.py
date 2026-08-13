# Pogony SDK exists test

import pytest
from pogony_sdk import PogonySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PogonySDK.test(None, None)
        assert testsdk is not None
