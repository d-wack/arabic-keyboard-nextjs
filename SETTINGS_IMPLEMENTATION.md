# ⚙️ Settings System Implementation Guide

## Overview

The Arabic Keyboard now has a comprehensive settings system that allows users to customize every aspect of the keyboard. Settings are stored in browser localStorage and persist across sessions.

---

## 📁 File Structure

```
src/
├── config/
│   └── defaultSettings.ts        # Default configuration & types
├── context/
│   └── SettingsContext.tsx       # React Context for settings
├── utils/
│   └── settingsUtils.ts          # Helper functions for applying settings
└── components/
    ├── ArabicKeyboard.tsx        # Main keyboard (to be updated)
    ├── SettingsModal.tsx         # Settings UI (to be created)
    └── SettingsButton.tsx        # Cog wheel button (to be created)
```

---

## 🏗️ Architecture

### 1. **Default Settings** (`defaultSettings.ts`)

Contains:
- TypeScript interfaces for all settings categories
- `DEFAULT_SETTINGS` object with sensible defaults
- `THEME_PRESETS` for quick theme switching
- Helper functions:
  - `getStoredSettings()` - Load from localStorage
  - `saveSettings()` - Save to localStorage
  - `resetSettings()` - Reset to defaults
  - `exportSettings()` - Export as JSON
  - `importSettings()` - Import from JSON
  - `applyThemePreset()` - Apply preset theme

### 2. **Settings Context** (`SettingsContext.tsx`)

Provides:
- `SettingsProvider` component to wrap your app
- `useSettings()` hook to access settings anywhere
- Update functions for each settings category:
  - `updateTheme()`
  - `updateLayout()`
  - `updateBehavior()`
  - `updateSound()`
  - `updateKeyboardLayout()`
  - `updateMobile()`
  - `updateAccessibility()`
  - `updateTypography()`
  - `updateData()`
  - `updateAdvanced()`
- Global operations:
  - `resetSettings()`
  - `exportSettings()`
  - `importSettings()`
  - `applyPreset()`

### 3. **Settings Utils** (`settingsUtils.ts`)

Provides helper functions to convert settings to:
- Tailwind CSS classes
- Inline styles
- Component props
- Sound effects
- Haptic feedback

Key functions:
- `getKeySizeClasses()` - Key size classes
- `getKeySpacingClasses()` - Spacing classes
- `getKeyStyles()` - Color styles for keys
- `getKeyboardContainerStyles()` - Container styles
- `getTextInputStyles()` - Input field styles
- `playSound()` - Play sound effects
- `triggerHaptic()` - Trigger vibration

---

## 🚀 Implementation Phases

### ✅ Phase 1: Foundation (COMPLETED)

- [x] Create `defaultSettings.ts` with all interfaces
- [x] Create `SettingsContext.tsx` for state management
- [x] Create `settingsUtils.ts` for helper functions
- [x] Define all 100+ configurable options

### 🔄 Phase 2: Integrate with Keyboard (NEXT)

1. **Update ArabicKeyboard.tsx**
   - Wrap with SettingsProvider
   - Replace hardcoded values with settings
   - Use utility functions for styles
   - Add settings button

2. **Create SettingsButton.tsx**
   - Cog wheel icon button
   - Position on keyboard
   - Open settings modal

3. **Test basic integration**
   - Verify settings load from localStorage
   - Verify settings save on change
   - Test a few settings (colors, size, position)

### 📋 Phase 3: Settings UI (AFTER INTEGRATION)

1. **Create SettingsModal.tsx**
   - Tabbed interface for categories
   - Form controls for each setting
   - Live preview
   - Save/Cancel/Reset buttons

2. **Create individual setting controls**
   - Color pickers
   - Sliders
   - Dropdowns
   - Toggles
   - Number inputs

3. **Add presets**
   - Quick theme buttons
   - Import/Export functionality

---

## 📖 Usage Examples

### Basic Setup

```typescript
// In your app layout or page
import { SettingsProvider } from '@/context/SettingsContext';
import ArabicKeyboard from '@/components/ArabicKeyboard';

export default function Page() {
  return (
    <SettingsProvider>
      <div>
        <h1>My App</h1>
        <ArabicKeyboard
          isVisible={true}
          onToggle={() => {}}
          onWordComplete={(word) => console.log(word)}
        />
      </div>
    </SettingsProvider>
  );
}
```

### Using Settings in a Component

```typescript
import { useSettings } from '@/context/SettingsContext';

export default function MyComponent() {
  const { settings, updateTheme, applyPreset } = useSettings();

  const changeToLightTheme = () => {
    applyPreset('light');
  };

  const changeKeyboardSize = () => {
    updateLayout({ scale: 'large' });
  };

  return (
    <div>
      <button onClick={changeToLightTheme}>Light Theme</button>
      <button onClick={changeKeyboardSize}>Large Size</button>
      <p>Current theme: {settings.theme.preset}</p>
    </div>
  );
}
```

### Custom Initial Settings

```typescript
<SettingsProvider
  initialSettings={{
    theme: { preset: 'light' },
    layout: { scale: 'medium', position: 'top-center' },
  }}
>
  <YourApp />
</SettingsProvider>
```

### Listen to Settings Changes

```typescript
<SettingsProvider
  onSettingsChange={(newSettings) => {
    console.log('Settings updated:', newSettings);
    // Send to analytics, etc.
  }}
>
  <YourApp />
</SettingsProvider>
```

### Export/Import Settings

