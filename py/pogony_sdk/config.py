# Pogony SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "List of crimes committed",
            "type": "`$ARRAY`",
          },
          {
            "name": "date",
            "short": "Date of the incident or when the crime was reported",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Detailed description of the crimes and incidents",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the criminal record",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "short": "Location where the crimes took place",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Name of the officer",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "short": "Military rank of the officer",
            "type": "`$STRING`",
          },
          {
            "name": "unit",
            "short": "Military unit or division",
            "type": "`$STRING`",
          },
        ],
        "name": "criminal",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/criminals",
                "parts": [
                  "api",
                  "criminals",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
