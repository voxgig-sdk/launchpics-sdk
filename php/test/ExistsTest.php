<?php
declare(strict_types=1);

// Launchpics SDK exists test

require_once __DIR__ . '/../launchpics_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LaunchpicsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
