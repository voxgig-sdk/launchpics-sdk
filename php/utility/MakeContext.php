<?php
declare(strict_types=1);

// Launchpics SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LaunchpicsMakeContext
{
    public static function call(array $ctxmap, ?LaunchpicsContext $basectx): LaunchpicsContext
    {
        return new LaunchpicsContext($ctxmap, $basectx);
    }
}
