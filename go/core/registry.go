package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAiProcessingEntityFunc func(client *LaunchpicsSDK, entopts map[string]any) LaunchpicsEntity

var NewHealthEntityFunc func(client *LaunchpicsSDK, entopts map[string]any) LaunchpicsEntity

var NewImageEntityFunc func(client *LaunchpicsSDK, entopts map[string]any) LaunchpicsEntity

