-- Typed models for the Pogony SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Criminal
---@field crimes? table
---@field date? string
---@field description? string
---@field id? string
---@field location? string
---@field name? string
---@field rank? string
---@field unit? string

---@class CriminalListMatch
---@field crimes? table
---@field date? string
---@field description? string
---@field id? string
---@field location? string
---@field name? string
---@field rank? string
---@field unit? string

local M = {}

return M
