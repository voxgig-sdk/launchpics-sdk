<?php
declare(strict_types=1);

// Launchpics SDK utility: prepare_body

class LaunchpicsPrepareBody
{
    public static function call(LaunchpicsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
