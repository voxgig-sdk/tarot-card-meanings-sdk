# Typed models for the TarotCardMeanings SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Card:
    arcana: str
    name: str
    name_short: str
    desc: Optional[str] = None
    meaning_rev: Optional[str] = None
    meaning_up: Optional[str] = None
    suit: Optional[str] = None
    value: Optional[str] = None


@dataclass
class CardLoadMatch:
    id: str


@dataclass
class CardListMatch:
    arcana: Optional[str] = None
    desc: Optional[str] = None
    meaning_rev: Optional[str] = None
    meaning_up: Optional[str] = None
    name: Optional[str] = None
    name_short: Optional[str] = None
    suit: Optional[str] = None
    value: Optional[str] = None

