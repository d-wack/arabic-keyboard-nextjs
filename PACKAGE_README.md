# Arabic Keyboard for Next.js

A full-featured, customizable Arabic keyboard component for Next.js and React applications with TypeScript support.

![Version](https://img.shields.io/npm/v/@d-wack/arabic-keyboard-nextjs)
![License](https://img.shields.io/npm/l/@d-wack/arabic-keyboard-nextjs)

## ✨ Features

- ⌨️ **Full Arabic Keyboard Layout** - Standard KBDA1 layout with all Arabic letters
- 🔤 **Tashkeel Support** - Complete diacritical marks (َ ً ُ ٌ ِ ٍ ْ ّ)
- 📝 **Alif Variants** - Easy input for أ إ آ with Ctrl key
- 🎨 **Customizable Styling** - Built with Tailwind CSS, easily customizable
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **TypeScript** - Full type safety and IntelliSense support
- ✅ **Fully Tested** - 34 unit tests, 100% passing
- 🐛 **Bug-Free** - All critical bugs fixed (auto-close, backspace, memory leaks)

## 📦 Installation

```bash
npm install @d-wack/arabic-keyboard-nextjs
```

or with yarn:

```bash
yarn add @d-wack/arabic-keyboard-nextjs
```

## 🚀 Quick Start

### 1. Import the components

```tsx
'use client'; // Required for Next.js App Router

import { useState } from 'react';
import { ArabicKeyboard, WordDisplay } from '@d-wack/arabic-keyboard-nextjs';
import '@d-wack/arabic-keyboard-nextjs/styles';
```

### 2. Use in your component

```tsx
export default function MyPage() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const handleWordComplete = (word: string) => {
    if (word.trim()) {
      setCompletedWords(prev => [...prev, word.trim()]);
    }
  };

  return (
    <div>
      <button onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}>
        Toggle Keyboard
      </button>

      <WordDisplay words={completedWords} />

      <ArabicKeyboard
        isVisible={isKeyboardVisible}
        onToggle={() => setIsKeyboardVisible(!isKeyboardVisible)}
        onWordComplete={handleWordComplete}
      />
    </div>
  );
}
```

### 3. Add Arabic Font (Optional but Recommended)

Add to your `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.font-arabic {
  font-family: 'Amiri', 'Noto Sans Arabic', 'Scheherazade New', 'Traditional Arabic', 'Arabic Typesetting', Arial, sans-serif;
}
```

## 📖 API Reference

### ArabicKeyboard

Main keyboard component for typing Arabic text.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls keyboard visibility |
| `onToggle` | `() => void` | Yes | Callback when keyboard is toggled |
| `onWordComplete` | `(word: string) => void` | Yes | Callback when a word is completed (Enter pressed) |

#### Example

```tsx
<ArabicKeyboard
  isVisible={true}
  onToggle={() => console.log('Toggled')}
  onWordComplete={(word) => console.log('Completed:', word)}
/>
```

### WordDisplay

Component to display completed words floating on screen.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `words` | `string[]` | Yes | Array of words to display |

#### Example

```tsx
<WordDisplay words={['مرحبا', 'السلام عليكم', 'كيف حالك']} />
```

## 🎯 Usage Guide

### Keyboard Features

1. **Basic Typing**: Click any Arabic letter key to type
2. **Tashkeel (Diacritics)**: 
   - Press `Shift` button
   - Click a letter key to add diacritical marks
   - Shift auto-resets after use
3. **Alif Variants**:
   - Press `Ctrl` button
   - Click ف for إ, ل for أ, or لا for آ
   - Ctrl auto-resets after use
4. **Special Keys**:
   - `⌫` Backspace - Delete characters (supports text selection)
   - `↵` Enter - Complete and submit word
   - `مسافة` Space - Add space character
   - `مسح` Clear - Clear all text

### Keyboard Shortcuts

The keyboard supports text selection, cursor positioning, and standard editing operations.

## 🎨 Styling

The keyboard comes pre-styled with Tailwind CSS. You can customize it by:

1. **Override CSS classes**: All components use standard Tailwind classes
2. **Custom themes**: Modify color schemes in your Tailwind config
3. **Layout changes**: Fork and modify component structure

## 🔧 TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  ArabicKeyboardProps, 
  WordDisplayProps, 
  Key, 
  Word 
} from '@d-wack/arabic-keyboard-nextjs';
```

## 📱 Requirements

- React 18.0+ or 19.0+
- Next.js 13+ (App Router or Pages Router)
- Tailwind CSS 3.0+

## 🧪 Testing

The package includes comprehensive test coverage:

```bash
npm test
```

## 🐛 Known Issues

All major bugs have been fixed in v1.0.0:
- ✅ Auto-close keyboard issue resolved
- ✅ Backspace now handles text selections
- ✅ Memory leaks fixed
- ✅ Shift key auto-resets
- ✅ Proper TypeScript configuration

## 📄 License

MIT © d-wack

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 🔗 Links

- [GitHub Repository](https://github.com/d-wack/arabic-keyboard-nextjs)
- [Report Issues](https://github.com/d-wack/arabic-keyboard-nextjs/issues)
- [NPM Package](https://www.npmjs.com/package/@d-wack/arabic-keyboard-nextjs)

## 📝 Changelog

### v1.0.0 (2025-10-27)
- Initial release
- Full Arabic keyboard with KBDA1 layout
- Tashkeel and Alif variant support
- TypeScript support
- Comprehensive test coverage
- Bug fixes: auto-close, backspace, memory leaks

---

Made with ❤️ by d-wack
