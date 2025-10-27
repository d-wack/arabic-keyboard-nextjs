/**
 * Settings Utils
 * 
 * Utility functions to convert settings to CSS classes, inline styles,
 * and component props.
 */

import { KeyboardSettings } from '../config/defaultSettings';

// ============================================================================
// CSS Class Utilities
// ============================================================================

/**
 * Get Tailwind classes for key size
 */
export function getKeySizeClasses(size: KeyboardSettings['layout']['keySize']): string {
  switch (size) {
    case 'compact':
      return 'py-2 px-3 min-w-[40px] text-base';
    case 'normal':
      return 'py-3 px-4 min-w-[50px] text-lg';
    case 'large':
      return 'py-4 px-6 min-w-[60px] text-xl';
    case 'touch-optimized':
      return 'py-5 px-8 min-w-[70px] text-2xl';
    default:
      return 'py-3 px-4 min-w-[50px] text-lg';
  }
}

/**
 * Get Tailwind classes for key spacing
 */
export function getKeySpacingClasses(spacing: KeyboardSettings['layout']['keySpacing']): string {
  switch (spacing) {
    case 'none':
      return 'gap-0';
    case 'tight':
      return 'gap-1';
    case 'normal':
      return 'gap-2';
    case 'loose':
      return 'gap-3';
    case 'wide':
      return 'gap-4';
    default:
      return 'gap-2';
  }
}

/**
 * Get Tailwind classes for row spacing
 */
export function getRowSpacingClasses(spacing: KeyboardSettings['layout']['rowSpacing']): string {
  switch (spacing) {
    case 'tight':
      return 'mb-2';
    case 'normal':
      return 'mb-3';
    case 'loose':
      return 'mb-4';
    default:
      return 'mb-3';
  }
}

/**
 * Get Tailwind classes for hover effect
 */
export function getHoverEffectClasses(effect: KeyboardSettings['layout']['hoverEffect']): string {
  switch (effect) {
    case 'none':
      return '';
    case 'small':
      return 'hover:scale-102';
    case 'medium':
      return 'hover:scale-105';
    case 'large':
      return 'hover:scale-110';
    default:
      return 'hover:scale-105';
  }
}

/**
 * Get Tailwind classes for shadow
 */
export function getShadowClasses(shadow: KeyboardSettings['layout']['keyShadow']): string {
  switch (shadow) {
    case 'none':
      return '';
    case 'small':
      return 'shadow-sm';
    case 'medium':
      return 'shadow-md';
    case 'large':
      return 'shadow-lg';
    default:
      return 'shadow-lg';
  }
}

/**
 * Get Tailwind classes for border radius
 */
export function getBorderRadiusClasses(radius: KeyboardSettings['layout']['borderRadius']): string {
  switch (radius) {
    case 'none':
      return 'rounded-none';
    case 'small':
      return 'rounded';
    case 'medium':
      return 'rounded-lg';
    case 'large':
      return 'rounded-xl';
    case 'xl':
      return 'rounded-2xl';
    default:
      return 'rounded-lg';
  }
}

/**
 * Get Tailwind classes for keyboard position
 */
export function getPositionClasses(position: KeyboardSettings['layout']['position']): string {
  switch (position) {
    case 'bottom-center':
      return 'bottom-0 left-1/2 -translate-x-1/2';
    case 'bottom-left':
      return 'bottom-0 left-0';
    case 'bottom-right':
      return 'bottom-0 right-0';
    case 'top-center':
      return 'top-0 left-1/2 -translate-x-1/2';
    case 'top-left':
      return 'top-0 left-0';
    case 'top-right':
      return 'top-0 right-0';
    case 'floating':
      return ''; // Will use custom positioning
    default:
      return 'bottom-0 left-1/2 -translate-x-1/2';
  }
}

/**
 * Get Tailwind classes for keyboard scale
 */
export function getScaleClasses(scale: KeyboardSettings['layout']['scale']): string {
  // Always use max-w-4xl as base, we'll scale with transform
  return 'max-w-4xl';
}

/**
 * Get transform scale value for keyboard size
 */
export function getScaleTransform(scale: KeyboardSettings['layout']['scale']): number {
  switch (scale) {
    case 'small':
      return 0.7; // 70% of normal size
    case 'medium':
      return 0.85; // 85% of normal size
    case 'large':
      return 1.0; // 100% - normal size (default)
    case 'xl':
      return 1.15; // 115% of normal size
    case 'custom':
      return 1.0; // Use custom width instead
    default:
      return 1.0;
  }
}

/**
 * Get Tailwind classes for font weight
 */
export function getFontWeightClasses(weight: KeyboardSettings['typography']['keyFontWeight']): string {
  switch (weight) {
    case 'normal':
      return 'font-normal';
    case 'medium':
      return 'font-medium';
    case 'semibold':
      return 'font-semibold';
    case 'bold':
      return 'font-bold';
    default:
      return 'font-medium';
  }
}

