# ⚙️ Keyboard Settings & Configuration Options

## Overview

This document outlines all configurable settings for the Arabic Keyboard component. Settings are organized by category and include both currently available options and planned future features.

---

## 📋 Settings Categories

### 1. 🎨 **Appearance & Theme**

#### Color Customization
- **Keyboard Background Color**
  - Current: `slate-700`
  - Options: Light, Dark, Custom hex/rgb
  - Default: Dark Gray (#334155)

- **Regular Key Colors**
  - Current: `slate-600` (normal), `slate-500` (hover)
  - Options: Multiple presets + custom
  - Default: Medium Gray

- **Number Key Colors**
  - Current: `blue-500` (normal), `blue-600` (hover)
  - Options: Blue, Green, Purple, Red, Custom
  - Default: Blue

- **Tashkeel Key Colors**
  - Current: `gray-400` (normal), `gray-500` (hover)
  - Options: Gray, Orange, Yellow, Purple, Custom
  - Default: Light Gray
  - Text Color: Dark Gray (`gray-800`)

- **Special Key Colors**
  - **Backspace**: `yellow-500` → `yellow-600`
  - **Enter**: `green-500` → `green-600`
  - **Space**: `blue-500` → `blue-600`
  - **Clear**: `orange-500` → `orange-600`
  - **Ctrl**: `purple-500` → `purple-600` (active: `purple-600`)
  - **Shift**: `blue-500` → `blue-600` (active: `blue-600`)
  - **Alt**: `gray-500` → `gray-600`
  - Options: Each can be customized independently

- **Open/Close Button Colors**
  - Open Button: `blue-600` → `blue-700`
  - Close Button: `blue-500` → `blue-600`
  - Options: Match keyboard theme or custom

- **Text Input Area**
  - Background: White
  - Border: `gray-200` (normal), `blue-500` (focused)
  - Text Color: Black
  - Font Size: 4xl (36px)
  - Options: All customizable

#### Theme Presets
- **Light Theme**
  - Light background, dark text
  - Softer colors
  - Better for daytime use

- **Dark Theme** (Current Default)
  - Dark background, light text
  - High contrast
  - Better for nighttime use

- **High Contrast**
  - Maximum contrast for accessibility
  - WCAG AAA compliant colors
  - Black/White with accent colors

- **Colorful**
  - Vibrant, multi-color scheme
  - Each key type has distinct color
  - Fun and engaging

- **Minimal**
  - Monochrome design
  - Subtle hover effects
  - Professional look

- **Custom**
  - User defines all colors
  - Save custom themes
  - Share theme codes

#### Visual Effects
- **Key Hover Effect**
  - Current: `scale-105` (5% scale up)
  - Options: None, Small (102%), Medium (105%), Large (110%)
  - Default: Medium

- **Key Press Animation**
  - Current: None
  - Options: None, Ripple, Scale Down, Glow, All
  - Default: None

- **Keyboard Slide Animation**
  - Current: `translate-y` with 500ms duration
  - Options: Slide, Fade, Scale, None
  - Duration: 100ms - 1000ms
  - Default: Slide (500ms)

- **Key Shadows**
  - Current: `shadow-lg` on all keys
  - Options: None, Small, Medium, Large
  - Default: Large

- **Border Radius**
  - Current: `rounded-lg` (keys), `rounded-t-2xl` (keyboard)
  - Options: None (0px), Small (4px), Medium (8px), Large (12px), XL (16px)
  - Default: Medium

#### Typography
- **Font Family**
  - Current: 'Amiri' for Arabic, System fonts for controls
  - Options: Amiri, Noto Sans Arabic, Scheherazade New, Traditional Arabic, Custom
  - Default: Amiri

- **Font Size**
  - Key Text: `text-lg` (18px)
  - Input Text: `text-4xl` (36px)
  - Options: Small, Medium, Large, XL, Custom
  - Default: Large (keys), XL (input)

- **Font Weight**
  - Current: `font-medium` (keys), `font-bold` (special keys)
  - Options: Normal, Medium, Semibold, Bold
  - Default: Medium

---

### 2. 📐 **Layout & Size**

#### Keyboard Size
- **Overall Scale**
  - Current: Fixed size with `max-w-4xl`
  - Options: 
    - Small (Mobile): 320px - 480px
    - Medium (Tablet): 640px - 768px
    - Large (Desktop): 896px - 1024px (current)
    - XL (Wide Screen): 1280px+
    - Custom: User-defined width
  - Default: Large

- **Key Size**
  - Current: `py-3 px-4` with `min-w-[50px]`
  - Options:
    - Compact: py-2 px-3, min-w-[40px]
    - Normal: py-3 px-4, min-w-[50px] (current)
    - Large: py-4 px-6, min-w-[60px]
    - Touch-Optimized: py-5 px-8, min-w-[70px]
  - Default: Normal

- **Key Spacing**
  - Current: `gap-2` (8px between keys)
  - Options: None (0px), Tight (4px), Normal (8px), Loose (12px), Wide (16px)
  - Default: Normal

- **Row Spacing**
  - Current: `mb-3` (12px between rows)
  - Options: Tight (8px), Normal (12px), Loose (16px)
  - Default: Normal

#### Position & Docking
- **Keyboard Position**
  - Current: Bottom center (fixed)
  - Options:
    - Bottom Center (current)
    - Bottom Left
    - Bottom Right
    - Top Center
    - Top Left
    - Top Right
    - Floating (draggable)
    - Side Docked (left/right edge)
  - Default: Bottom Center

- **Z-Index Layers**
  - Overlay: z-30
  - Keyboard: z-40
  - Open Button: z-50
  - Options: Auto, Custom (for integration with other modals)

- **Full Screen Mode**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Description: Keyboard takes full viewport on mobile

---

### 3. ⚡ **Behavior & Interaction**

#### Auto-Hide/Show
- **Auto-Hide on Blur**
  - Current: No (fixed in bug fixes)
  - Options: Yes/No
  - Delay: 0ms - 5000ms
  - Default: No

- **Auto-Show on Input Focus**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Description: Show keyboard when textarea gains focus

- **Hide on Word Complete**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Description: Hide keyboard after pressing Enter

- **Click Outside to Close**
  - Current: Yes (overlay click)
  - Options: Yes/No
  - Default: Yes

#### Modifier Keys Behavior
- **Shift Auto-Reset**
  - Current: Yes (resets after typing)
  - Options: Yes/No/Toggle Mode
  - Default: Yes
  - Toggle Mode: Shift stays on until clicked again

- **Ctrl Auto-Reset**
  - Current: Yes (resets after typing)
  - Options: Yes/No/Toggle Mode
  - Default: Yes

- **Sticky Keys**
  - Current: No
  - Options: Enable/Disable
  - Default: Disable
  - Description: Press modifiers twice to lock them

#### Text Input Behavior
- **Clear on Submit**
  - Current: Yes (Enter clears text)
  - Options: Yes/No
  - Default: Yes

- **Space Key Action**
  - Current: Insert space only
  - Options:
    - Insert Space (current)
    - Complete Word (like Enter)
    - Insert Space + Complete Word
  - Default: Insert Space

- **Auto-Capitalize**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Description: Capitalize first letter after punctuation

- **Max Text Length**
  - Current: Unlimited
  - Options: 50, 100, 200, 500, 1000, Unlimited
  - Default: Unlimited

#### Textarea Settings
- **Rows**
  - Current: 1
  - Options: 1-10, Auto-expand
  - Default: 1

- **Placeholder Text**
  - Current: "اكتب هنا..."
  - Options: Custom text, None
  - Default: "اكتب هنا..."

- **Text Direction**
  - Current: RTL (right-to-left)
  - Options: RTL, LTR, Auto
  - Default: RTL

- **Resize**
  - Current: None
  - Options: None, Vertical, Horizontal, Both
  - Default: None

---

### 4. 🔊 **Sound & Feedback**

#### Sound Effects
- **Click Sound**
  - Current: No
  - Options: None, Soft, Normal, Loud, Custom Audio
  - Volume: 0-100%
  - Default: None

- **Open/Close Sound**
  - Current: No
  - Options: None, Slide, Pop, Custom
  - Default: None

- **Error Sound**
  - Current: No
  - Options: None, Beep, Alert
  - Default: None
  - Description: Play when action fails

- **Complete Sound**
  - Current: No
  - Options: None, Success, Ding, Custom
  - Default: None
  - Description: Play when word is completed (Enter)

#### Haptic Feedback (Mobile)
- **Vibration on Key Press**
  - Current: No
  - Options: None, Light, Medium, Strong
  - Duration: 10ms - 100ms
  - Default: None

- **Vibration on Open/Close**
  - Current: No
  - Options: None, Light, Medium
  - Default: None

---

### 5. ⌨️ **Keyboard Layout & Features**

#### Layout Selection
- **Current Layout**
  - Current: KBDA1 (Standard Arabic)
  - Options:
    - KBDA1 (Standard) - current
    - KBDA2 (Alternative)
    - AZERTY Arabic
    - QWERTY Arabic
    - Custom Layout
  - Default: KBDA1

- **Layout Switching**
  - Current: No
  - Options: Enable/Disable
  - Default: Disable
  - Description: Button to switch between layouts

#### Physical Keyboard Integration
- **Enable Physical Keyboard**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Description: Use physical keyboard to type Arabic

- **Key Mapping**
  - Current: N/A
  - Options: 
    - Phonetic (Q→ق, W→و, etc.)
    - Positional (Q→ض based on Arabic layout)
    - Custom mapping
  - Default: Positional

- **Show Keyboard on Physical Key**
  - Current: N/A
  - Options: Yes/No
  - Default: Yes
  - Description: Show virtual keyboard when physical key pressed

#### Special Features
- **Show Tashkeel Keys**
  - Current: Yes (via Shift)
  - Options: Always, Shift Only, Hidden
  - Default: Shift Only

- **Show Numbers**
  - Current: Yes
  - Options: Yes/No
  - Default: Yes

- **Show English Characters**
  - Current: Some symbols only
  - Options: None, Symbols Only, Full English
  - Default: Symbols Only

- **Alif Variants (Ctrl Keys)**
  - Current: Yes
  - Options: Yes/No
  - Default: Yes

---

### 6. 📱 **Mobile Optimizations**

#### Touch Settings
- **Touch Feedback**
  - Current: Hover effect only
  - Options: None, Highlight, Scale, Both
  - Default: Both

- **Touch Area Padding**
  - Current: Standard (py-3 px-4)
  - Options: None, Small, Medium (current), Large
  - Default: Medium
  - Description: Extra padding for easier touch targets

- **Long Press Action**
  - Current: None
  - Options:
    - None
    - Show Alt Characters
    - Context Menu
    - Copy Key
  - Default: None

#### Gesture Support
- **Swipe to Hide**
  - Current: No
  - Options: Yes/No
  - Direction: Down, Up, Left, Right
  - Default: No

- **Pinch to Resize**
  - Current: No
  - Options: Yes/No
  - Default: No

---

### 7. ♿ **Accessibility**

#### Screen Reader Support
- **ARIA Labels**
  - Current: Partial
  - Options: Full, Partial, None
  - Default: Full
  - Description: Add aria-label to all keys

- **Announce Key Presses**
  - Current: No
  - Options: Yes/No
  - Default: Yes
  - Description: Screen reader announces typed characters

#### Keyboard Navigation
- **Tab Navigation**
  - Current: No
  - Options: Enable/Disable
  - Default: Enable
  - Description: Tab through keyboard keys

- **Arrow Key Navigation**
  - Current: No
  - Options: Enable/Disable
  - Default: Enable

- **Focus Indicators**
  - Current: Default browser outline
  - Options: None, Default, Enhanced, Custom
  - Default: Enhanced

#### High Contrast Mode
- **Auto-Detect System Preference**
  - Current: No
  - Options: Yes/No
  - Default: Yes

- **Force High Contrast**
  - Current: No
  - Options: Yes/No
  - Default: No

#### Font Scaling
- **Respect System Font Size**
  - Current: No
  - Options: Yes/No
  - Default: Yes

- **Minimum Font Size**
  - Current: None
  - Options: 12px, 14px, 16px, 18px
  - Default: 14px

---

### 8. 💾 **Data & Persistence**

#### Save Settings
- **Save Location**
  - Current: Not saved
  - Options:
    - Browser LocalStorage
    - Browser Cookies
    - URL Parameters
    - User Account (if integrated)
  - Default: LocalStorage

- **Auto-Save**
  - Current: No
  - Options: Yes/No
  - Default: Yes

- **Export/Import Settings**
  - Current: No
  - Options: Yes/No
  - Format: JSON
  - Default: No

#### Text History
- **Save Typed Words**
  - Current: No
  - Options: Yes/No
  - Max History: 10, 50, 100, 500
  - Default: No

- **Word Suggestions from History**
  - Current: No
  - Options: Yes/No
  - Default: No

- **Clear History**
  - Current: N/A
  - Options: Manual button, Auto after session, Auto after time
  - Default: Manual

---

### 9. 🔧 **Advanced Settings**

#### Performance
- **Animation Performance**
  - Current: CSS transitions
  - Options:
    - High Quality (current)
    - Balanced
    - Performance Mode (reduced animations)
    - None (no animations)
  - Default: High Quality

- **Debounce Key Presses**
  - Current: No
  - Options: Yes/No
  - Delay: 0ms - 200ms
  - Default: No (0ms)

#### Developer Options
- **Debug Mode**
  - Current: No
  - Options: Yes/No
  - Default: No
  - Features:
    - Show key codes
    - Log events to console
    - Display performance metrics

- **Custom CSS Classes**
  - Current: No
  - Options: Allow user to inject custom classes
  - Default: No

- **Event Callbacks**
  - Current: Limited (onWordComplete, onToggle)
  - Options: Add more callbacks:
    - onKeyPress
    - onTextChange
    - onOpen
    - onClose
    - onSettingsChange
  - Default: Current callbacks only

---

## 🎯 Settings UI Design

### Settings Panel Access
- **Settings Button Location**
  - Options:
    - Top right of keyboard (cog icon)
    - Next to Close button
    - Top left
    - Hidden in menu
  - Default: Top right

- **Settings Panel Type**
  - Options:
    - Modal/Dialog
    - Slide-in panel
    - Dropdown menu
    - Separate page
  - Default: Modal

### Settings Organization
- **View Mode**
  - Simple: Most common settings only
  - Advanced: All settings
  - Tabs: Organized by category
  - Search: Search for specific settings

- **Setting Groups** (Collapsible sections)
  1. Appearance
  2. Behavior
  3. Sound & Feedback
  4. Layout
  5. Accessibility
  6. Advanced

### Quick Presets
- **One-Click Presets**
  - Default
  - Dark Mode
  - High Contrast
  - Mobile Optimized
  - Minimal
  - Compact

---

## 📊 Settings Priority

### Phase 1 (Essential - Implement First)
1. ✅ Theme colors (keyboard, keys, special keys)
2. ✅ Keyboard size (small/medium/large)
3. ✅ Position (bottom/top/floating)
4. ✅ Auto-hide behavior
5. ✅ Save settings to localStorage

### Phase 2 (Important - Implement Soon)
6. Sound effects (click sounds)
7. Layout selection (KBDA1/KBDA2)
8. Physical keyboard integration
9. Settings modal UI
10. Export/import settings

### Phase 3 (Nice to Have - Future)
11. Haptic feedback
12. Gesture controls
13. Word history
14. Custom themes with preview
15. Advanced accessibility options

---

## 🔄 Settings Implementation Strategy

### 1. Create Settings Context
```typescript
interface KeyboardSettings {
  theme: ThemeSettings;
  layout: LayoutSettings;
  behavior: BehaviorSettings;
  sound: SoundSettings;
  accessibility: AccessibilitySettings;
  advanced: AdvancedSettings;
}
```

### 2. Settings Component
- ⚙️ Settings icon button on keyboard
- Modal/Dialog for settings UI
- Organized tabs/sections
- Live preview of changes

### 3. Default Configuration
- Ship with sensible defaults
- Easy to customize
- Persistent across sessions

### 4. Props API
```typescript
<ArabicKeyboard
  isVisible={true}
  onToggle={...}
  onWordComplete={...}
  settings={customSettings}  // Optional
  onSettingsChange={...}     // Optional
/>
```

---

## 📝 Notes

- Settings should be **non-breaking**: Default behavior matches current implementation
- Settings should be **intuitive**: Clear labels and descriptions
- Settings should be **accessible**: Keyboard navigation, screen reader support
- Settings should be **performant**: No lag when changing settings
- Settings should be **persistent**: Save to localStorage by default
- Settings should be **exportable**: JSON format for sharing

---

## 🎨 Visual Mockup Ideas

### Settings Button
```
┌─────────────────────────────────────────┐
│  Close                           ⚙️     │
├─────────────────────────────────────────┤
│           [Text Input Area]             │
└─────────────────────────────────────────┘
```

### Settings Modal
```
┌──────────────────────────────────────────┐
│  Keyboard Settings                    ✕  │
├──────────────────────────────────────────┤
│  [Appearance] [Behavior] [Sound] [More]  │
├──────────────────────────────────────────┤
│                                          │
│  Theme:  [Dark ▼] 🎨 Custom             │
│                                          │
│  Keyboard Size: [●━━━━] Large           │
│                                          │
│  Position: [Bottom Center ▼]            │
│                                          │
│  ☐ Auto-hide on blur                    │
│  ☐ Enable sounds                        │
│  ☐ Enable physical keyboard             │
│                                          │
│           [Reset] [Cancel] [Apply]       │
└──────────────────────────────────────────┘
```

---

**Total Configurable Options**: ~100+ settings across 9 categories

**Recommended First Implementation**: 
- Theme colors (5-10 options)
- Keyboard size (3 options)
- Position (3 options)
- Basic behavior toggles (3-5 options)
- Settings UI with save/load

This provides immediate value while keeping implementation manageable.
