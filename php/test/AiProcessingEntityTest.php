<?php
declare(strict_types=1);

// AiProcessing entity test

require_once __DIR__ . '/../launchpics_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AiProcessingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LaunchpicsSDK::test(null, null);
        $ent = $testsdk->AiProcessing(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ai_processing_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ai_processing." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LAUNCHPICS_TEST_AI_PROCESSING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $ai_processing_ref01_ent = $client->AiProcessing(null);
        $ai_processing_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.ai_processing"), "ai_processing_ref01"));

        $ai_processing_ref01_data_result = $ai_processing_ref01_ent->create($ai_processing_ref01_data, null);
        $ai_processing_ref01_data = Helpers::to_map(is_object($ai_processing_ref01_data_result) && method_exists($ai_processing_ref01_data_result, 'data_get') ? $ai_processing_ref01_data_result->data_get() : $ai_processing_ref01_data_result);
        $this->assertNotNull($ai_processing_ref01_data);

    }
}

function ai_processing_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ai_processing/AiProcessingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LaunchpicsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ai_processing01", "ai_processing02", "ai_processing03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LAUNCHPICS_TEST_AI_PROCESSING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LAUNCHPICS_TEST_AI_PROCESSING_ENTID" => $idmap,
        "LAUNCHPICS_TEST_LIVE" => "FALSE",
        "LAUNCHPICS_TEST_EXPLAIN" => "FALSE",
        "LAUNCHPICS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LAUNCHPICS_TEST_AI_PROCESSING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LAUNCHPICS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LAUNCHPICS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new LaunchpicsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LAUNCHPICS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LAUNCHPICS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