/**
 * Get Tailwind classes for textarea resize
 */
export function getResizeClasses(resize: KeyboardSettings['behavior']['textareaResize']): string {
  switch (resize) {
    case 'none':
      return 'resize-none';
    case 'vertical':
      return 'resize-y';
    case 'horizontal':
      return 'resize-x';
    case 'both':
      return 'resize';
    default:
      return 'resize-none';
  }
}

// ============================================================================
// Inline Style Utilities
// ============================================================================

/**
 * Get inline styles for colors based on theme
 */
export function getKeyStyles(
  keyType: 'regular' | 'number' | 'tashkeel' | 'special',
  settings: KeyboardSettings,
  state: 'normal' | 'hover' | 'active' = 'normal',
  specialKeyType?: string
): React.CSSProperties {
  const { colors } = settings.theme;
  const styles: React.CSSProperties = {};

  // Determine background color
  if (keyType === 'special' && specialKeyType) {
    switch (specialKeyType) {
      case 'backspace':
        styles.backgroundColor = state === 'hover' ? colors.backspaceKeyBackgroundHover : colors.backspaceKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'enter':
        styles.backgroundColor = state === 'hover' ? colors.enterKeyBackgroundHover : colors.enterKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'space':
        styles.backgroundColor = state === 'hover' ? colors.spaceKeyBackgroundHover : colors.spaceKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'clear':
        styles.backgroundColor = state === 'hover' ? colors.clearKeyBackgroundHover : colors.clearKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'close':
        styles.backgroundColor = state === 'hover' ? colors.clearKeyBackgroundHover : colors.clearKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'ctrl':
        if (state === 'active') {
          styles.backgroundColor = colors.ctrlKeyBackgroundActive;
        } else {
          styles.backgroundColor = state === 'hover' ? colors.ctrlKeyBackgroundHover : colors.ctrlKeyBackground;
        }
        styles.color = colors.specialKeyText;
        break;
      case 'shift':
        if (state === 'active') {
          styles.backgroundColor = colors.shiftKeyBackgroundActive;
        } else {
          styles.backgroundColor = state === 'hover' ? colors.shiftKeyBackgroundHover : colors.shiftKeyBackground;
        }
        styles.color = colors.specialKeyText;
        break;
      case 'alt':
        styles.backgroundColor = state === 'hover' ? colors.altKeyBackgroundHover : colors.altKeyBackground;
        styles.color = colors.specialKeyText;
        break;
      case 'alif-variant':
        styles.backgroundColor = state === 'hover' ? colors.alifVariantKeyBackgroundHover : colors.alifVariantKeyBackground;
        styles.color = colors.specialKeyText;
        break;
    }
  } else {
    switch (keyType) {
      case 'regular':
        styles.backgroundColor = state === 'hover' ? colors.regularKeyBackgroundHover : colors.regularKeyBackground;
        styles.color = colors.regularKeyText;
        break;
      case 'number':
        styles.backgroundColor = state === 'hover' ? colors.numberKeyBackgroundHover : colors.numberKeyBackground;
        styles.color = colors.numberKeyText;
        break;
      case 'tashkeel':
        styles.backgroundColor = state === 'hover' ? colors.tashkeelKeyBackgroundHover : colors.tashkeelKeyBackground;
        styles.color = colors.tashkeelKeyText;
        break;
    }
  }

  // Add transition for smooth color changes
  styles.transition = 'all 150ms ease-in-out';

  return styles;
}

/**
 * Get inline styles for keyboard container
 */
export function getKeyboardContainerStyles(settings: KeyboardSettings): React.CSSProperties {
  const { colors } = settings.theme;
  const { layout } = settings;
  
  const styles: React.CSSProperties = {
    backgroundColor: colors.keyboardBackground,
    borderColor: colors.keyboardBorder,
  };

  // Custom width
  if (layout.scale === 'custom' && layout.customWidth) {
    styles.maxWidth = `${layout.customWidth}px`;
  }

  // Floating position
  if (layout.position === 'floating' && layout.floatingPosition) {
    styles.position = 'fixed';
    styles.top = `${layout.floatingPosition.y}px`;
    styles.left = `${layout.floatingPosition.x}px`;
    styles.transform = 'none';
  }

  // Animation duration
  if (layout.slideAnimation) {
    styles.transitionDuration = `${layout.slideAnimationDuration}ms`;
  }

  return styles;
}

/**
 * Get inline styles for text input
 */
export function getTextInputStyles(settings: KeyboardSettings): React.CSSProperties {
  const { colors } = settings.theme;
  const { typography, behavior } = settings;

  const styles: React.CSSProperties = {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    color: colors.inputText,
    direction: behavior.textDirection === 'auto' ? undefined : behavior.textDirection,
  };

  // Font size
  if (typography.inputFontSize === 'custom' && typography.inputFontSizeCustom) {
    styles.fontSize = `${typography.inputFontSizeCustom}px`;
  }

  // Font family
  if (typography.fontFamily === 'custom' && typography.customFontFamily) {
    styles.fontFamily = typography.customFontFamily;
  } else {
    styles.fontFamily = typography.fontFamily;
  }

  return styles;
}

