package = "voxgig-sdk-launchpics"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/launchpics-sdk.git",
  tag = "lua/v0.0.1",
  dir = "launchpics-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the LaunchPics public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/launchpics-sdk",
  issues_url = "https://github.com/voxgig-sdk/launchpics-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "launchpics" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["launchpics_sdk"] = "launchpics_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
