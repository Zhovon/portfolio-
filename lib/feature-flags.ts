/**
 * Zhovon Portfolio 2.0 - Feature Flags Configuration
 * 
 * Controls the rollout of new dynamic features.
 * All features default to opt-in via environment variables.
 * 
 * Usage Pattern:
 * - Import: import { featureFlags } from '@/lib/feature-flags'
 * - Conditional: if (featureFlags.dynamicContent) { ... }
 * - Environment: Set NEXT_PUBLIC_* variables in .env.production
 */

// Default feature flags - all disabled for safety
const defaultFlags = {
  dynamicContent: false,           // Database-driven content vs static fallbacks
  themeSystem: false,              // Light/dark/system theme switching
  personalization: false,          // Returning visitor personalization
  threeDEffects: false,            // WebGL/three.js effects
  realTimeMetrics: false,          // Live GitHub/subscriber metrics
  reducedMotionPreference: false, // Respect prefers-reduced-motion
  newCursorEffects: false,         // Custom cursor trails/glow
  staggeredAnimations: false,      // Staggered entrance animations
  gradientBackgrounds: false,      // Animated gradient backgrounds
}

// Read feature flags from environment variables
// Environment variables take precedence over defaults
const featureFlags: Record<string, boolean> = {
  dynamicContent: process.env.NEXT_PUBLIC_DYNAMIC_CONTENT === 'true',
  themeSystem: process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true',
  personalization: process.env.NEXT_PUBLIC_PERSONALIZATION === 'true',
  threeDEffects: process.env.NEXT_PUBLIC_3D_EFFECTS === 'true',
  realTimeMetrics: process.env.NEXT_PUBLIC_REAL_TIME_METRICS === 'true',
  reducedMotionPreference: process.env.NEXT_PUBLIC_RESPECT_MOTION === 'true',
  newCursorEffects: process.env.NEXT_PUBLIC_CURSOR_EFFECTS === 'true',
  staggeredAnimations: process.env.NEXT_PUBLIC_STAGGERED_ANIMATIONS === 'true',
  gradientBackgrounds: process.env.NEXT_PUBLIC_GRADIENT_BACKGROUNDS === 'true',
}

// Export merged flags (environment overrides defaults)
export const featureFlagsMerged = {
  ...defaultFlags,
  ...featureFlags,
}

// Export individual flags for convenience
export type FeatureFlagKeys = keyof typeof featureFlagsMerged
export type FeatureFlagValue = typeof featureFlagsMerged[keyof typeof featureFlagsMerged]

// Helper function to check if a feature is enabled
export function isFeatureEnabled(flag: FeatureFlagKeys): boolean {
  return featureFlagsMerged[flag]
}

// Helper function to get all enabled features
export function getEnabledFeatures(): FeatureFlagKeys[] {
  return (Object.keys(featureFlagsMerged) as FeatureFlagKeys[])
    .filter(key => Boolean(featureFlagsMerged[key]))
}

// Development logging - show which features are active
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Zhovon Portfolio 2.0 Feature Flags:')
  getEnabledFeatures().forEach(flag => {
    console.log(`  • ${flag}: ${featureFlagsMerged[flag]}`)
  })
  if (getEnabledFeatures().length === 0) {
    console.log('  (No features enabled - using static fallbacks)')
  }
}

export default featureFlagsMerged