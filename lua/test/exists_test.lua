-- Pogony SDK exists test

local sdk = require("pogony_sdk")

describe("PogonySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
