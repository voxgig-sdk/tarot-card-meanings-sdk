// Typed models for the TarotCardMeanings SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Card {
  arcana: string
  desc?: string
  meaning_rev?: string
  meaning_up?: string
  name: string
  name_short: string
  suit?: string
  value?: string
}

export interface CardLoadMatch {
  id: string
}

export type CardListMatch = Partial<Card>

