<?php
declare(strict_types=1);

// Launchpics SDK utility: result_body

class LaunchpicsResultBody
{
    public static function call(LaunchpicsContext $ctx): ?LaunchpicsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
