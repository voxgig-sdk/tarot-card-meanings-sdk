<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: result_headers

class TarotCardMeaningsResultHeaders
{
    public static function call(TarotCardMeaningsContext $ctx): ?TarotCardMeaningsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
