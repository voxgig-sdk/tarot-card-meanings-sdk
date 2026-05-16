<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: result_body

class TarotCardMeaningsResultBody
{
    public static function call(TarotCardMeaningsContext $ctx): ?TarotCardMeaningsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
