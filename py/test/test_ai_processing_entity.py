# AiProcessing entity test

import json
import os
import time

import pytest

from launchpics_sdk.utility.voxgig_struct import voxgig_struct as vs
from launchpics_sdk import LaunchpicsSDK
from launchpics_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAiProcessingEntity:

    def test_should_create_instance(self):
        testsdk = LaunchpicsSDK.test(None, None)
        ent = testsdk.AiProcessing(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _ai_processing_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "ai_processing." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LAUNCHPICS_TEST_AI_PROCESSING_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        ai_processing_ref01_ent = client.AiProcessing(None)
        ai_processing_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.ai_processing"), "ai_processing_ref01"))

        ai_processing_ref01_data = helpers.to_map(runner.entity_data(ai_processing_ref01_ent.create(ai_processing_ref01_data, None)))
        assert ai_processing_ref01_data is not None



def _ai_processing_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/ai_processing/AiProcessingTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LaunchpicsSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["ai_processing01", "ai_processing02", "ai_processing03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LAUNCHPICS_TEST_AI_PROCESSING_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LAUNCHPICS_TEST_AI_PROCESSING_ENTID": idmap,
        "LAUNCHPICS_TEST_LIVE": "FALSE",
        "LAUNCHPICS_TEST_EXPLAIN": "FALSE",
        "LAUNCHPICS_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LAUNCHPICS_TEST_AI_PROCESSING_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LAUNCHPICS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("LAUNCHPICS_APIKEY"),
            },
            extra or {},
        ])
        client = LaunchpicsSDK(helpers.to_map(merged_opts))

    _live = env.get("LAUNCHPICS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LAUNCHPICS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
