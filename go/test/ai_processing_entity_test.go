package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/launchpics-sdk/go"
	"github.com/voxgig-sdk/launchpics-sdk/go/core"

	vs "github.com/voxgig-sdk/launchpics-sdk/go/utility/struct"
)

func TestAiProcessingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AiProcessing(nil)
		if ent == nil {
			t.Fatal("expected non-nil AiProcessingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ai_processingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ai_processing." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LAUNCHPICS_TEST_AI_PROCESSING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		aiProcessingRef01Ent := client.AiProcessing(nil)
		aiProcessingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "ai_processing"}, setup.data), "ai_processing_ref01"))

		aiProcessingRef01DataResult, err := aiProcessingRef01Ent.Create(aiProcessingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		aiProcessingRef01Data = core.ToMapAny(aiProcessingRef01DataResult)
		if aiProcessingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func ai_processingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ai_processing", "AiProcessingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ai_processing test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ai_processing test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ai_processing01", "ai_processing02", "ai_processing03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LAUNCHPICS_TEST_AI_PROCESSING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LAUNCHPICS_TEST_AI_PROCESSING_ENTID": idmap,
		"LAUNCHPICS_TEST_LIVE":      "FALSE",
		"LAUNCHPICS_TEST_EXPLAIN":   "FALSE",
		"LAUNCHPICS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LAUNCHPICS_TEST_AI_PROCESSING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LAUNCHPICS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LAUNCHPICS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLaunchpicsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LAUNCHPICS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LAUNCHPICS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
