package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCardEntityFunc func(client *TarotCardMeaningsSDK, entopts map[string]any) TarotCardMeaningsEntity

