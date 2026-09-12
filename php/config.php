<?php
declare(strict_types=1);

// Launchpics SDK configuration

class LaunchpicsConfig
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
                "name" => "Launchpics",
                "slug" => "launchpics",
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
                "base" => "https://launch.pics/api",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "ai_processing" => [],
                    "health" => [],
                    "image" => [],
                ],
            ],
            "entity" => [
        'ai_processing' => [
          'fields' => [
            [
              'name' => 'imageId',
              'req' => true,
              'short' => 'ID of the image to process',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'instruction',
              'req' => true,
              'short' => 'Plain English description of desired edits',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'processedImageId',
              'short' => 'ID of the newly processed image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'URL to access the processed image',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'ai_processing',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/process',
                  'segments' => [
                    [
                      'lit' => 'process',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'process',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'health' => [
          'fields' => [
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'timestamp',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'health',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/health',
                  'segments' => [
                    [
                      'lit' => 'health',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'health',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'image' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Unique identifier for the uploaded image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'Unique URL to access the uploaded image',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'image',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/upload',
                  'segments' => [
                    [
                      'lit' => 'upload',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'upload',
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
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'image_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'height',
                        'orig' => 'height',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'width',
                        'orig' => 'width',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images/{imageId}',
                  'rename' => [
                    'param' => [
                      'imageId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'images',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'height',
                      'id',
                      'width',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'images',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'image_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/images/{imageId}',
                  'rename' => [
                    'param' => [
                      'imageId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'images',
                    ],
                    [
                      'var' => 'id',
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
                  'parts' => [
                    'images',
                    '{id}',
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
        return LaunchpicsFeatures::make_feature($name);
    }
}
