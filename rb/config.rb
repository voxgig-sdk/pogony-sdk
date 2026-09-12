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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "List of crimes committed",
              "type" => "`$ARRAY`",
            },
            {
              "format" => "date",
              "name" => "date",
              "short" => "Date of the incident or when the crime was reported",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Detailed description of the crimes and incidents",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the criminal record",
              "type" => "`$STRING`",
            },
            {
              "name" => "location",
              "short" => "Location where the crimes took place",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the officer",
              "type" => "`$STRING`",
            },
            {
              "name" => "rank",
              "short" => "Military rank of the officer",
              "type" => "`$STRING`",
            },
            {
              "name" => "unit",
              "short" => "Military unit or division",
              "type" => "`$STRING`",
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
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "criminals",
                  ],
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
