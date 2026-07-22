# Pogony SDK exists test

require "minitest/autorun"
require_relative "../Pogony_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PogonySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
