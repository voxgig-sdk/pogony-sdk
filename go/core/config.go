package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Pogony",
			"slug": "pogony",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://pogony.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"criminal": map[string]any{},
			},
		},
		"entity": map[string]any{
			"criminal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "crimes",
						"short": "List of crimes committed",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date",
						"name": "date",
						"short": "Date of the incident or when the crime was reported",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the crimes and incidents",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the criminal record",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Location where the crimes took place",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the officer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Military rank of the officer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit",
						"short": "Military unit or division",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "criminal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/criminals",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "criminals",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"criminals",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
