-- Typed models for the TarotCardMeanings SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Card
---@field arcana string
---@field desc? string
---@field meaning_rev? string
---@field meaning_up? string
---@field name string
---@field name_short string
---@field suit? string
---@field value? string

---@class CardLoadMatch
---@field id string

---@class CardListMatch

local M = {}

return M
