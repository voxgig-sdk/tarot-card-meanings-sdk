<?php
declare(strict_types=1);

// TarotCardMeanings SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TarotCardMeaningsMakeContext
{
    public static function call(array $ctxmap, ?TarotCardMeaningsContext $basectx): TarotCardMeaningsContext
    {
        return new TarotCardMeaningsContext($ctxmap, $basectx);
    }
}
