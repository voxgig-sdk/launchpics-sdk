// Typed models for the Launchpics SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// AiProcessing is the typed data model for the ai_processing entity.
type AiProcessing struct {
	ImageId string `json:"image_id"`
	Instruction string `json:"instruction"`
	ProcessedImageId *string `json:"processed_image_id,omitempty"`
	Success *bool `json:"success,omitempty"`
	Url *string `json:"url,omitempty"`
}

// AiProcessingCreateData is the typed request payload for AiProcessing.CreateTyped.
type AiProcessingCreateData struct {
	ImageId string `json:"image_id"`
	Instruction string `json:"instruction"`
	ProcessedImageId *string `json:"processed_image_id,omitempty"`
	Success *bool `json:"success,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Health is the typed data model for the health entity.
type Health struct {
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// HealthLoadMatch is the typed request payload for Health.LoadTyped.
type HealthLoadMatch struct {
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// Image is the typed data model for the image entity.
type Image struct {
	Id *string `json:"id,omitempty"`
	Success *bool `json:"success,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ImageLoadMatch is the typed request payload for Image.LoadTyped.
type ImageLoadMatch struct {
	Id string `json:"id"`
}

// ImageCreateData is the typed request payload for Image.CreateTyped.
type ImageCreateData struct {
	Id *string `json:"id,omitempty"`
	Success *bool `json:"success,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ImageRemoveMatch is the typed request payload for Image.RemoveTyped.
type ImageRemoveMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
