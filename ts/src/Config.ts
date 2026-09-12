
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Pogony',
        slug: "pogony",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://pogony.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      criminal: {
      },

    }
  }


  entity = {
    "criminal": {
      "fields": [
        {
          "name": "crimes",
          "short": "List of crimes committed",
          "type": "`$ARRAY`"
        },
        {
          "format": "date",
          "name": "date",
          "short": "Date of the incident or when the crime was reported",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Detailed description of the crimes and incidents",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the criminal record",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "short": "Location where the crimes took place",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the officer",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "short": "Military rank of the officer",
          "type": "`$STRING`"
        },
        {
          "name": "unit",
          "short": "Military unit or division",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "criminals"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "criminals"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

