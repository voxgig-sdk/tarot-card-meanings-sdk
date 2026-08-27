<?php
declare(strict_types=1);

// TarotCardMeanings SDK configuration

class TarotCardMeaningsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TarotCardMeanings",
                "slug" => "tarot-card-meanings",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://tarot-api-3hv5.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "card" => [],
                ],
            ],
            "entity" => [
        'card' => [
          'fields' => [
            [
              'name' => 'arcana',
              'req' => true,
              'short' => 'Type of arcana',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'desc',
              'short' => 'Description of the card imagery and symbolism',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meaningRev',
              'short' => 'Divinatory meaning when card is reversed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'meaningUp',
              'short' => 'Divinatory meaning when card is upright',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Full name of the tarot card',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nameShort',
              'req' => true,
              'short' => 'Short identifier for the card',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'suit',
              'short' => 'Suit of the card (for Minor Arcana)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'short' => 'Numeric value or rank of the card',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'card',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'arcana',
                        'orig' => 'arcana',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'suit',
                        'orig' => 'suit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/cards',
                  'parts' => [
                    'api',
                    'v1',
                    'cards',
                  ],
                  'select' => [
                    'exist' => [
                      'arcana',
                      'suit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.cards`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'ar01',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'name_short',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/cards/{nameShort}',
                  'parts' => [
                    'api',
                    'v1',
                    'cards',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'nameShort' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'n',
                        'orig' => 'n',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/cards/random',
                  'parts' => [
                    'api',
                    'v1',
                    'cards',
                    'random',
                  ],
                  'select' => [
                    '$action' => 'random',
                    'exist' => [
                      'n',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TarotCardMeaningsFeatures::make_feature($name);
    }
}
