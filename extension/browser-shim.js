/**
 * Cross-browser shim.
 * Chrome/Edge/Opera expose `chrome.*`.
 * Firefox exposes `browser.*` (Promise-based) and also mirrors `chrome.*`.
 * This file normalises to a single `ext` global usable in both contexts.
 */
const ext = (typeof browser !== 'undefined') ? browser : chrome
