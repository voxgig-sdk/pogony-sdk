# Pogony SDK utility: make_context
require_relative '../core/context'
module PogonyUtilities
  MakeContext = ->(ctxmap, basectx) {
    PogonyContext.new(ctxmap, basectx)
  }
end
