// Typed models for the Launchpics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AiProcessing {
  image_id: string
  instruction: string
  processed_image_id?: string
  success?: boolean
  url?: string
}

export interface AiProcessingCreateData {
  image_id: string
  instruction: string
  processed_image_id?: string
  success?: boolean
  url?: string
}

export interface Health {
  status?: string
  timestamp?: string
}

export interface HealthLoadMatch {
  status?: string
  timestamp?: string
}

export interface Image {
  id?: string
  success?: boolean
  url?: string
}

export interface ImageLoadMatch {
  id: string
}

export interface ImageCreateData {
  id?: string
  success?: boolean
  url?: string
}

export interface ImageRemoveMatch {
  id: string
}

