
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Crimes",
          "type": "`$ARRAY`",
          "short": "List of crimes committed"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "short": "Date of the incident or when the crime was reported",
          "format": "date"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Detailed description of the crimes and incidents"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the criminal record"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$STRING`",
          "short": "Location where the crimes took place"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the officer"
        },
        {
          "name": "rank",
          "title": "Rank",
          "type": "`$STRING`",
          "short": "Military rank of the officer"
        },
        {
          "name": "unit",
          "title": "Unit",
          "type": "`$STRING`",
          "short": "Military unit or division"
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
              "parts": [
                "api",
                "criminals"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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

