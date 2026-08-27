-- Pogony SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Pogony",
      slug = "pogony",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://pogony.org",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["criminal"] = {},
      },
    },
    entity = {
      ["criminal"] = {
        ["fields"] = {
          {
            ["name"] = "crimes",
            ["short"] = "List of crimes committed",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "date",
            ["short"] = "Date of the incident or when the crime was reported",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Detailed description of the crimes and incidents",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the criminal record",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "location",
            ["short"] = "Location where the crimes took place",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the officer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rank",
            ["short"] = "Military rank of the officer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unit",
            ["short"] = "Military unit or division",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "criminal",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/criminals",
                ["parts"] = {
                  "api",
                  "criminals",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
