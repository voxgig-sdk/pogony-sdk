# Pogony SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Pogony",
            "slug": "pogony",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://pogony.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "criminal": {},
            },
        },
        "entity": {
      "criminal": {
        "fields": [
          {
            "name": "crimes",
            "title": "Crimes",
            "type": "`$ARRAY`",
            "short": "List of crimes committed",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "Date of the incident or when the crime was reported",
            "format": "date",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Detailed description of the crimes and incidents",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the criminal record",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
            "short": "Location where the crimes took place",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the officer",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$STRING`",
            "short": "Military rank of the officer",
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "short": "Military unit or division",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "criminal",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/criminals",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "criminals",
                  },
                ],
                "parts": [
                  "api",
                  "criminals",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
