# Launchpics SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LaunchpicsUtility.registrar = ->(u) {
  u.clean = LaunchpicsUtilities::Clean
  u.done = LaunchpicsUtilities::Done
  u.make_error = LaunchpicsUtilities::MakeError
  u.feature_add = LaunchpicsUtilities::FeatureAdd
  u.feature_hook = LaunchpicsUtilities::FeatureHook
  u.feature_init = LaunchpicsUtilities::FeatureInit
  u.fetcher = LaunchpicsUtilities::Fetcher
  u.make_fetch_def = LaunchpicsUtilities::MakeFetchDef
  u.make_context = LaunchpicsUtilities::MakeContext
  u.make_options = LaunchpicsUtilities::MakeOptions
  u.make_request = LaunchpicsUtilities::MakeRequest
  u.make_response = LaunchpicsUtilities::MakeResponse
  u.make_result = LaunchpicsUtilities::MakeResult
  u.make_point = LaunchpicsUtilities::MakePoint
  u.make_spec = LaunchpicsUtilities::MakeSpec
  u.make_url = LaunchpicsUtilities::MakeUrl
  u.param = LaunchpicsUtilities::Param
  u.prepare_auth = LaunchpicsUtilities::PrepareAuth
  u.prepare_body = LaunchpicsUtilities::PrepareBody
  u.prepare_headers = LaunchpicsUtilities::PrepareHeaders
  u.prepare_method = LaunchpicsUtilities::PrepareMethod
  u.prepare_params = LaunchpicsUtilities::PrepareParams
  u.prepare_path = LaunchpicsUtilities::PreparePath
  u.prepare_query = LaunchpicsUtilities::PrepareQuery
  u.graphql_body = LaunchpicsUtilities::GraphqlBody
  u.graphql_errors = LaunchpicsUtilities::GraphqlErrors
  u.result_basic = LaunchpicsUtilities::ResultBasic
  u.result_body = LaunchpicsUtilities::ResultBody
  u.result_headers = LaunchpicsUtilities::ResultHeaders
  u.transform_request = LaunchpicsUtilities::TransformRequest
  u.transform_response = LaunchpicsUtilities::TransformResponse
}
