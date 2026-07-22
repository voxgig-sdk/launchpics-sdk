# Launchpics SDK exists test

require "minitest/autorun"
require_relative "../Launchpics_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LaunchpicsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
