# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Arabic keyboard web application built with Next.js 16, React 19, and TypeScript. It provides an interactive virtual keyboard for typing Arabic text with support for tashkeel (diacritical marks) and special Alif variants. Completed words float across the screen in random positions.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
```

### Testing
```bash
npm test             # Run all tests with Jest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Linting
```bash
npm run lint         # Run ESLint
```

## Architecture

### Component Structure

The application follows a simple 3-component architecture:

1. **`src/app/page.tsx`** (Main Page)
   - Root page component that manages application state
   - Maintains `isKeyboardVisible` toggle state
   - Maintains `completedWords` array
   - Passes callbacks to child components for state updates

2. **`src/components/ArabicKeyboard.tsx`** (Keyboard UI)
   - Virtual keyboard with standard Arabic KBDA1 layout
   - Manages internal state: `currentText`, `isCtrlPressed`, `isShiftPressed`
   - Implements three key input modes:
     - Normal mode: Standard Arabic letters and numbers
     - Shift mode: Tashkeel marks (َ ً ُ ٌ ِ ٍ ْ ّ ـ)
     - Ctrl mode: Alif variants (أ إ آ)
   - Uses textarea with RTL direction for text input
   - Calls `onWordComplete` callback when Enter is pressed

3. **`src/components/WordDisplay.tsx`** (Floating Words)
   - Displays completed words as floating elements
   - Each word has randomized position, size, opacity, and color
   - Limits display to last 15 words for performance
   - Words can be clicked to remove them

### State Flow

```
page.tsx (manages global state)
    ├─> completedWords[] array
    ├─> isKeyboardVisible boolean
    │
    ├─> ArabicKeyboard
    │       ├─ currentText (internal)
    │       ├─ modifier keys state (internal)
    │       └─ calls onWordComplete(word) ──┐
    │                                        │
    └─> WordDisplay                          │
            └─ receives words[] prop <───────┘
```

### Key Implementation Details

- **Keyboard Layout**: Uses a 2D array of `Key` objects with `normal`, `shift`, and optional `ctrl` properties
- **Text Insertion**: Uses textarea selection API for cursor-aware text insertion
- **Modifier Key Behavior**: Ctrl deactivates after use; Shift stays active until toggled
- **Word Completion**: Triggered only by Enter key (clears text after completion)
- **Styling**: Uses Tailwind CSS v4 with PostCSS, custom Arabic font stack (Amiri primary)

## Testing Approach

Tests are located in `src/components/__tests__/` and use:
- Jest with jsdom environment
- React Testing Library
- `@testing-library/jest-dom` for matchers

Test structure:
- Organized by feature groups (Visibility, Text Input, Key Functionality, etc.)
- Focus on user interactions and state changes
- Component integration rather than isolated units

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS 4 (PostCSS plugin)
- **Testing**: Jest 30 + React Testing Library
- **Fonts**: Geist (UI), Amiri (Arabic text)

## Path Aliases

Use `@/*` to reference files in `src/`:
```typescript
import ArabicKeyboard from '@/components/ArabicKeyboard';
```

## Common Patterns

### Adding New Keys
1. Update `keyboardLayout` array in `ArabicKeyboard.tsx`
2. Add handling in `handleKeyClick` if special functionality needed
3. Add styling in `getKeyClass` if custom appearance needed

### Modifying Keyboard Behavior
- Modifier key logic is in `handleKeyClick` function
- Key display logic is in `getKeyDisplay` function
- Text insertion uses `insertText` helper with cursor position management

### Running Single Tests
```bash
npm test -- ArabicKeyboard.test.tsx         # Run specific test file
npm test -- -t "should toggle shift state"   # Run specific test by name
```
