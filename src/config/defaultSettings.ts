/**
 * Default Keyboard Settings Configuration
 * 
 * This file defines all configurable settings for the Arabic Keyboard.
 * User preferences override these defaults and are stored in localStorage.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface ThemeColors {
  // Keyboard Container
  keyboardBackground: string;
  keyboardBorder: string;
  
  // Regular Keys
  regularKeyBackground: string;
  regularKeyBackgroundHover: string;
  regularKeyText: string;
  
  // Number Keys
  numberKeyBackground: string;
  numberKeyBackgroundHover: string;
  numberKeyText: string;
  
  // Tashkeel Keys
  tashkeelKeyBackground: string;
  tashkeelKeyBackgroundHover: string;
  tashkeelKeyText: string;
  
  // Special Keys
  backspaceKeyBackground: string;
  backspaceKeyBackgroundHover: string;
  enterKeyBackground: string;
  enterKeyBackgroundHover: string;
  spaceKeyBackground: string;
  spaceKeyBackgroundHover: string;
  clearKeyBackground: string;
  clearKeyBackgroundHover: string;
  
  // Modifier Keys
  ctrlKeyBackground: string;
  ctrlKeyBackgroundHover: string;
  ctrlKeyBackgroundActive: string;
  shiftKeyBackground: string;
  shiftKeyBackgroundHover: string;
  shiftKeyBackgroundActive: string;
  altKeyBackground: string;
  altKeyBackgroundHover: string;
  
  // Alif Variants (Ctrl pressed)
  alifVariantKeyBackground: string;
  alifVariantKeyBackgroundHover: string;
  
  // Open/Close Buttons
  openButtonBackground: string;
  openButtonBackgroundHover: string;
  closeButtonBackground: string;
  closeButtonBackgroundHover: string;
  buttonText: string;
  
  // Text Input Area
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;
  inputText: string;
  inputPlaceholder: string;
  
  // Key Text Colors (fallbacks)
  specialKeyText: string;
}

export interface ThemeSettings {
  preset: 'dark' | 'light' | 'high-contrast' | 'colorful' | 'minimal' | 'custom';
  colors: ThemeColors;
}

export interface LayoutSettings {
  // Keyboard Size
  scale: 'small' | 'medium' | 'large' | 'xl' | 'custom';
  customWidth?: number; // pixels
  
  // Key Dimensions
  keySize: 'compact' | 'normal' | 'large' | 'touch-optimized';
  keySpacing: 'none' | 'tight' | 'normal' | 'loose' | 'wide';
  rowSpacing: 'tight' | 'normal' | 'loose';
  
  // Position
  position: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right' | 'floating';
  floatingPosition?: { x: number; y: number }; // pixels from top-left
  
  // Visual Effects
  hoverEffect: 'none' | 'small' | 'medium' | 'large';
  keyShadow: 'none' | 'small' | 'medium' | 'large';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'xl';
  
  // Animations
  slideAnimation: boolean;
  slideAnimationDuration: number; // milliseconds
  slideAnimationType: 'slide' | 'fade' | 'scale' | 'none';
  keyPressAnimation: 'none' | 'ripple' | 'scale-down' | 'glow' | 'all';
  
  // Z-Index
  zIndexOverlay: number;
  zIndexKeyboard: number;
  zIndexButton: number;
  
  // Full Screen (mobile)
  fullScreenMobile: boolean;
}

export interface BehaviorSettings {
  // Auto Hide/Show
  autoHideOnBlur: boolean;
  autoHideDelay: number; // milliseconds
  autoShowOnFocus: boolean;
  hideOnWordComplete: boolean;
  clickOutsideToClose: boolean;
  
  // Modifier Keys
  shiftAutoReset: boolean;
  shiftToggleMode: boolean;
  ctrlAutoReset: boolean;
  ctrlToggleMode: boolean;
  stickyKeys: boolean;
  
  // Text Input
  clearOnSubmit: boolean;
  spaceKeyAction: 'insert-space' | 'complete-word' | 'both';
  autoCapitalize: boolean;
  maxTextLength: number; // 0 = unlimited
  
  // Textarea
  textareaRows: number;
  textareaAutoExpand: boolean;
  textareaResize: 'none' | 'vertical' | 'horizontal' | 'both';
  placeholderText: string;
  textDirection: 'rtl' | 'ltr' | 'auto';
}

export interface SoundSettings {
  // Sound Effects
  soundEnabled: boolean; // Master sound toggle
  masterVolume: number; // 0-100, applies to all sounds
  
  clickSoundEnabled: boolean;
  clickSoundVolume: number; // 0-100
  
  openCloseSoundEnabled: boolean;
  openCloseSoundVolume: number; // 0-100
  
  // Haptic Feedback (mobile)
  hapticFeedback: boolean;
  hapticKeyPress: 'none' | 'light' | 'medium' | 'strong';
  hapticKeyPressDuration: number; // milliseconds
  hapticOpenClose: 'none' | 'light' | 'medium';
}

export interface KeyboardLayoutSettings {
  // Layout Type
  layout: 'KBDA1' | 'KBDA2' | 'AZERTY' | 'QWERTY' | 'custom';
  customLayout?: any; // Custom layout definition
  
  // Layout Switching
  enableLayoutSwitching: boolean;
  
  // Physical Keyboard
  enablePhysicalKeyboard: boolean;
  physicalKeyMapping: 'phonetic' | 'positional' | 'custom';
  showKeyboardOnPhysicalKey: boolean;
  
  // Key Visibility
  showTashkeelKeys: 'always' | 'shift-only' | 'hidden';
  showNumbers: boolean;
  showEnglishCharacters: 'none' | 'symbols-only' | 'full';
  showAlifVariants: boolean;
}

export interface MobileSettings {
  // Touch
  touchFeedback: 'none' | 'highlight' | 'scale' | 'both';
  touchAreaPadding: 'none' | 'small' | 'medium' | 'large';
  longPressAction: 'none' | 'show-alt-chars' | 'context-menu' | 'copy-key';
  longPressDuration: number; // milliseconds
  
  // Gestures
  swipeToHide: boolean;
  swipeDirection: 'down' | 'up' | 'left' | 'right';
  pinchToResize: boolean;
}

export interface AccessibilitySettings {
  // Screen Reader
  ariaLabels: 'full' | 'partial' | 'none';
  announceKeyPresses: boolean;
  
  // Keyboard Navigation
  tabNavigation: boolean;
  arrowKeyNavigation: boolean;
  focusIndicator: 'none' | 'default' | 'enhanced' | 'custom';
  focusIndicatorColor?: string;
  
  // High Contrast
  autoDetectHighContrast: boolean;
  forceHighContrast: boolean;
  
  // Font Scaling
  respectSystemFontSize: boolean;
  minimumFontSize: number; // pixels
}

export interface TypographySettings {
  // Font
  fontFamily: 'Amiri' | 'Noto Sans Arabic' | 'Scheherazade New' | 'Traditional Arabic' | 'custom';
  customFontFamily?: string;
  customFontUrl?: string;
  
  // Sizes
  keyFontSize: 'small' | 'medium' | 'large' | 'xl' | 'custom';
  keyFontSizeCustom?: number; // pixels
  inputFontSize: 'small' | 'medium' | 'large' | 'xl' | 'custom';
  inputFontSizeCustom?: number; // pixels
  
  // Weight
  keyFontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  specialKeyFontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface DataSettings {
  // Persistence
  saveLocation: 'localStorage' | 'sessionStorage' | 'none';
  autoSave: boolean;
  
  // Text History
  saveTypedWords: boolean;
  maxHistoryItems: number;
  wordSuggestionsFromHistory: boolean;
  
  // Privacy
  clearHistoryOnExit: boolean;
  clearHistoryAfterDays: number; // 0 = never
}

export interface AdvancedSettings {
  // Performance
  animationPerformance: 'high' | 'balanced' | 'performance' | 'none';
  debounceKeyPress: boolean;
  debounceDelay: number; // milliseconds
  
  // Developer
  debugMode: boolean;
  logEvents: boolean;
  showPerformanceMetrics: boolean;
  
  // Custom CSS
  customCssClasses: boolean;
  customCssOverrides?: string;
}

// ============================================================================
// Main Settings Interface
// ============================================================================

export interface KeyboardSettings {
  version: string; // Settings schema version
  theme: ThemeSettings;
  layout: LayoutSettings;
  behavior: BehaviorSettings;
  sound: SoundSettings;
  keyboardLayout: KeyboardLayoutSettings;
  mobile: MobileSettings;
  accessibility: AccessibilitySettings;
  typography: TypographySettings;
  data: DataSettings;
  advanced: AdvancedSettings;
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_SETTINGS: KeyboardSettings = {
  version: '1.0.0',
  
  // Theme Settings
  theme: {
    preset: 'dark',
    colors: {
      // Keyboard Container
      keyboardBackground: '#334155', // slate-700
      keyboardBorder: '#1e293b', // slate-800
      
      // Regular Keys
      regularKeyBackground: '#475569', // slate-600
      regularKeyBackgroundHover: '#64748b', // slate-500
      regularKeyText: '#ffffff',
      
      // Number Keys
      numberKeyBackground: '#3b82f6', // blue-500
      numberKeyBackgroundHover: '#2563eb', // blue-600
      numberKeyText: '#ffffff',
      
      // Tashkeel Keys
      tashkeelKeyBackground: '#9ca3af', // gray-400
      tashkeelKeyBackgroundHover: '#6b7280', // gray-500
      tashkeelKeyText: '#1f2937', // gray-800
      
      // Special Keys
      backspaceKeyBackground: '#eab308', // yellow-500
      backspaceKeyBackgroundHover: '#ca8a04', // yellow-600
      enterKeyBackground: '#22c55e', // green-500
      enterKeyBackgroundHover: '#16a34a', // green-600
      spaceKeyBackground: '#3b82f6', // blue-500
      spaceKeyBackgroundHover: '#2563eb', // blue-600
      clearKeyBackground: '#f97316', // orange-500
      clearKeyBackgroundHover: '#ea580c', // orange-600
      
      // Modifier Keys
      ctrlKeyBackground: '#a855f7', // purple-500
      ctrlKeyBackgroundHover: '#9333ea', // purple-600
      ctrlKeyBackgroundActive: '#7c3aed', // purple-600
      shiftKeyBackground: '#3b82f6', // blue-500
      shiftKeyBackgroundHover: '#2563eb', // blue-600
      shiftKeyBackgroundActive: '#1d4ed8', // blue-700
      altKeyBackground: '#6b7280', // gray-500
      altKeyBackgroundHover: '#4b5563', // gray-600
      
      // Alif Variants
      alifVariantKeyBackground: '#a855f7', // purple-500
      alifVariantKeyBackgroundHover: '#9333ea', // purple-600
      
      // Open/Close Buttons
      openButtonBackground: '#2563eb', // blue-600
      openButtonBackgroundHover: '#1d4ed8', // blue-700
      closeButtonBackground: '#3b82f6', // blue-500
      closeButtonBackgroundHover: '#2563eb', // blue-600
      buttonText: '#ffffff',
      
      // Text Input
      inputBackground: '#ffffff',
      inputBorder: '#e5e7eb', // gray-200
      inputBorderFocused: '#3b82f6', // blue-500
      inputText: '#000000',
      inputPlaceholder: '#9ca3af', // gray-400
      
      // Fallback Text Colors
      specialKeyText: '#ffffff',
    },
  },
  
  // Layout Settings
  layout: {
    scale: 'small',
    customWidth: undefined,
    
    keySize: 'normal',
    keySpacing: 'normal',
    rowSpacing: 'normal',
    
    position: 'bottom-center',
    floatingPosition: undefined,
    
    hoverEffect: 'medium',
    keyShadow: 'large',
    borderRadius: 'medium',
    
    slideAnimation: true,
    slideAnimationDuration: 500,
    slideAnimationType: 'slide',
    keyPressAnimation: 'none',
    
    zIndexOverlay: 30,
    zIndexKeyboard: 40,
    zIndexButton: 50,
    
    fullScreenMobile: false,
  },
  
  // Behavior Settings
  behavior: {
    autoHideOnBlur: false,
    autoHideDelay: 200,
    autoShowOnFocus: false,
    hideOnWordComplete: false,
    clickOutsideToClose: true,
    
    shiftAutoReset: true,
    shiftToggleMode: false,
    ctrlAutoReset: true,
    ctrlToggleMode: false,
    stickyKeys: false,
    
    clearOnSubmit: true,
    spaceKeyAction: 'insert-space',
    autoCapitalize: false,
    maxTextLength: 0,
    
    textareaRows: 1,
    textareaAutoExpand: false,
    textareaResize: 'none',
    placeholderText: 'اكتب هنا...',
    textDirection: 'rtl',
  },
  
  // Sound Settings
  sound: {
    soundEnabled: true,
    masterVolume: 80,
    
    clickSoundEnabled: true,
    clickSoundVolume: 40,
    
    openCloseSoundEnabled: true,
    openCloseSoundVolume: 70,
    
    hapticFeedback: false,
    hapticKeyPress: 'none',
    hapticKeyPressDuration: 10,
    hapticOpenClose: 'none',
  },
  
  // Keyboard Layout Settings
  keyboardLayout: {
    layout: 'KBDA1',
    customLayout: undefined,
    
    enableLayoutSwitching: false,
    
    enablePhysicalKeyboard: false,
    physicalKeyMapping: 'positional',
    showKeyboardOnPhysicalKey: true,
    
    showTashkeelKeys: 'shift-only',
    showNumbers: true,
    showEnglishCharacters: 'symbols-only',
    showAlifVariants: true,
  },
  
  // Mobile Settings
  mobile: {
    touchFeedback: 'both',
    touchAreaPadding: 'medium',
    longPressAction: 'none',
    longPressDuration: 500,
    
    swipeToHide: false,
    swipeDirection: 'down',
    pinchToResize: false,
  },
  
  // Accessibility Settings
  accessibility: {
    ariaLabels: 'full',
    announceKeyPresses: false,
    
    tabNavigation: true,
    arrowKeyNavigation: true,
    focusIndicator: 'enhanced',
    focusIndicatorColor: '#3b82f6',
    
    autoDetectHighContrast: true,
    forceHighContrast: false,
    
    respectSystemFontSize: false,
    minimumFontSize: 14,
  },
  
  // Typography Settings
  typography: {
    fontFamily: 'Amiri',
    customFontFamily: undefined,
    customFontUrl: undefined,
    
    keyFontSize: 'large',
    keyFontSizeCustom: undefined,
    inputFontSize: 'xl',
    inputFontSizeCustom: undefined,
    
    keyFontWeight: 'medium',
    specialKeyFontWeight: 'bold',
  },
  
  // Data Settings
  data: {
    saveLocation: 'localStorage',
    autoSave: true,
    
    saveTypedWords: false,
    maxHistoryItems: 100,
    wordSuggestionsFromHistory: false,
    
    clearHistoryOnExit: false,
    clearHistoryAfterDays: 30,
  },
  
  // Advanced Settings
  advanced: {
    animationPerformance: 'high',
    debounceKeyPress: false,
    debounceDelay: 0,
    
    debugMode: false,
    logEvents: false,
    showPerformanceMetrics: false,
    
    customCssClasses: false,
    customCssOverrides: undefined,
  },
};

// ============================================================================
// Theme Presets
// ============================================================================

export const THEME_PRESETS: Record<string, ThemeColors> = {
  dark: DEFAULT_SETTINGS.theme.colors,
  
  light: {
    keyboardBackground: '#f1f5f9', // slate-100
    keyboardBorder: '#e2e8f0', // slate-200
    
    regularKeyBackground: '#ffffff',
    regularKeyBackgroundHover: '#e2e8f0', // slate-200
    regularKeyText: '#1e293b', // slate-800
    
    numberKeyBackground: '#dbeafe', // blue-100
    numberKeyBackgroundHover: '#bfdbfe', // blue-200
    numberKeyText: '#1e40af', // blue-800
    
    tashkeelKeyBackground: '#f3f4f6', // gray-100
    tashkeelKeyBackgroundHover: '#e5e7eb', // gray-200
    tashkeelKeyText: '#1f2937', // gray-800
    
    backspaceKeyBackground: '#fef3c7', // yellow-100
    backspaceKeyBackgroundHover: '#fde68a', // yellow-200
    enterKeyBackground: '#d1fae5', // green-100
    enterKeyBackgroundHover: '#a7f3d0', // green-200
    spaceKeyBackground: '#dbeafe', // blue-100
    spaceKeyBackgroundHover: '#bfdbfe', // blue-200
    clearKeyBackground: '#fed7aa', // orange-100
    clearKeyBackgroundHover: '#fdba74', // orange-200
    
    ctrlKeyBackground: '#f3e8ff', // purple-100
    ctrlKeyBackgroundHover: '#e9d5ff', // purple-200
    ctrlKeyBackgroundActive: '#d8b4fe', // purple-300
    shiftKeyBackground: '#dbeafe', // blue-100
    shiftKeyBackgroundHover: '#bfdbfe', // blue-200
    shiftKeyBackgroundActive: '#93c5fd', // blue-300
    altKeyBackground: '#f3f4f6', // gray-100
    altKeyBackgroundHover: '#e5e7eb', // gray-200
    
    alifVariantKeyBackground: '#f3e8ff', // purple-100
    alifVariantKeyBackgroundHover: '#e9d5ff', // purple-200
    
    openButtonBackground: '#3b82f6', // blue-500
    openButtonBackgroundHover: '#2563eb', // blue-600
    closeButtonBackground: '#3b82f6', // blue-500
    closeButtonBackgroundHover: '#2563eb', // blue-600
    buttonText: '#ffffff',
    
    inputBackground: '#ffffff',
    inputBorder: '#d1d5db', // gray-300
    inputBorderFocused: '#3b82f6', // blue-500
    inputText: '#000000',
    inputPlaceholder: '#9ca3af', // gray-400
    
    specialKeyText: '#1e293b', // slate-800
  },
  
  'high-contrast': {
    keyboardBackground: '#000000',
    keyboardBorder: '#ffffff',
    
    regularKeyBackground: '#ffffff',
    regularKeyBackgroundHover: '#e5e5e5',
    regularKeyText: '#000000',
    
    numberKeyBackground: '#ffff00',
    numberKeyBackgroundHover: '#e5e500',
    numberKeyText: '#000000',
    
    tashkeelKeyBackground: '#00ffff',
    tashkeelKeyBackgroundHover: '#00e5e5',
    tashkeelKeyText: '#000000',
    
    backspaceKeyBackground: '#ff0000',
    backspaceKeyBackgroundHover: '#cc0000',
    enterKeyBackground: '#00ff00',
    enterKeyBackgroundHover: '#00cc00',
    spaceKeyBackground: '#0000ff',
    spaceKeyBackgroundHover: '#0000cc',
    clearKeyBackground: '#ff8800',
    clearKeyBackgroundHover: '#cc6600',
    
    ctrlKeyBackground: '#ff00ff',
    ctrlKeyBackgroundHover: '#cc00cc',
    ctrlKeyBackgroundActive: '#990099',
    shiftKeyBackground: '#0088ff',
    shiftKeyBackgroundHover: '#0066cc',
    shiftKeyBackgroundActive: '#004499',
    altKeyBackground: '#888888',
    altKeyBackgroundHover: '#666666',
    
    alifVariantKeyBackground: '#ff00ff',
    alifVariantKeyBackgroundHover: '#cc00cc',
    
    openButtonBackground: '#0000ff',
    openButtonBackgroundHover: '#0000cc',
    closeButtonBackground: '#0000ff',
    closeButtonBackgroundHover: '#0000cc',
    buttonText: '#ffffff',
    
    inputBackground: '#ffffff',
    inputBorder: '#000000',
    inputBorderFocused: '#0000ff',
    inputText: '#000000',
    inputPlaceholder: '#666666',
    
    specialKeyText: '#ffffff',
  },
  
  colorful: {
    keyboardBackground: '#1e1b4b', // indigo-950
    keyboardBorder: '#312e81', // indigo-900
    
    regularKeyBackground: '#6366f1', // indigo-500
    regularKeyBackgroundHover: '#4f46e5', // indigo-600
    regularKeyText: '#ffffff',
    
    numberKeyBackground: '#06b6d4', // cyan-500
    numberKeyBackgroundHover: '#0891b2', // cyan-600
    numberKeyText: '#ffffff',
    
    tashkeelKeyBackground: '#f59e0b', // amber-500
    tashkeelKeyBackgroundHover: '#d97706', // amber-600
    tashkeelKeyText: '#ffffff',
    
    backspaceKeyBackground: '#ef4444', // red-500
    backspaceKeyBackgroundHover: '#dc2626', // red-600
    enterKeyBackground: '#10b981', // emerald-500
    enterKeyBackgroundHover: '#059669', // emerald-600
    spaceKeyBackground: '#8b5cf6', // violet-500
    spaceKeyBackgroundHover: '#7c3aed', // violet-600
    clearKeyBackground: '#f97316', // orange-500
    clearKeyBackgroundHover: '#ea580c', // orange-600
    
    ctrlKeyBackground: '#ec4899', // pink-500
    ctrlKeyBackgroundHover: '#db2777', // pink-600
    ctrlKeyBackgroundActive: '#be185d', // pink-700
    shiftKeyBackground: '#14b8a6', // teal-500
    shiftKeyBackgroundHover: '#0d9488', // teal-600
    shiftKeyBackgroundActive: '#0f766e', // teal-700
    altKeyBackground: '#64748b', // slate-500
    altKeyBackgroundHover: '#475569', // slate-600
    
    alifVariantKeyBackground: '#ec4899', // pink-500
    alifVariantKeyBackgroundHover: '#db2777', // pink-600
    
    openButtonBackground: '#8b5cf6', // violet-500
    openButtonBackgroundHover: '#7c3aed', // violet-600
    closeButtonBackground: '#8b5cf6', // violet-500
    closeButtonBackgroundHover: '#7c3aed', // violet-600
    buttonText: '#ffffff',
    
    inputBackground: '#ffffff',
    inputBorder: '#e5e7eb', // gray-200
    inputBorderFocused: '#8b5cf6', // violet-500
    inputText: '#000000',
    inputPlaceholder: '#9ca3af', // gray-400
    
    specialKeyText: '#ffffff',
  },
  
  minimal: {
    keyboardBackground: '#fafafa', // neutral-50
    keyboardBorder: '#e5e5e5', // neutral-200
    
    regularKeyBackground: '#ffffff',
    regularKeyBackgroundHover: '#f5f5f5', // neutral-100
    regularKeyText: '#171717', // neutral-900
    
    numberKeyBackground: '#fafafa', // neutral-50
    numberKeyBackgroundHover: '#f5f5f5', // neutral-100
    numberKeyText: '#404040', // neutral-700
    
    tashkeelKeyBackground: '#f5f5f5', // neutral-100
    tashkeelKeyBackgroundHover: '#e5e5e5', // neutral-200
    tashkeelKeyText: '#404040', // neutral-700
    
    backspaceKeyBackground: '#e5e5e5', // neutral-200
    backspaceKeyBackgroundHover: '#d4d4d4', // neutral-300
    enterKeyBackground: '#171717', // neutral-900
    enterKeyBackgroundHover: '#262626', // neutral-800
    spaceKeyBackground: '#fafafa', // neutral-50
    spaceKeyBackgroundHover: '#f5f5f5', // neutral-100
    clearKeyBackground: '#e5e5e5', // neutral-200
    clearKeyBackgroundHover: '#d4d4d4', // neutral-300
    
    ctrlKeyBackground: '#d4d4d4', // neutral-300
    ctrlKeyBackgroundHover: '#a3a3a3', // neutral-400
    ctrlKeyBackgroundActive: '#737373', // neutral-500
    shiftKeyBackground: '#d4d4d4', // neutral-300
    shiftKeyBackgroundHover: '#a3a3a3', // neutral-400
    shiftKeyBackgroundActive: '#737373', // neutral-500
    altKeyBackground: '#e5e5e5', // neutral-200
    altKeyBackgroundHover: '#d4d4d4', // neutral-300
    
    alifVariantKeyBackground: '#d4d4d4', // neutral-300
    alifVariantKeyBackgroundHover: '#a3a3a3', // neutral-400
    
    openButtonBackground: '#171717', // neutral-900
    openButtonBackgroundHover: '#262626', // neutral-800
    closeButtonBackground: '#171717', // neutral-900
    closeButtonBackgroundHover: '#262626', // neutral-800
    buttonText: '#ffffff',
    
    inputBackground: '#ffffff',
    inputBorder: '#e5e5e5', // neutral-200
    inputBorderFocused: '#171717', // neutral-900
    inputText: '#000000',
    inputPlaceholder: '#a3a3a3', // neutral-400
    
    specialKeyText: '#171717', // neutral-900
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get settings from localStorage or return defaults
 */
