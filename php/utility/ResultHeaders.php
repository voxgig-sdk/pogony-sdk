<?php
declare(strict_types=1);

// Pogony SDK utility: result_headers

class PogonyResultHeaders
{
    public static function call(PogonyContext $ctx): ?PogonyResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
