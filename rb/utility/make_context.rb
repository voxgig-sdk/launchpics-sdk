# Launchpics SDK utility: make_context
require_relative '../core/context'
module LaunchpicsUtilities
  MakeContext = ->(ctxmap, basectx) {
    LaunchpicsContext.new(ctxmap, basectx)
  }
end
