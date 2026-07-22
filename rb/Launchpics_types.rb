# frozen_string_literal: true

# Typed models for the Launchpics SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AiProcessing entity data model.
#
# @!attribute [rw] image_id
#   @return [String]
#
# @!attribute [rw] instruction
#   @return [String]
#
# @!attribute [rw] processed_image_id
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AiProcessing = Struct.new(
  :image_id,
  :instruction,
  :processed_image_id,
  :success,
  :url,
  keyword_init: true
)

# Request payload for AiProcessing#create.
#
# @!attribute [rw] image_id
#   @return [String]
#
# @!attribute [rw] instruction
#   @return [String]
#
# @!attribute [rw] processed_image_id
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AiProcessingCreateData = Struct.new(
  :image_id,
  :instruction,
  :processed_image_id,
  :success,
  :url,
  keyword_init: true
)

# Health entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
Health = Struct.new(
  :status,
  :timestamp,
  keyword_init: true
)

# Request payload for Health#load.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
HealthLoadMatch = Struct.new(
  :status,
  :timestamp,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Image = Struct.new(
  :id,
  :success,
  :url,
  keyword_init: true
)

# Request payload for Image#load.
#
# @!attribute [rw] id
#   @return [String]
ImageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Image#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ImageCreateData = Struct.new(
  :id,
  :success,
  :url,
  keyword_init: true
)

# Request payload for Image#remove.
#
# @!attribute [rw] id
#   @return [String]
ImageRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

