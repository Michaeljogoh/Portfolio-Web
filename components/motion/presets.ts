export const EASE_OUT = [0.20, 1, 0.3, 1] as const;
export const EASE_IN = [0.9, 0, 1, 1] as const;

export const DURATION = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  hero: 0.65,
  scroll: 0.45,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
} as const;

export const slideUpOnScroll = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

export const slideFromRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
} as const;

export const slideFromLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
} as const;

export const staggerContainer = (stagger = 0.08, delayChildren = 0.04) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const defaultTransition = {
  duration: DURATION.normal,
  ease: EASE_OUT,
} as const;

export const ROUTE_ORDER = [
  "/",
  "/projects",
  "/skills",
  "/experience",
  "/certifications",
  "/contact",
] as const;

export function getRouteDirection(
  from: string,
  to: string,
): "forward" | "backward" | "neutral" {
  const fromIndex = ROUTE_ORDER.indexOf(from as (typeof ROUTE_ORDER)[number]);
  const toIndex = ROUTE_ORDER.indexOf(to as (typeof ROUTE_ORDER)[number]);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return "neutral";
  }

  return toIndex > fromIndex ? "forward" : "backward";
}
