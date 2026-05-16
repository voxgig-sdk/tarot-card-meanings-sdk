<?php
declare(strict_types=1);

// TarotCardMeanings SDK exists test

require_once __DIR__ . '/../tarotcardmeanings_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TarotCardMeaningsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
