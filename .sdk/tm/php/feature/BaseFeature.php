<?php
declare(strict_types=1);

// TarotCardMeanings SDK base feature

class TarotCardMeaningsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TarotCardMeaningsContext $ctx, array $options): void {}
    public function PostConstruct(TarotCardMeaningsContext $ctx): void {}
    public function PostConstructEntity(TarotCardMeaningsContext $ctx): void {}
    public function SetData(TarotCardMeaningsContext $ctx): void {}
    public function GetData(TarotCardMeaningsContext $ctx): void {}
    public function GetMatch(TarotCardMeaningsContext $ctx): void {}
    public function SetMatch(TarotCardMeaningsContext $ctx): void {}
    public function PrePoint(TarotCardMeaningsContext $ctx): void {}
    public function PreSpec(TarotCardMeaningsContext $ctx): void {}
    public function PreRequest(TarotCardMeaningsContext $ctx): void {}
    public function PreResponse(TarotCardMeaningsContext $ctx): void {}
    public function PreResult(TarotCardMeaningsContext $ctx): void {}
    public function PreDone(TarotCardMeaningsContext $ctx): void {}
    public function PreUnexpected(TarotCardMeaningsContext $ctx): void {}
}
