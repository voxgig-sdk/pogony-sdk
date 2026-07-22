<?php
declare(strict_types=1);

// Pogony SDK utility: prepare_body

class PogonyPrepareBody
{
    public static function call(PogonyContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
