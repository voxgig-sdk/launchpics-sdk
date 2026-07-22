<?php
declare(strict_types=1);

// Launchpics SDK utility: result_headers

class LaunchpicsResultHeaders
{
    public static function call(LaunchpicsContext $ctx): ?LaunchpicsResult
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
