<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: prepare_body

class TarotCardMeaningsPrepareBody
{
    public static function call(TarotCardMeaningsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
