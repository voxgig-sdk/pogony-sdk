# Pogony SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PogonyFeatures
  def self.make_feature(name)
    case name
    when "base"
      PogonyBaseFeature.new
    when "test"
      PogonyTestFeature.new
    else
      PogonyBaseFeature.new
    end
  end
end
