# Pogony SDK utility registration
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

PogonyUtility.registrar = ->(u) {
  u.clean = PogonyUtilities::Clean
  u.done = PogonyUtilities::Done
  u.make_error = PogonyUtilities::MakeError
  u.feature_add = PogonyUtilities::FeatureAdd
  u.feature_hook = PogonyUtilities::FeatureHook
  u.feature_init = PogonyUtilities::FeatureInit
  u.fetcher = PogonyUtilities::Fetcher
  u.make_fetch_def = PogonyUtilities::MakeFetchDef
  u.make_context = PogonyUtilities::MakeContext
  u.make_options = PogonyUtilities::MakeOptions
  u.make_request = PogonyUtilities::MakeRequest
  u.make_response = PogonyUtilities::MakeResponse
  u.make_result = PogonyUtilities::MakeResult
  u.make_point = PogonyUtilities::MakePoint
  u.make_spec = PogonyUtilities::MakeSpec
  u.make_url = PogonyUtilities::MakeUrl
  u.param = PogonyUtilities::Param
  u.prepare_auth = PogonyUtilities::PrepareAuth
  u.prepare_body = PogonyUtilities::PrepareBody
  u.prepare_headers = PogonyUtilities::PrepareHeaders
  u.prepare_method = PogonyUtilities::PrepareMethod
  u.prepare_params = PogonyUtilities::PrepareParams
  u.prepare_path = PogonyUtilities::PreparePath
  u.prepare_query = PogonyUtilities::PrepareQuery
  u.graphql_body = PogonyUtilities::GraphqlBody
  u.graphql_errors = PogonyUtilities::GraphqlErrors
  u.result_basic = PogonyUtilities::ResultBasic
  u.result_body = PogonyUtilities::ResultBody
  u.result_headers = PogonyUtilities::ResultHeaders
  u.transform_request = PogonyUtilities::TransformRequest
  u.transform_response = PogonyUtilities::TransformResponse
}
