'use client';

import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import {
  getKeySizeClasses,
  getKeySpacingClasses,
  getRowSpacingClasses,
  getHoverEffectClasses,
  getShadowClasses,
  getBorderRadiusClasses,
  getPositionClasses,
  getScaleClasses,
  getScaleTransform,
  getFontWeightClasses,
  getResizeClasses,
  getKeyStyles,
  getKeyboardContainerStyles,
  getTextInputStyles,
  getButtonStyles,
  getSlideAnimationClass,
  getZIndexStyle,
  playSound,
  triggerHaptic,
} from '../utils/settingsUtils';

export interface Key {
  normal: string;
  shift: string;
  ctrl?: string;
  special?: string;
}

export interface ArabicKeyboardProps {
  isVisible: boolean;
  onToggle: () => void;
  onWordComplete: (word: string) => void;
}

const ArabicKeyboard: React.FC<ArabicKeyboardProps> = ({ isVisible, onToggle, onWordComplete }) => {
  const { settings } = useSettings();
  const [currentText, setCurrentText] = useState('');
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  // Physical keyboard support - highlight keys when pressed
  useEffect(() => {
    if (!settings.keyboardLayout.enablePhysicalKeyboard || !isVisible) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Update shift/ctrl state
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
      if (e.key === 'Control') {
        setIsCtrlPressed(true);
      }

      // Set pressed key for visual feedback
      const key = e.key;
      setPressedKey(key);

      // Find matching virtual key and highlight it
      playSound('click', settings);
      triggerHaptic('key-press', settings);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Clear shift/ctrl state
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
      if (e.key === 'Control') {
        setIsCtrlPressed(false);
      }

      // Clear pressed key
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [settings, isVisible]);

  // Standard Arabic keyboard layout (KBDA1)
  const keyboardLayout: Key[][] = [
    [
      { normal: 'ذ', shift: 'ّ' },
      { normal: '١', shift: '!' },
      { normal: '٢', shift: '@' },
      { normal: '٣', shift: '#' },
      { normal: '٤', shift: '$' },
      { normal: '٥', shift: '%' },
      { normal: '٦', shift: '^' },
      { normal: '٧', shift: '&' },
      { normal: '٨', shift: '*' },
      { normal: '٩', shift: ')' },
      { normal: '٠', shift: '(' },
      { normal: '-', shift: '_' },
      { normal: '=', shift: '+' },
      { normal: '⌫', shift: '⌫', special: 'backspace' },
    ],
    [
      { normal: 'ض', shift: 'َ' },
      { normal: 'ص', shift: 'ً' },
      { normal: 'ث', shift: 'ُ' },
      { normal: 'ق', shift: 'ٌ' },
      { normal: 'ف', shift: 'لإ', ctrl: 'إ' },
      { normal: 'غ', shift: 'إ' },
      { normal: 'ع', shift: '\'' },
      { normal: 'ه', shift: '÷' },
      { normal: 'خ', shift: '×' },
      { normal: 'ح', shift: '؛' },
      { normal: 'ج', shift: '<' },
      { normal: 'د', shift: '>' },
      { normal: '\\', shift: '|' },
    ],
    [
      { normal: 'ش', shift: 'ِ' },
      { normal: 'س', shift: 'ٍ' },
      { normal: 'ي', shift: ']' },
      { normal: 'ب', shift: '[' },
      { normal: 'ل', shift: 'لأ', ctrl: 'أ' },
      { normal: 'ا', shift: 'أ' },
      { normal: 'ت', shift: 'ـ' },
      { normal: 'ن', shift: '،' },
      { normal: 'م', shift: '/' },
      { normal: 'ك', shift: ':' },
      { normal: 'ط', shift: '"' },
      { normal: '↵', shift: '↵', special: 'enter' },
    ],
    [
      { normal: 'Shift', shift: 'Shift', special: 'shift' },
      { normal: 'ئ', shift: '~' },
      { normal: 'ء', shift: 'ْ' },
      { normal: 'ؤ', shift: '}' },
      { normal: 'ر', shift: '{' },
      { normal: 'لا', shift: 'لآ', ctrl: 'آ' },
      { normal: 'ى', shift: 'آ' },
      { normal: 'ة', shift: '\'' },
      { normal: 'و', shift: ',' },
      { normal: 'ز', shift: '.' },
      { normal: 'ظ', shift: '؟' },
      { normal: '/', shift: '?' },
      { normal: 'Shift', shift: 'Shift', special: 'shift' },
    ],
    [
      { normal: 'Ctrl', shift: 'Ctrl', special: 'ctrl' },
      { normal: 'Alt', shift: 'Alt', special: 'alt' },
      { normal: 'مسافة', shift: 'مسافة', special: 'space' },
      { normal: 'Alt', shift: 'Alt', special: 'alt' },
      { normal: 'إغلاق', shift: 'إغلاق', special: 'close' },
    ],
  ];

  const insertText = (text: string) => {
    if (!textAreaRef.current) return;
    
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = currentText.substring(0, start) + text + currentText.substring(end);
    
    setCurrentText(newText);
    
    setTimeout(() => {
      const newCursorPos = start + text.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const handleBackspace = () => {
    if (!textAreaRef.current) return;
    
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      // Delete selected text
      const newText = currentText.substring(0, start) + currentText.substring(end);
      setCurrentText(newText);
      
      setTimeout(() => {
        textarea.setSelectionRange(start, start);
        textarea.focus();
      }, 0);
    } else if (start > 0) {
      // Delete single character
      const newText = currentText.substring(0, start - 1) + currentText.substring(start);
      setCurrentText(newText);
      
      setTimeout(() => {
        textarea.setSelectionRange(start - 1, start - 1);
        textarea.focus();
      }, 0);
    }
  };

  const handleSpace = () => {
    insertText(' ');
  };

  const handleEnter = () => {
    if (currentText.trim()) {
      onWordComplete(currentText.trim());
      if (settings.behavior.clearOnSubmit) {
        setCurrentText('');
      }
      if (settings.behavior.hideOnWordComplete) {
        onToggle();
      }
    }
  };

  const handleClear = () => {
    setCurrentText('');
    textAreaRef.current?.focus();
  };

  const handleKeyClick = (key: Key) => {
    // Handle close button separately - only play open-close sound
    if (key.special === 'close') {
      playSound('open-close', settings);
      triggerHaptic('open-close', settings);
      onToggle();
      return;
    }
    
    // Play sound and trigger haptic feedback for all other keys
    playSound('click', settings);
    triggerHaptic('key-press', settings);
    
    if (key.special === 'backspace') {
      handleBackspace();
    } else if (key.special === 'enter') {
      handleEnter();
    } else if (key.special === 'space') {
      handleSpace();
    } else if (key.special === 'clear') {
      handleClear();
    } else if (key.special === 'ctrl') {
      setIsCtrlPressed(!isCtrlPressed);
      textAreaRef.current?.focus();
    } else if (key.special === 'shift') {
      setIsShiftPressed(!isShiftPressed);
      textAreaRef.current?.focus();
    } else if (key.special === 'alt') {
      // Alt key - currently no functionality
      textAreaRef.current?.focus();
      return;
    } else {
      let char = key.normal;
      if (isCtrlPressed && key.ctrl) {
        char = key.ctrl;
        setIsCtrlPressed(settings.behavior.ctrlAutoReset ? false : isCtrlPressed);
      } else if (isShiftPressed && key.shift) {
        char = key.shift;
        setIsShiftPressed(settings.behavior.shiftAutoReset ? false : isShiftPressed);
      }
      insertText(char);
    }
  };

  const getKeyDisplay = (key: Key): string => {
    if (isCtrlPressed && key.ctrl) {
      return key.ctrl;
    }
    if (isShiftPressed && key.shift !== key.normal) {
      return key.shift;
    }
    return key.normal;
  };

  // Check if this virtual key matches the pressed physical key
  const isKeyPressed = (key: Key): boolean => {
    if (!pressedKey) return false;
    
    // Check if the pressed physical key matches this virtual key
    const displayChar = getKeyDisplay(key);
    return displayChar === pressedKey || key.normal === pressedKey || key.shift === pressedKey;
  };

  const getKeyClass = (key: Key): string => {
    const keySizeClasses = getKeySizeClasses(settings.layout.keySize);
    const borderRadius = getBorderRadiusClasses(settings.layout.borderRadius);
    const shadow = getShadowClasses(settings.layout.keyShadow);
    const hover = getHoverEffectClasses(settings.layout.hoverEffect);
    const fontWeight = key.special ? 
      getFontWeightClasses(settings.typography.specialKeyFontWeight) : 
      getFontWeightClasses(settings.typography.keyFontWeight);
    
    const baseClass = `${fontWeight} ${keySizeClasses} ${borderRadius} transition-all duration-150 ${hover} ${shadow}`;
    
    // Special key variations for larger widths
    if (key.special === 'backspace' || key.special === 'enter') {
      return `${baseClass} px-6`;
    }
    if (key.special === 'space') {
      return `${baseClass} flex-1 max-w-md`;
    }
    if (key.special === 'ctrl' || key.special === 'shift' || key.special === 'alt' || key.special === 'close') {
      return `${baseClass} px-8`;
    }
    if (['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'].includes(key.normal)) {
      return `${baseClass} min-w-[40px]`;
    }
    
    return baseClass;
  };

  const getKeyStyle = (key: Key): React.CSSProperties => {
    let baseStyles: React.CSSProperties;

    // Tashkeel marks
    const tashkeelMarks = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ', 'ـ'];
    if (tashkeelMarks.includes(key.normal) || tashkeelMarks.includes(key.shift)) {
      baseStyles = getKeyStyles('tashkeel', settings);
    }
    // Numbers
    else if (['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'].includes(key.normal)) {
      baseStyles = getKeyStyles('number', settings);
    }
    // Alif variants (purple when Ctrl is pressed)
    else if (key.ctrl && isCtrlPressed) {
      baseStyles = getKeyStyles('special', settings, isCtrlPressed ? 'active' : 'normal', 'alif-variant');
    }
    // Special keys
    else if (key.special === 'backspace') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'backspace');
    }
    else if (key.special === 'enter') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'enter');
    }
    else if (key.special === 'space') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'space');
    }
    else if (key.special === 'clear') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'clear');
    }
    else if (key.special === 'close') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'close');
    }
    else if (key.special === 'ctrl') {
      baseStyles = getKeyStyles('special', settings, isCtrlPressed ? 'active' : 'normal', 'ctrl');
    }
    else if (key.special === 'shift') {
      baseStyles = getKeyStyles('special', settings, isShiftPressed ? 'active' : 'normal', 'shift');
    }
    else if (key.special === 'alt') {
      baseStyles = getKeyStyles('special', settings, 'normal', 'alt');
    }
    // Regular keys
    else {
      baseStyles = getKeyStyles('regular', settings);
    }

    // Add highlight effect if this key is pressed
    if (isKeyPressed(key)) {
      return {
        ...baseStyles,
        transform: 'scale(0.95)',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        filter: 'brightness(1.2)',
      };
    }
    
    return baseStyles;
  };

  if (!isVisible) {
    const buttonPositionClasses = getPositionClasses(settings.layout.position);
    const buttonStyles = {
      ...getButtonStyles('open', settings),
      ...getZIndexStyle('button', settings),
    };
    
    return (
      <button
        onClick={() => {
          playSound('open-close', settings);
          triggerHaptic('open-close', settings);
          onToggle();
        }}
        style={buttonStyles}
        className={`fixed ${buttonPositionClasses} p-2 ${getBorderRadiusClasses(settings.layout.borderRadius)} shadow-lg transition-all duration-300 hover:scale-105`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="40px" 
          viewBox="0 -960 960 960" 
          width="40px" 
          fill="currentColor"
        >
          <path d="M146.67-200q-27 0-46.84-20.17Q80-240.33 80-266.67v-426.66q0-27 19.83-46.84Q119.67-760 146.67-760h666.66q27 0 46.84 19.83Q880-720.33 880-693.33v426.66q0 26.34-19.83 46.5Q840.33-200 813.33-200H146.67Zm0-66.67h666.66v-426.66H146.67v426.66Zm160-56.66h346.66V-390H306.67v66.67ZM202-446.67h66.67v-66.66H202v66.66Zm122.67 0h66.66v-66.66h-66.66v66.66Zm122 0h66.66v-66.66h-66.66v66.66Zm122.66 0H636v-66.66h-66.67v66.66Zm122 0H758v-66.66h-66.67v66.66ZM202-570h66.67v-66.67H202V-570Zm122.67 0h66.66v-66.67h-66.66V-570Zm122 0h66.66v-66.67h-66.66V-570Zm122.66 0H636v-66.67h-66.67V-570Zm122 0H758v-66.67h-66.67V-570ZM146.67-266.67v-426.66 426.66Z"/>
        </svg>
      </button>
    );
  }

  const keyboardPositionClasses = getPositionClasses(settings.layout.position);
  const keyboardScaleClasses = getScaleClasses(settings.layout.scale);
  const scaleTransform = getScaleTransform(settings.layout.scale);
  const slideAnimation = getSlideAnimationClass(settings, isVisible);
  const keyboardContainerStyles = {
    ...getKeyboardContainerStyles(settings),
    ...getZIndexStyle('keyboard', settings),
    transform: `scale(${scaleTransform})`,
    transformOrigin: settings.layout.position.startsWith('top') ? 'top center' : 'bottom center',
  };
  const overlayStyles = getZIndexStyle('overlay', settings);

  return (
    <>
      {/* Invisible overlay to detect clicks outside */}
      {isVisible && settings.behavior.clickOutsideToClose && (
        <div 
          style={overlayStyles}
          className="fixed inset-0"
          onClick={() => {
            if (blurTimeoutRef.current) {
              clearTimeout(blurTimeoutRef.current);
            }
            playSound('open-close', settings);
            triggerHaptic('open-close', settings);
            onToggle();
          }}
        />
      )}
      
      <div 
        className={`fixed ${keyboardPositionClasses} w-full ${keyboardScaleClasses} transition-transform ease-in-out ${slideAnimation}`}
        style={{
          ...keyboardContainerStyles,
          transitionDuration: `${settings.layout.slideAnimationDuration}ms`,
        }}
      >
      <div className={`bg-white ${getBorderRadiusClasses(settings.layout.borderRadius)} shadow-2xl overflow-hidden`} style={{ backgroundColor: settings.theme.colors.inputBackground }}>
        {/* Text Input Area */}
        <div className="px-6 py-4 flex items-start gap-2">
          <textarea
            ref={textAreaRef}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
              }
            }}
            onBlur={() => {
              if (settings.behavior.autoHideOnBlur) {
                blurTimeoutRef.current = setTimeout(() => {
                  setIsFocused(false);
                  onToggle();
                }, settings.behavior.autoHideDelay);
              }
            }}
            placeholder={settings.behavior.placeholderText}
            rows={settings.behavior.textareaRows}
            maxLength={settings.behavior.maxTextLength || undefined}
            className={`flex-1 text-4xl font-arabic ${getResizeClasses(settings.behavior.textareaResize)} border-2 ${getBorderRadiusClasses(settings.layout.borderRadius)} p-3 outline-none text-right transition-colors text-black`}
            style={{
              ...getTextInputStyles(settings),
              borderColor: isFocused ? settings.theme.colors.inputBorderFocused : settings.theme.colors.inputBorder,
            }}
          />
          <button
            onClick={handleClear}
            style={getKeyStyles('special', settings, 'normal', 'clear')}
            className={`px-4 py-2 ${getBorderRadiusClasses(settings.layout.borderRadius)} transition-colors hover:scale-105 text-lg font-semibold whitespace-nowrap self-stretch`}
          >
            مسح
          </button>
        </div>

        {/* Keyboard */}
        <div 
          onMouseDown={(e) => {
            e.preventDefault();
            if (blurTimeoutRef.current) {
              clearTimeout(blurTimeoutRef.current);
            }
          }}
          className="p-6 shadow-2xl"
          style={{ backgroundColor: settings.theme.colors.keyboardBackground }}
        >
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className={`flex justify-center ${getRowSpacingClasses(settings.layout.rowSpacing)} ${getKeySpacingClasses(settings.layout.keySpacing)}`}>
              {row.map((key, keyIndex) => (
                <button
                  key={keyIndex}
                  onClick={() => handleKeyClick(key)}
                  className={getKeyClass(key)}
                  style={key.special === 'close' ? getButtonStyles('close', settings) : getKeyStyle(key)}
                >
                  {key.special === 'close' ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="40px" 
                      viewBox="0 -960 960 960" 
                      width="40px" 
                      fill="currentColor"
                    >
                      <path d="M836-57 90.33-801.33 138-849l745 745-47 47ZM306.67-323.33V-390H597l66.67 66.67h-357ZM202-446.67v-66.66h66.67v66.66H202Zm122.67 0v-66.66h66.66v66.66h-66.66Zm366.66 0v-66.66H758v66.66h-66.67ZM202-570v-66.67h66.67V-570H202Zm367.33 0v-66.67H636V-570h-66.67Zm122 0v-66.67H758V-570h-66.67ZM860-221l-46.67-47.67v-424.66H389L322.33-760h491q27 0 46.84 19.83Q880-720.33 880-693.33v425.66q0 13.67-5.5 25.67-5.5 12-14.5 21Zm-713.33 21q-27 0-46.84-20.17Q80-240.33 80-266.67v-426.66q0-27 19.83-46.84Q119.67-760 146.67-760H227l66.67 66.67h-147v426.66h573.66L787-200H146.67Zm299-436.67h67.66v66.34l-67.66-66.34Zm123 123.34H636V-447l-67.33-66.33ZM412.33-480Zm188.34-1.33Z"/>
                    </svg>
                  ) : (
                    getKeyDisplay(key)
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ArabicKeyboard;