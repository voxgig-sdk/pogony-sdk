<?php
declare(strict_types=1);

// Pogony SDK configuration

class PogonyConfig
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
                "name" => "Pogony",
                "slug" => "pogony",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://pogony.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "criminal" => [],
                ],
            ],
            "entity" => [
        'criminal' => [
          'fields' => [
            [
              'name' => 'crimes',
              'short' => 'List of crimes committed',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'date',
              'short' => 'Date of the incident or when the crime was reported',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the crimes and incidents',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the criminal record',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'short' => 'Location where the crimes took place',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the officer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'short' => 'Military rank of the officer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unit',
              'short' => 'Military unit or division',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'criminal',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/criminals',
                  'parts' => [
                    'api',
                    'criminals',
                  ],
                  'select' => [],
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
        return PogonyFeatures::make_feature($name);
    }
}
