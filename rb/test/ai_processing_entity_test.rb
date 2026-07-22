# AiProcessing entity test

require "minitest/autorun"
require "json"
require_relative "../Launchpics_sdk"
require_relative "runner"

class AiProcessingEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LaunchpicsSDK.test(nil, nil)
    ent = testsdk.AiProcessing(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ai_processing_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ai_processing." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LAUNCHPICS_TEST_AI_PROCESSING_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    ai_processing_ref01_ent = client.AiProcessing(nil)
    ai_processing_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.ai_processing"), "ai_processing_ref01"))

    ai_processing_ref01_data_result = ai_processing_ref01_ent.create(ai_processing_ref01_data, nil)
    ai_processing_ref01_data = Helpers.to_map(ai_processing_ref01_data_result)
    assert !ai_processing_ref01_data.nil?

  end
end

def ai_processing_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ai_processing", "AiProcessingTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LaunchpicsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ai_processing01", "ai_processing02", "ai_processing03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LAUNCHPICS_TEST_AI_PROCESSING_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LAUNCHPICS_TEST_AI_PROCESSING_ENTID" => idmap,
    "LAUNCHPICS_TEST_LIVE" => "FALSE",
    "LAUNCHPICS_TEST_EXPLAIN" => "FALSE",
    "LAUNCHPICS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LAUNCHPICS_TEST_AI_PROCESSING_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LAUNCHPICS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LAUNCHPICS_APIKEY"],
      },
      extra || {},
    ])
    client = LaunchpicsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LAUNCHPICS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LAUNCHPICS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
