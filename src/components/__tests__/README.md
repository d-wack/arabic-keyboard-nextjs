# Arabic Keyboard Tests

This directory contains comprehensive unit tests for the Arabic Keyboard Next.js application.

## Test Structure

### ArabicKeyboard Component Tests (`ArabicKeyboard.test.tsx`)
Tests covering the main keyboard component functionality:

- **Visibility and Toggle**: Tests for opening/closing the keyboard
- **Text Input**: Tests for textarea functionality and RTL support
- **Keyboard Keys**: Tests for rendering all Arabic letters, numbers, and special keys
- **Key Functionality**: Tests for letter insertion, backspace, space, clear, and enter
- **Modifier Keys**: Tests for Shift and Ctrl key toggle functionality
- **Accessibility**: Tests for proper interactive elements
- **Settings Integration**: Tests for settings button visibility

### Settings Component Tests (`Settings.test.tsx`)
Tests covering the settings button and modal:

- **SettingsButton**: Tests for button rendering, click handlers, and styling
- **SettingsModal**: Tests for modal visibility, tab navigation, and controls
- **Tab Switching**: Tests for all 9 settings categories
- **Settings Controls**: Tests for theme, layout, sound, keyboard, mobile, accessibility, typography, and advanced settings
- **Modal Actions**: Tests for close, cancel, save, and reset buttons

### WordDisplay Component Tests (`WordDisplay.test.tsx`)
Tests covering the floating words display component:

- **Rendering**: Tests for word display and updates
- **Interaction**: Tests for click-to-remove functionality
- **Styling**: Tests for positioning, transitions, and hover effects
- **Multiple Words**: Tests for accumulating words and limiting to 15 max
- **RTL Support**: Tests for proper Arabic text direction

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

Current test coverage includes:
- 50+ test cases
- 3 test suites (ArabicKeyboard, WordDisplay, Settings)
- All major component functionality
- Edge cases and error scenarios
- Settings modal with all 9 tabs
- Physical keyboard integration
- Sound system controls

## Testing Technologies

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: User interaction simulation

## Writing New Tests

When adding new features, please ensure:
1. Component behavior is tested
2. User interactions are covered
3. Edge cases are considered
4. Tests are isolated and don't depend on each other
5. Use `waitFor` for async operations
6. Mock external dependencies appropriately
