-- Pogony SDK error

local PogonyError = {}
PogonyError.__index = PogonyError


function PogonyError.new(code, msg, ctx)
  local self = setmetatable({}, PogonyError)
  self.is_sdk_error = true
  self.sdk = "Pogony"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PogonyError:error()
  return self.msg
end


function PogonyError:__tostring()
  return self.msg
end


return PogonyError
