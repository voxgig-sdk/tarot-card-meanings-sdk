package voxgigtarotcardmeaningssdk

import (
	"github.com/voxgig-sdk/tarot-card-meanings-sdk/go/core"
	"github.com/voxgig-sdk/tarot-card-meanings-sdk/go/entity"
	"github.com/voxgig-sdk/tarot-card-meanings-sdk/go/feature"
	_ "github.com/voxgig-sdk/tarot-card-meanings-sdk/go/utility"
)

// Type aliases preserve external API.
type TarotCardMeaningsSDK = core.TarotCardMeaningsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TarotCardMeaningsEntity = core.TarotCardMeaningsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TarotCardMeaningsError = core.TarotCardMeaningsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCardEntityFunc = func(client *core.TarotCardMeaningsSDK, entopts map[string]any) core.TarotCardMeaningsEntity {
		return entity.NewCardEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTarotCardMeaningsSDK = core.NewTarotCardMeaningsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTarotCardMeaningsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TarotCardMeaningsSDK  { return NewTarotCardMeaningsSDK(nil) }
func Test() *TarotCardMeaningsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
