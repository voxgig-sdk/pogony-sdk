<?php
declare(strict_types=1);

// Typed models for the Pogony SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Criminal entity data model. */
class Criminal
{
    public ?array $crime = null;
    public ?string $date = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $unit = null;
}

/** Request payload for Criminal#list. */
class CriminalListMatch
{
    public ?array $crime = null;
    public ?string $date = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $unit = null;
}

