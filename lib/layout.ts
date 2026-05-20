/**
 * Site horizontal layout — full viewport width with `Container` `px-safe` inset only
 * (same as the home page). No `max-w-7xl` cap so content aligns edge-to-edge with safe margins.
 */

/** Page sections: full width + flex growth in the site layout. */
export const SITE_CONTENT_CLASS = "w-full max-w-none flex-1";

/** Header, footer, and in-page blocks that should match the same horizontal band. */
export const SITE_INSET_CLASS = "w-full max-w-none";
