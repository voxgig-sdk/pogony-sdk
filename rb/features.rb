# Pogony SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PogonyFeatures
  def self.make_feature(name)
    case name
    when "base"
      PogonyBaseFeature.new
    when "ratelimit"
      PogonyRatelimitFeature.new
    when "retry"
      PogonyRetryFeature.new
    when "test"
      PogonyTestFeature.new
    when "timeout"
      PogonyTimeoutFeature.new
    else
      PogonyBaseFeature.new
    end
  end
end
