<?php
declare(strict_types=1);

// Typed models for the Launchpics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AiProcessing entity data model. */
class AiProcessing
{
    public string $imageId;
    public string $instruction;
    public ?string $processedImageId = null;
    public ?bool $success = null;
    public ?string $url = null;
}

/** Request payload for AiProcessing#create. */
class AiProcessingCreateData
{
    public string $imageId;
    public string $instruction;
    public ?string $processedImageId = null;
    public ?bool $success = null;
    public ?string $url = null;
}

/** Health entity data model. */
class Health
{
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Request payload for Health#load. */
class HealthLoadMatch
{
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Image entity data model. */
class Image
{
    public ?string $id = null;
    public ?bool $success = null;
    public ?string $url = null;
}

/** Request payload for Image#load. */
class ImageLoadMatch
{
    public string $id;
}

/** Request payload for Image#create. */
class ImageCreateData
{
    public ?string $id = null;
    public ?bool $success = null;
    public ?string $url = null;
}

/** Request payload for Image#remove. */
class ImageRemoveMatch
{
    public string $id;
}

