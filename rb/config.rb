# Pogony SDK configuration

module PogonyConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Pogony",
        "slug" => "pogony",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://pogony.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "criminal" => {},
        },
      },
      "entity" => {
        "criminal" => {
          "fields" => [
            {
              "name" => "crimes",
              "title" => "Crimes",
              "type" => "`$ARRAY`",
              "short" => "List of crimes committed",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "short" => "Date of the incident or when the crime was reported",
              "format" => "date",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Detailed description of the crimes and incidents",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the criminal record",
            },
            {
              "name" => "location",
              "title" => "Location",
              "type" => "`$STRING`",
              "short" => "Location where the crimes took place",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the officer",
            },
            {
              "name" => "rank",
              "title" => "Rank",
              "type" => "`$STRING`",
              "short" => "Military rank of the officer",
            },
            {
              "name" => "unit",
              "title" => "Unit",
              "type" => "`$STRING`",
              "short" => "Military unit or division",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "criminal",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/criminals",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "criminals",
                    },
                  ],
                  "parts" => [
                    "api",
                    "criminals",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PogonyFeatures.make_feature(name)
  end
end
