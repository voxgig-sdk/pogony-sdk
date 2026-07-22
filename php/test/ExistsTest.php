<?php
declare(strict_types=1);

// Pogony SDK exists test

require_once __DIR__ . '/../pogony_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PogonySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
