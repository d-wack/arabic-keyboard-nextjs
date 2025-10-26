export interface Word {
    id: string;
    text: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
}
export interface WordDisplayProps {
    words: string[];
}
declare const WordDisplay: React.FC<WordDisplayProps>;
export default WordDisplay;
//# sourceMappingURL=WordDisplay.d.ts.map