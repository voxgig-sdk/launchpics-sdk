<?php
declare(strict_types=1);

// Launchpics SDK base feature

class LaunchpicsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LaunchpicsContext $ctx, array $options): void {}
    public function PostConstruct(LaunchpicsContext $ctx): void {}
    public function PostConstructEntity(LaunchpicsContext $ctx): void {}
    public function SetData(LaunchpicsContext $ctx): void {}
    public function GetData(LaunchpicsContext $ctx): void {}
    public function GetMatch(LaunchpicsContext $ctx): void {}
    public function SetMatch(LaunchpicsContext $ctx): void {}
    public function PrePoint(LaunchpicsContext $ctx): void {}
    public function PreSpec(LaunchpicsContext $ctx): void {}
    public function PreRequest(LaunchpicsContext $ctx): void {}
    public function PreResponse(LaunchpicsContext $ctx): void {}
    public function PreResult(LaunchpicsContext $ctx): void {}
    public function PreDone(LaunchpicsContext $ctx): void {}
    public function PreUnexpected(LaunchpicsContext $ctx): void {}
}
