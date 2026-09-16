# Launchpics SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LaunchpicsFeatures
  def self.make_feature(name)
    case name
    when "base"
      LaunchpicsBaseFeature.new
    when "ratelimit"
      LaunchpicsRatelimitFeature.new
    when "retry"
      LaunchpicsRetryFeature.new
    when "test"
      LaunchpicsTestFeature.new
    when "timeout"
      LaunchpicsTimeoutFeature.new
    else
      LaunchpicsBaseFeature.new
    end
  end
end
