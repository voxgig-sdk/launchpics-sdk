package voxgiglaunchpicssdk

import (
	"github.com/voxgig-sdk/launchpics-sdk/go/core"
	"github.com/voxgig-sdk/launchpics-sdk/go/entity"
	"github.com/voxgig-sdk/launchpics-sdk/go/feature"
	_ "github.com/voxgig-sdk/launchpics-sdk/go/utility"
)

// Type aliases preserve external API.
type LaunchpicsSDK = core.LaunchpicsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LaunchpicsEntity = core.LaunchpicsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LaunchpicsError = core.LaunchpicsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAiProcessingEntityFunc = func(client *core.LaunchpicsSDK, entopts map[string]any) core.LaunchpicsEntity {
		return entity.NewAiProcessingEntity(client, entopts)
	}
	core.NewHealthEntityFunc = func(client *core.LaunchpicsSDK, entopts map[string]any) core.LaunchpicsEntity {
		return entity.NewHealthEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.LaunchpicsSDK, entopts map[string]any) core.LaunchpicsEntity {
		return entity.NewImageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLaunchpicsSDK = core.NewLaunchpicsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLaunchpicsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LaunchpicsSDK  { return NewLaunchpicsSDK(nil) }
func Test() *LaunchpicsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
