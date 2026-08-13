// Typed models for the TarotCardMeanings SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Card {
  arcana: string
  desc?: string
  meaningRev?: string
  meaningUp?: string
  name: string
  nameShort: string
  suit?: string
  value?: string
}

export interface CardLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardListMatch {
  arcana?: string
  desc?: string
  meaningRev?: string
  meaningUp?: string
  name?: string
  nameShort?: string
  suit?: string
  value?: string
}

