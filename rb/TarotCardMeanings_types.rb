# frozen_string_literal: true

# Typed models for the TarotCardMeanings SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Card entity data model.
#
# @!attribute [rw] arcana
#   @return [String]
#
# @!attribute [rw] desc
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] meaningRev
#   @return [String, nil]
#
# @!attribute [rw] meaningUp
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] nameShort
#   @return [String]
#
# @!attribute [rw] suit
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
Card = Struct.new(
  :arcana,
  :desc,
  :id,
  :meaningRev,
  :meaningUp,
  :name,
  :nameShort,
  :suit,
  :value,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
CardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] arcana
#   @return [String, nil]
#
# @!attribute [rw] suit
#   @return [String, nil]
CardListMatch = Struct.new(
  :arcana,
  :suit,
  keyword_init: true
)

