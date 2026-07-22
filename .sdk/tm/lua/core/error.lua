-- Launchpics SDK error

local LaunchpicsError = {}
LaunchpicsError.__index = LaunchpicsError


function LaunchpicsError.new(code, msg, ctx)
  local self = setmetatable({}, LaunchpicsError)
  self.is_sdk_error = true
  self.sdk = "Launchpics"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LaunchpicsError:error()
  return self.msg
end


function LaunchpicsError:__tostring()
  return self.msg
end


return LaunchpicsError
