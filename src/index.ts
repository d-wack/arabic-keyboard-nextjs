// Main package exports
export { default as ArabicKeyboard } from './components/ArabicKeyboard';
export { default as WordDisplay } from './components/WordDisplay';

// Settings exports
export { SettingsProvider, useSettings, withSettings } from './context/SettingsContext';
export {
  DEFAULT_SETTINGS,
  THEME_PRESETS,
  getStoredSettings,
  saveSettings,
  resetSettings,
  exportSettings,
  importSettings,
  applyThemePreset,
} from './config/defaultSettings';

// Settings utilities
export * from './utils/settingsUtils';

// Export types for TypeScript users
export type { Key, ArabicKeyboardProps } from './components/ArabicKeyboard';
export type { Word, WordDisplayProps } from './components/WordDisplay';
export type {
  KeyboardSettings,
  ThemeSettings,
  ThemeColors,
  LayoutSettings,
  BehaviorSettings,
  SoundSettings,
  KeyboardLayoutSettings,
  MobileSettings,
  AccessibilitySettings,
  TypographySettings,
  DataSettings,
  AdvancedSettings,
} from './config/defaultSettings';
