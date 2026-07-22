# frozen_string_literal: true

# Typed models for the Pogony SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Criminal entity data model.
#
# @!attribute [rw] crime
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
Criminal = Struct.new(
  :crime,
  :date,
  :description,
  :id,
  :location,
  :name,
  :rank,
  :unit,
  keyword_init: true
)

# Request payload for Criminal#list.
#
# @!attribute [rw] crime
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
CriminalListMatch = Struct.new(
  :crime,
  :date,
  :description,
  :id,
  :location,
  :name,
  :rank,
  :unit,
  keyword_init: true
)