/**
 * Get inline styles for buttons
 */
export function getButtonStyles(
  buttonType: 'open' | 'close',
  settings: KeyboardSettings,
  state: 'normal' | 'hover' = 'normal'
): React.CSSProperties {
  const { colors } = settings.theme;

  const styles: React.CSSProperties = {
    color: colors.buttonText,
  };

  if (buttonType === 'open') {
    styles.backgroundColor = state === 'hover' ? colors.openButtonBackgroundHover : colors.openButtonBackground;
  } else {
    styles.backgroundColor = state === 'hover' ? colors.closeButtonBackgroundHover : colors.closeButtonBackground;
  }

  styles.transition = 'all 150ms ease-in-out';

  return styles;
}

// ============================================================================
// Animation Utilities
// ============================================================================

/**
 * Get animation class for keyboard slide
 */
export function getSlideAnimationClass(
  settings: KeyboardSettings,
  isVisible: boolean
): string {
  if (!settings.layout.slideAnimation) {
    return '';
  }

  const position = settings.layout.position;
  const type = settings.layout.slideAnimationType;

  if (type === 'fade') {
    return isVisible ? 'opacity-100' : 'opacity-0';
  }

  if (type === 'scale') {
    return isVisible ? 'scale-100' : 'scale-95';
  }

  if (type === 'none') {
    return '';
  }

  // Slide animation (default)
  if (position.startsWith('bottom')) {
    return isVisible ? 'translate-y-0' : 'translate-y-full';
  } else if (position.startsWith('top')) {
    return isVisible ? 'translate-y-0' : '-translate-y-full';
  }

  return '';
}

/**
 * Get z-index style
 */
export function getZIndexStyle(
  layer: 'overlay' | 'keyboard' | 'button',
  settings: KeyboardSettings
): React.CSSProperties {
  const { layout } = settings;
  
  switch (layer) {
    case 'overlay':
      return { zIndex: layout.zIndexOverlay };
    case 'keyboard':
      return { zIndex: layout.zIndexKeyboard };
    case 'button':
      return { zIndex: layout.zIndexButton };
  }
}

// ============================================================================
// Sound Utilities
// ============================================================================

/**
 * Play sound effect
 */
export async function playSound(
  soundType: 'click' | 'open-close',
  settings: KeyboardSettings
): Promise<void> {
  const { sound } = settings;

  // Check if sound is globally enabled
  if (!sound.soundEnabled) {
    return;
  }

  let soundFile: string;
  let volume: number;
  let enabled: boolean;

  switch (soundType) {
    case 'click':
      enabled = sound.clickSoundEnabled;
      volume = (sound.clickSoundVolume / 100) * (sound.masterVolume / 100);
      soundFile = '/sounds/ui_tap-variant-04.ogg';
      break;
    case 'open-close':
      enabled = sound.openCloseSoundEnabled;
      volume = (sound.openCloseSoundVolume / 100) * (sound.masterVolume / 100);
      soundFile = '/sounds/ui_unlock.ogg';
      break;
    default:
      return;
  }

  if (!enabled) {
    return;
  }

  try {
    const audio = new Audio(soundFile);
    audio.volume = volume;
    await audio.play();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

// ============================================================================
// Haptic Utilities
// ============================================================================

/**
 * Trigger haptic feedback (mobile)
 */
export function triggerHaptic(
  type: 'key-press' | 'open-close',
  settings: KeyboardSettings
): void {
  if (!settings.sound.hapticFeedback) {
    return;
  }

  // Check if vibration API is available
  if (!navigator.vibrate) {
    return;
  }

  let duration: number;
  let pattern: number | number[];

  if (type === 'key-press') {
    const intensity = settings.sound.hapticKeyPress;
    if (intensity === 'none') return;

    duration = settings.sound.hapticKeyPressDuration;
    
    switch (intensity) {
      case 'light':
        pattern = duration;
        break;
      case 'medium':
        pattern = [duration, 50, duration];
        break;
      case 'strong':
        pattern = [duration, 50, duration, 50, duration];
        break;
      default:
        return;
    }
  } else {
    // open-close
    const intensity = settings.sound.hapticOpenClose;
    if (intensity === 'none') return;

    switch (intensity) {
      case 'light':
        pattern = 20;
        break;
      case 'medium':
        pattern = [30, 20, 30];
        break;
      default:
        return;
    }
  }

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.error('Error triggering haptic feedback:', error);
  }
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Check if settings are valid
 */
export function validateSettings(settings: KeyboardSettings): boolean {
  try {
    // Add validation logic here
    // For now, just check if required fields exist
    return (
      settings.version !== undefined &&
      settings.theme !== undefined &&
      settings.layout !== undefined
    );
  } catch (error) {
    return false;
  }
}
