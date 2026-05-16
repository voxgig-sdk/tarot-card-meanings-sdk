<?php
declare(strict_types=1);

// TarotCardMeanings SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TarotCardMeaningsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TarotCardMeaningsBaseFeature();
            case "test":
                return new TarotCardMeaningsTestFeature();
            default:
                return new TarotCardMeaningsBaseFeature();
        }
    }
}
