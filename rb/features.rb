# Launchpics SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LaunchpicsFeatures
  def self.make_feature(name)
    case name
    when "base"
      LaunchpicsBaseFeature.new
    when "test"
      LaunchpicsTestFeature.new
    else
      LaunchpicsBaseFeature.new
    end
  end
end
