<?php
declare(strict_types=1);

// Pogony SDK utility: result_body

class PogonyResultBody
{
    public static function call(PogonyContext $ctx): ?PogonyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
