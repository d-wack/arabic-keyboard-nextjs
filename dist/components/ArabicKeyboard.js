'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
const ArabicKeyboard = ({ isVisible, onToggle, onWordComplete }) => {
    const [currentText, setCurrentText] = useState('');
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const textAreaRef = useRef(null);
    const blurTimeoutRef = useRef(null);
    // Cleanup timeout on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }
        };
    }, []);
    // Standard Arabic keyboard layout (KBDA1)
    const keyboardLayout = [
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
            { normal: 'مسح', shift: 'مسح', special: 'clear' },
        ],
    ];
    const insertText = (text) => {
        if (!textAreaRef.current)
            return;
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
        if (!textAreaRef.current)
            return;
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
        }
        else if (start > 0) {
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
            setCurrentText('');
        }
    };
    const handleClear = () => {
        var _a;
        setCurrentText('');
        (_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handleKeyClick = (key) => {
        var _a, _b, _c;
        if (key.special === 'backspace') {
            handleBackspace();
        }
        else if (key.special === 'enter') {
            handleEnter();
        }
        else if (key.special === 'space') {
            handleSpace();
        }
        else if (key.special === 'clear') {
            handleClear();
        }
        else if (key.special === 'ctrl') {
            setIsCtrlPressed(!isCtrlPressed);
            (_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else if (key.special === 'shift') {
            setIsShiftPressed(!isShiftPressed);
            (_b = textAreaRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if (key.special === 'alt') {
            // Alt key - currently no functionality
            (_c = textAreaRef.current) === null || _c === void 0 ? void 0 : _c.focus();
            return;
        }
        else {
            let char = key.normal;
            if (isCtrlPressed && key.ctrl) {
                char = key.ctrl;
                setIsCtrlPressed(false);
            }
            else if (isShiftPressed && key.shift) {
                char = key.shift;
                setIsShiftPressed(false); // Auto-reset shift after use
            }
            insertText(char);
        }
    };
    const getKeyDisplay = (key) => {
        if (isCtrlPressed && key.ctrl) {
            return key.ctrl;
        }
        if (isShiftPressed && key.shift !== key.normal) {
            return key.shift;
        }
        return key.normal;
    };
    const getKeyClass = (key) => {
        const baseClass = "font-medium py-3 px-4 rounded-lg min-w-[50px] text-lg transition-all duration-150 hover:scale-105 shadow-lg";
        // Tashkeel marks
        const tashkeelMarks = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ', 'ـ'];
        if (tashkeelMarks.includes(key.normal) || tashkeelMarks.includes(key.shift)) {
            return `${baseClass} bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold`;
        }
        // Numbers
        if (['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'].includes(key.normal)) {
            return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white font-bold min-w-[40px]`;
        }
        // Alif variants (purple when Ctrl is pressed)
        if (key.ctrl && isCtrlPressed) {
            return `${baseClass} bg-purple-500 hover:bg-purple-600 text-white font-bold`;
        }
        // Special keys
        if (key.special === 'backspace') {
            return `${baseClass} bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6`;
        }
        if (key.special === 'enter') {
            return `${baseClass} bg-green-500 hover:bg-green-600 text-white font-bold px-6`;
        }
        if (key.special === 'space') {
            return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white font-bold flex-1 max-w-md`;
        }
        if (key.special === 'clear') {
            return `${baseClass} bg-orange-500 hover:bg-orange-600 text-white font-bold`;
        }
        if (key.special === 'ctrl') {
            return `${baseClass} ${isCtrlPressed ? 'bg-purple-600' : 'bg-purple-500'} hover:bg-purple-600 text-white font-bold px-8`;
        }
        if (key.special === 'shift') {
            return `${baseClass} ${isShiftPressed ? 'bg-blue-600' : 'bg-blue-500'} hover:bg-blue-600 text-white font-bold px-8`;
        }
        if (key.special === 'alt') {
            return `${baseClass} bg-gray-500 hover:bg-gray-600 text-white font-bold px-8`;
        }
        // Regular keys
        return `${baseClass} bg-slate-600 hover:bg-slate-500 text-white`;
    };
    if (!isVisible) {
        return (_jsx("button", { onClick: onToggle, className: "fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-t-xl shadow-lg transition-all duration-300 z-50", children: _jsx("span", { className: "text-lg font-semibold", children: "Open" }) }));
    }
    return (_jsxs(_Fragment, { children: [isVisible && (_jsx("div", { className: "fixed inset-0 z-30", onClick: () => {
                    if (blurTimeoutRef.current) {
                        clearTimeout(blurTimeoutRef.current);
                    }
                    onToggle();
                } })), _jsx("div", { className: `fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`, children: _jsxs("div", { className: "bg-white rounded-t-2xl shadow-2xl overflow-hidden", children: [_jsx("div", { className: "flex justify-center p-2 bg-gray-100 border-b", children: _jsx("button", { onClick: onToggle, className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors", children: _jsx("span", { className: "text-lg font-semibold", children: "Close" }) }) }), _jsx("div", { className: "p-4", children: _jsx("textarea", { ref: textAreaRef, value: currentText, onChange: (e) => setCurrentText(e.target.value), onFocus: () => {
                                    setIsFocused(true);
                                    if (blurTimeoutRef.current) {
                                        clearTimeout(blurTimeoutRef.current);
                                    }
                                }, onBlur: () => {
                                    blurTimeoutRef.current = setTimeout(() => {
                                        setIsFocused(false);
                                        // Don't auto-close keyboard - let user manually close it
                                    }, 200);
                                }, placeholder: "\u0627\u0643\u062A\u0628 \u0647\u0646\u0627...", rows: 1, className: "w-full text-4xl font-arabic resize-none border-2 border-gray-200 rounded-lg p-3 outline-none text-right focus:border-blue-500 transition-colors text-black", style: { direction: 'rtl' } }) }), _jsx("div", { onMouseDown: (e) => {
                                e.preventDefault();
                                if (blurTimeoutRef.current) {
                                    clearTimeout(blurTimeoutRef.current);
                                }
                            }, className: "bg-slate-700 p-6 shadow-2xl", children: keyboardLayout.map((row, rowIndex) => (_jsx("div", { className: "flex justify-center mb-3 gap-2", children: row.map((key, keyIndex) => (_jsx("button", { onClick: () => handleKeyClick(key), className: getKeyClass(key), children: getKeyDisplay(key) }, keyIndex))) }, rowIndex))) })] }) })] }));
};
export default ArabicKeyboard;
//# sourceMappingURL=ArabicKeyboard.js.map