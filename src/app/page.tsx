'use client';

import { useState } from 'react';
import ArabicKeyboard from '@/components/ArabicKeyboard';
import WordDisplay from '@/components/WordDisplay';
import { SettingsProvider } from '@/context/SettingsContext';
import SettingsTestPanel from '@/components/SettingsTestPanel';

export default function Home() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const toggleKeyboard = () => {
    setIsKeyboardVisible(!isKeyboardVisible);
  };

  const handleWordComplete = (word: string) => {
    if (word.trim()) {
      setCompletedWords(prev => [...prev, word.trim()]);
    }
  };

  const clearWords = () => {
    setCompletedWords([]);
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-white relative overflow-hidden">
        <WordDisplay words={completedWords} />
        <SettingsTestPanel />

        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-2xl">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Arabic Keyboard
            </h1>
            <p className="text-xl text-gray-700 mb-12">
              Type beautiful Arabic words and watch them float across your screen
            </p>

            <div className="space-y-6">
              <button
                onClick={toggleKeyboard}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isKeyboardVisible ? 'Hide Keyboard' : 'Open Arabic Keyboard'}
              </button>

              {completedWords.length > 0 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Words typed: {completedWords.length}</p>
                  <button
                    onClick={clearWords}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Clear All Words
                  </button>
                </div>
              )}
            </div>

            {completedWords.length === 0 && (
              <div className="mt-16 p-6 bg-white/70 rounded-xl backdrop-blur-sm border border-white/20">
                <p className="text-gray-600 mb-4">✨ How to use:</p>
                <ol className="text-left text-gray-700 space-y-2">
                  <li><strong>1. Open Keyboard:</strong> Click the button above to start typing</li>
                  <li><strong>2. Tashkeel:</strong> Click the <span className="bg-gray-200 px-2 py-1 rounded">Shift</span> button, then click any letter key to add diacritical marks</li>
                  <li><strong>3. Alif Variants:</strong> Click <span className="bg-purple-200 px-2 py-1 rounded">Ctrl</span>, then click ف (for إ), ل (for أ), or لا (for آ)</li>
                  <li><strong>4. Complete Words:</strong> Press the green <span className="bg-green-200 px-2 py-1 rounded">↵</span> button to complete a word</li>
                  <li><strong>5. Watch &amp; Remove:</strong> Words float on screen - click them to remove</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="font-semibold text-blue-800">💡 Quick Tip:</p>
                  <p className="text-blue-700">Toggle Shift to see which letters give you tashkeel marks!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <ArabicKeyboard
          isVisible={isKeyboardVisible}
          onToggle={toggleKeyboard}
          onWordComplete={handleWordComplete}
        />
      </div>
    </SettingsProvider>
  );
}
