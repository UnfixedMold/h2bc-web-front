// Centralized Tailwind-like breakpoints
// Mirrors Tailwind CSS default screens (v4): sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px
export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export type ScreenKey = keyof typeof screens
