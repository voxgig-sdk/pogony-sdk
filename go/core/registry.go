package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCriminalEntityFunc func(client *PogonySDK, entopts map[string]any) PogonyEntity

