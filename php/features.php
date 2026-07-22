<?php
declare(strict_types=1);

// Launchpics SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LaunchpicsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LaunchpicsBaseFeature();
            case "test":
                return new LaunchpicsTestFeature();
            default:
                return new LaunchpicsBaseFeature();
        }
    }
}