```typescript
const { exportSettings, importSettings } = useSettings();

// Export
const downloadSettings = () => {
  const json = exportSettings();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'keyboard-settings.json';
  a.click();
};

// Import
const uploadSettings = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const json = e.target?.result as string;
    const success = importSettings(json);
    if (success) {
      alert('Settings imported successfully!');
    }
  };
  reader.readAsText(file);
};
```

---

## 🎨 Applying Settings to Keyboard

### In ArabicKeyboard.tsx

```typescript
import { useSettings } from '@/context/SettingsContext';
import {
  getKeySizeClasses,
  getKeySpacingClasses,
  getKeyStyles,
  getKeyboardContainerStyles,
  playSound,
  triggerHaptic,
} from '@/utils/settingsUtils';

export default function ArabicKeyboard({ isVisible, onToggle, onWordComplete }) {
  const { settings } = useSettings();

  // Get dynamic classes
  const keySizeClasses = getKeySizeClasses(settings.layout.keySize);
  const keySpacing = getKeySpacingClasses(settings.layout.keySpacing);
  const containerStyles = getKeyboardContainerStyles(settings);

  const handleKeyClick = (key) => {
    // Play sound
    playSound('click', settings);
    
    // Trigger haptic
    triggerHaptic('key-press', settings);
    
    // Rest of logic...
  };

  return (
    <div style={containerStyles}>
      {/* Keyboard UI */}
    </div>
  );
}
```

### Styling Keys with Settings

```typescript
const getKeyClassName = (key: Key) => {
  const baseClasses = [
    keySizeClasses,
    getBorderRadiusClasses(settings.layout.borderRadius),
    getShadowClasses(settings.layout.keyShadow),
    getHoverEffectClasses(settings.layout.hoverEffect),
    'transition-all duration-150',
  ].join(' ');

  return baseClasses;
};

const getKeyStyle = (key: Key) => {
  // Determine key type
  const isNumber = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'].includes(key.normal);
  const isTashkeel = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ'].includes(key.normal);
  
  if (key.special) {
    return getKeyStyles('special', settings, 'normal', key.special);
  } else if (isNumber) {
    return getKeyStyles('number', settings);
  } else if (isTashkeel) {
    return getKeyStyles('tashkeel', settings);
  } else {
    return getKeyStyles('regular', settings);
  }
};

// Usage
<button
  className={getKeyClassName(key)}
  style={getKeyStyle(key)}
  onClick={() => handleKeyClick(key)}
>
  {key.normal}
</button>
```

---

## 🔧 Next Steps

### Immediate Tasks (Phase 2)

1. **Update ArabicKeyboard.tsx**
   ```bash
   # Replace hardcoded colors with settings
   # Replace hardcoded sizes with settings
   # Add SettingsProvider wrapper
   # Import and use utility functions
   ```

2. **Create SettingsButton.tsx**
   ```typescript
   // Simple cog icon button
   // Positioned top-right of keyboard
   // Opens settings modal (stub for now)
   ```

3. **Test Integration**
   ```bash
   # Change settings in defaultSettings.ts
   # Verify keyboard updates accordingly
   # Test localStorage persistence
   ```

### Future Tasks (Phase 3)

4. **Create SettingsModal.tsx**
   - Full UI for all settings
   - Organized into tabs
   - Live preview

5. **Add More Features**
   - Sound effects (need audio files)
   - Physical keyboard integration
   - Layout switching
   - Word history
   - Accessibility features

---

## 📊 Settings Categories Summary

| Category | Options | Priority |
|----------|---------|----------|
| Theme | 40+ color options, 5 presets | 🔴 High |
| Layout | Size, position, spacing, shadows | 🔴 High |
| Behavior | Auto-hide, modifiers, text input | 🟡 Medium |
| Sound | Click sounds, haptic feedback | 🟡 Medium |
| Keyboard Layout | KBDA1/2, physical keyboard | 🟢 Low |
| Mobile | Touch feedback, gestures | 🟢 Low |
| Accessibility | Screen reader, navigation | 🟢 Low |
| Typography | Font family, size, weight | 🟡 Medium |
| Data | Persistence, history | 🟢 Low |
| Advanced | Debug mode, performance | 🟢 Low |

**Total: 100+ configurable options**

---

## 🎯 Current Status

- ✅ **Phase 1 Complete**: Settings infrastructure built
- 🔄 **Phase 2 In Progress**: Ready to integrate with keyboard
- ⏳ **Phase 3 Pending**: Settings UI to be built

---

## 💡 Tips

1. **Start Small**: Don't integrate all settings at once. Start with colors and size.
2. **Test Frequently**: Change settings in `defaultSettings.ts` and verify keyboard updates.
3. **Use TypeScript**: The types will help catch errors early.
4. **Keep Defaults Sensible**: Current defaults match the existing keyboard exactly.
5. **Document Changes**: Update this README as you add features.

---

## 🐛 Troubleshooting

### Settings not persisting
- Check browser localStorage quota
- Verify `data.autoSave` is true
- Check browser console for errors

### Styles not applying
- Verify `useSettings()` is called within `SettingsProvider`
- Check that utility functions are imported correctly
- Verify Tailwind classes are available

### TypeScript errors
- All types are exported from `defaultSettings.ts`
- Import interfaces as needed
- Check that settings object matches `KeyboardSettings` interface

---

## 📚 Related Files

- `SETTINGS_SPECIFICATION.md` - Detailed specification of all settings
- `DEV_WORKFLOW.md` - Development process and feature roadmap
- `BUG_ANALYSIS_REPORT.md` - Previous bug fixes and improvements

---

**Ready to integrate! Start with Phase 2. 🚀**
