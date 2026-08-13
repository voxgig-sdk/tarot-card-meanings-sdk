<?php
declare(strict_types=1);

// Typed models for the TarotCardMeanings SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Card entity data model. */
class Card
{
    public string $arcana;
    public ?string $desc = null;
    public ?string $meaningRev = null;
    public ?string $meaningUp = null;
    public string $name;
    public string $nameShort;
    public ?string $suit = null;
    public ?string $value = null;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Request payload for Card#list. */
class CardListMatch
{
    public ?string $arcana = null;
    public ?string $desc = null;
    public ?string $meaningRev = null;
    public ?string $meaningUp = null;
    public ?string $name = null;
    public ?string $nameShort = null;
    public ?string $suit = null;
    public ?string $value = null;
}

