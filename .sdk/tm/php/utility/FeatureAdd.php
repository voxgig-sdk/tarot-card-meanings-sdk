<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: feature_add

class TarotCardMeaningsFeatureAdd
{
    public static function call(TarotCardMeaningsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
