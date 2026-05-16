<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: feature_hook

class TarotCardMeaningsFeatureHook
{
    public static function call(TarotCardMeaningsContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
