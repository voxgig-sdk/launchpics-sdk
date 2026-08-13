-- Typed models for the Launchpics SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AiProcessing
---@field imageId string
---@field instruction string
---@field processedImageId? string
---@field success? boolean
---@field url? string

---@class AiProcessingCreateData
---@field imageId string
---@field instruction string
---@field processedImageId? string
---@field success? boolean
---@field url? string

---@class Health
---@field status? string
---@field timestamp? string

---@class HealthLoadMatch
---@field status? string
---@field timestamp? string

---@class Image
---@field id? string
---@field success? boolean
---@field url? string

---@class ImageLoadMatch
---@field id string

---@class ImageCreateData
---@field id? string
---@field success? boolean
---@field url? string

---@class ImageRemoveMatch
---@field id string

local M = {}

return M
