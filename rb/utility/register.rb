# TarotCardMeanings SDK utility registration
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

TarotCardMeaningsUtility.registrar = ->(u) {
  u.clean = TarotCardMeaningsUtilities::Clean
  u.done = TarotCardMeaningsUtilities::Done
  u.make_error = TarotCardMeaningsUtilities::MakeError
  u.feature_add = TarotCardMeaningsUtilities::FeatureAdd
  u.feature_hook = TarotCardMeaningsUtilities::FeatureHook
  u.feature_init = TarotCardMeaningsUtilities::FeatureInit
  u.fetcher = TarotCardMeaningsUtilities::Fetcher
  u.make_fetch_def = TarotCardMeaningsUtilities::MakeFetchDef
  u.make_context = TarotCardMeaningsUtilities::MakeContext
  u.make_options = TarotCardMeaningsUtilities::MakeOptions
  u.make_request = TarotCardMeaningsUtilities::MakeRequest
  u.make_response = TarotCardMeaningsUtilities::MakeResponse
  u.make_result = TarotCardMeaningsUtilities::MakeResult
  u.make_point = TarotCardMeaningsUtilities::MakePoint
  u.make_spec = TarotCardMeaningsUtilities::MakeSpec
  u.make_url = TarotCardMeaningsUtilities::MakeUrl
  u.param = TarotCardMeaningsUtilities::Param
  u.prepare_auth = TarotCardMeaningsUtilities::PrepareAuth
  u.prepare_body = TarotCardMeaningsUtilities::PrepareBody
  u.prepare_headers = TarotCardMeaningsUtilities::PrepareHeaders
  u.prepare_method = TarotCardMeaningsUtilities::PrepareMethod
  u.prepare_params = TarotCardMeaningsUtilities::PrepareParams
  u.prepare_path = TarotCardMeaningsUtilities::PreparePath
  u.prepare_query = TarotCardMeaningsUtilities::PrepareQuery
  u.graphql_body = TarotCardMeaningsUtilities::GraphqlBody
  u.graphql_errors = TarotCardMeaningsUtilities::GraphqlErrors
  u.result_basic = TarotCardMeaningsUtilities::ResultBasic
  u.result_body = TarotCardMeaningsUtilities::ResultBody
  u.result_headers = TarotCardMeaningsUtilities::ResultHeaders
  u.transform_request = TarotCardMeaningsUtilities::TransformRequest
  u.transform_response = TarotCardMeaningsUtilities::TransformResponse
}
