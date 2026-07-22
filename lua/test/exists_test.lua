-- Launchpics SDK exists test

local sdk = require("launchpics_sdk")

describe("LaunchpicsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
