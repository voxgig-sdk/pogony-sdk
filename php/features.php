<?php
declare(strict_types=1);

// Pogony SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PogonyFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PogonyBaseFeature();
            case "test":
                return new PogonyTestFeature();
            default:
                return new PogonyBaseFeature();
        }
    }
}
