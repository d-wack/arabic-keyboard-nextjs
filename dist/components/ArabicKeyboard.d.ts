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
declare const ArabicKeyboard: React.FC<ArabicKeyboardProps>;
export default ArabicKeyboard;
//# sourceMappingURL=ArabicKeyboard.d.ts.map