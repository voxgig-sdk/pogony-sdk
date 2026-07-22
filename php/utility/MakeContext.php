<?php
declare(strict_types=1);

// Pogony SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PogonyMakeContext
{
    public static function call(array $ctxmap, ?PogonyContext $basectx): PogonyContext
    {
        return new PogonyContext($ctxmap, $basectx);
    }
}
