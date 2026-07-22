<?php
declare(strict_types=1);

// Pogony SDK base feature

class PogonyBaseFeature
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

    public function init(PogonyContext $ctx, array $options): void {}
    public function PostConstruct(PogonyContext $ctx): void {}
    public function PostConstructEntity(PogonyContext $ctx): void {}
    public function SetData(PogonyContext $ctx): void {}
    public function GetData(PogonyContext $ctx): void {}
    public function GetMatch(PogonyContext $ctx): void {}
    public function SetMatch(PogonyContext $ctx): void {}
    public function PrePoint(PogonyContext $ctx): void {}
    public function PreSpec(PogonyContext $ctx): void {}
    public function PreRequest(PogonyContext $ctx): void {}
    public function PreResponse(PogonyContext $ctx): void {}
    public function PreResult(PogonyContext $ctx): void {}
    public function PreDone(PogonyContext $ctx): void {}
    public function PreUnexpected(PogonyContext $ctx): void {}
}
