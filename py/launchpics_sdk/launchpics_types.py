# Typed models for the Launchpics SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AiProcessingRequired(TypedDict):
    imageId: str
    instruction: str


class AiProcessing(AiProcessingRequired, total=False):
    processedImageId: str
    success: bool
    url: str


class AiProcessingCreateDataRequired(TypedDict):
    imageId: str
    instruction: str


class AiProcessingCreateData(AiProcessingCreateDataRequired, total=False):
    processedImageId: str
    success: bool
    url: str


class Health(TypedDict, total=False):
    status: str
    timestamp: str


class HealthLoadMatch(TypedDict, total=False):
    status: str
    timestamp: str


class Image(TypedDict, total=False):
    id: str
    success: bool
    url: str


class ImageLoadMatch(TypedDict):
    id: str


class ImageCreateData(TypedDict, total=False):
    id: str
    success: bool
    url: str


class ImageRemoveMatch(TypedDict):
    id: str