export function getStoredSettings(): KeyboardSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }
  
  try {
    const stored = localStorage.getItem('arabicKeyboardSettings');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all keys exist (for version upgrades)
      return mergeSettings(DEFAULT_SETTINGS, parsed);
    }
  } catch (error) {
    console.error('Error loading keyboard settings:', error);
  }
  
  return DEFAULT_SETTINGS;
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: KeyboardSettings): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('arabicKeyboardSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving keyboard settings:', error);
  }
}

/**
 * Reset settings to defaults
 */
export function resetSettings(): KeyboardSettings {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('arabicKeyboardSettings');
  }
  return DEFAULT_SETTINGS;
}

/**
 * Deep merge settings objects
 */
function mergeSettings(defaults: any, overrides: any): any {
  const result = { ...defaults };
  
  for (const key in overrides) {
    if (overrides[key] !== null && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
      result[key] = mergeSettings(defaults[key] || {}, overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  
  return result;
}

/**
 * Export settings as JSON string
 */
export function exportSettings(settings: KeyboardSettings): string {
  return JSON.stringify(settings, null, 2);
}

/**
 * Import settings from JSON string
 */
export function importSettings(jsonString: string): KeyboardSettings {
  try {
    const parsed = JSON.parse(jsonString);
    return mergeSettings(DEFAULT_SETTINGS, parsed);
  } catch (error) {
    console.error('Error importing settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Apply theme preset
 */
export function applyThemePreset(
  settings: KeyboardSettings,
  preset: keyof typeof THEME_PRESETS
): KeyboardSettings {
  return {
    ...settings,
    theme: {
      ...settings.theme,
      preset: preset as any,
      colors: THEME_PRESETS[preset],
    },
  };
}
