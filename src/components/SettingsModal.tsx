'use client';

import { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { THEME_PRESETS } from '@/config/defaultSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'theme' | 'layout' | 'behavior' | 'sound' | 'keyboard' | 'mobile' | 'accessibility' | 'typography' | 'advanced';

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateTheme, updateLayout, updateBehavior, updateSound, updateKeyboardLayout, updateMobile, updateAccessibility, updateTypography, updateAdvanced, applyPreset, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>('theme');

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'behavior', label: 'Behavior', icon: '⚡' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'keyboard', label: 'Keyboard', icon: '⌨️' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'typography', label: 'Typography', icon: '🔤' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">⚙️ Keyboard Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
            aria-label="Close settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Settings</h3>
                  
                  {/* Theme Preset */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme Preset
                    </label>
                    <select
                      value={settings.theme.preset}
                      onChange={(e) => applyPreset(e.target.value as keyof typeof THEME_PRESETS)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="high-contrast">High Contrast</option>
                      <option value="colorful">Colorful</option>
                      <option value="minimal">Minimal</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose a pre-configured theme</p>
                  </div>

                  {/* Keyboard Background */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keyboard Background
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.colors.keyboardBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, keyboardBackground: e.target.value } })}
                        className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={settings.theme.colors.keyboardBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, keyboardBackground: e.target.value } })}
                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Regular Key Background */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regular Key Background
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.colors.regularKeyBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, regularKeyBackground: e.target.value } })}
                        className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={settings.theme.colors.regularKeyBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, regularKeyBackground: e.target.value } })}
                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Regular Key Text */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.colors.regularKeyText}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, regularKeyText: e.target.value } })}
                        className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={settings.theme.colors.regularKeyText}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, regularKeyText: e.target.value } })}
                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Input Background */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Input Background
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.theme.colors.inputBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, inputBackground: e.target.value } })}
                        className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={settings.theme.colors.inputBackground}
                        onChange={(e) => updateTheme({ colors: { ...settings.theme.colors, inputBackground: e.target.value } })}
                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 italic mt-4">
                    💡 For detailed color customization of all key types, export your settings, edit the JSON, and re-import.
                  </p>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Settings</h3>

                {/* Keyboard Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keyboard Size
                  </label>
                  <select
                    value={settings.layout.scale}
                    onChange={(e) => updateLayout({ scale: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small (70%)</option>
                    <option value="medium">Medium (85%)</option>
                    <option value="large">Large (100%)</option>
                    <option value="xl">Extra Large (115%)</option>
                  </select>
                </div>

                {/* Key Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Size
                  </label>
                  <select
                    value={settings.layout.keySize}
                    onChange={(e) => updateLayout({ keySize: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                    <option value="touch-optimized">Touch Optimized</option>
                  </select>
                </div>

                {/* Position */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keyboard Position
                  </label>
                  <select
                    value={settings.layout.position}
                    onChange={(e) => updateLayout({ position: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                  </select>
                </div>

                {/* Key Spacing */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Spacing
                  </label>
                  <select
                    value={settings.layout.keySpacing}
                    onChange={(e) => updateLayout({ keySpacing: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="comfortable">Comfortable</option>
                  </select>
                </div>

                {/* Border Radius */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius
                  </label>
                  <select
                    value={settings.layout.borderRadius}
                    onChange={(e) => updateLayout({ borderRadius: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None (Square)</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large</option>
                  </select>
                </div>

                {/* Key Shadow */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Shadow
                  </label>
                  <select
                    value={settings.layout.keyShadow}
                    onChange={(e) => updateLayout({ keyShadow: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {/* Show Shift Labels - Removed (not in interface) */}
              </div>
            )}

            {/* Behavior Tab */}
            {activeTab === 'behavior' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Behavior Settings</h3>

                {/* Shift Auto Reset */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Auto Reset Shift After Key Press
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Shift returns to normal after typing</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.behavior.shiftAutoReset}
                    onChange={(e) => updateBehavior({ shiftAutoReset: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Shift Toggle Mode */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Shift Toggle Mode (Caps Lock)
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Click Shift to toggle uppercase mode</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.behavior.shiftToggleMode}
                    onChange={(e) => updateBehavior({ shiftToggleMode: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Hide on Word Complete */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Hide Keyboard on Word Complete
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Keyboard closes when a word is completed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.behavior.hideOnWordComplete}
                    onChange={(e) => updateBehavior({ hideOnWordComplete: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Click Outside to Close */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Click Outside to Close
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Close keyboard when clicking outside</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.behavior.clickOutsideToClose}
                    onChange={(e) => updateBehavior({ clickOutsideToClose: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Clear on Submit */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Clear Text on Submit
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Clear text when Enter is pressed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.behavior.clearOnSubmit}
                    onChange={(e) => updateBehavior({ clearOnSubmit: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Space Key Action */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Space Key Action
                  </label>
                  <select
                    value={settings.behavior.spaceKeyAction}
                    onChange={(e) => updateBehavior({ spaceKeyAction: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="insert-space">Insert Space Only</option>
                    <option value="complete-word">Complete Word Only</option>
                    <option value="both">Insert Space & Complete Word</option>
                  </select>
                </div>

                {/* Text Direction */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Direction
                  </label>
                  <select
                    value={settings.behavior.textDirection}
                    onChange={(e) => updateBehavior({ textDirection: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rtl">Right-to-Left (RTL)</option>
                    <option value="ltr">Left-to-Right (LTR)</option>
                    <option value="auto">Automatic</option>
                  </select>
                </div>
              </div>
            )}

            {/* Sound Tab */}
            {activeTab === 'sound' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sound Settings</h3>

                {/* Master Sound Toggle */}
                <div className="mb-6 flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 block">
                      Enable All Sounds
                    </label>
                    <p className="text-xs text-gray-600 mt-1">Master control for all audio feedback</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.sound.soundEnabled}
                    onChange={(e) => updateSound({ soundEnabled: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Master Volume */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Master Volume: {settings.sound.masterVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.sound.masterVolume}
                    onChange={(e) => updateSound({ masterVolume: parseInt(e.target.value) })}
                    disabled={!settings.sound.soundEnabled}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                  />
                </div>

                <hr className="my-6" />

                {/* Keypress Sound */}
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Keypress Sound
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.sound.clickSoundEnabled}
                    onChange={(e) => updateSound({ clickSoundEnabled: e.target.checked })}
                    disabled={!settings.sound.soundEnabled}
                    className="w-5 h-5 cursor-pointer disabled:opacity-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Keypress Volume: {settings.sound.clickSoundVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.sound.clickSoundVolume}
                    onChange={(e) => updateSound({ clickSoundVolume: parseInt(e.target.value) })}
                    disabled={!settings.sound.soundEnabled || !settings.sound.clickSoundEnabled}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Open/Close Sound */}
                <div className="mb-4 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Open/Close Sound
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.sound.openCloseSoundEnabled}
                    onChange={(e) => updateSound({ openCloseSoundEnabled: e.target.checked })}
                    disabled={!settings.sound.soundEnabled}
                    className="w-5 h-5 cursor-pointer disabled:opacity-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Open/Close Volume: {settings.sound.openCloseSoundVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.sound.openCloseSoundVolume}
                    onChange={(e) => updateSound({ openCloseSoundVolume: parseInt(e.target.value) })}
                    disabled={!settings.sound.soundEnabled || !settings.sound.openCloseSoundEnabled}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Haptic Feedback */}
                <hr className="my-6" />
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Haptic Feedback (Mobile)
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Vibration on key press</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.sound.hapticFeedback}
                    onChange={(e) => updateSound({ hapticFeedback: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Keyboard Tab */}
            {activeTab === 'keyboard' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Settings</h3>

                {/* Keyboard Layout */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keyboard Layout
                  </label>
                  <select
                    value={settings.keyboardLayout.layout}
                    onChange={(e) => updateKeyboardLayout({ layout: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="KBDA1">Arabic 101 (Standard)</option>
                    <option value="KBDA2">Arabic 102</option>
                    <option value="AZERTY">Arabic AZERTY</option>
                    <option value="QWERTY">Arabic QWERTY</option>
                    <option value="custom">Custom Layout</option>
                  </select>
                </div>

                {/* Show Numbers */}
                <div className="mb-6 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Numbers Row
                  </label>
                  <input
                    type="checkbox"
                    checked={settings.keyboardLayout.showNumbers}
                    onChange={(e) => updateKeyboardLayout({ showNumbers: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Show Tashkeel Keys */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Show Tashkeel (Diacritics) Keys
                  </label>
                  <select
                    value={settings.keyboardLayout.showTashkeelKeys}
                    onChange={(e) => updateKeyboardLayout({ showTashkeelKeys: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="always">Always Show</option>
                    <option value="shift-only">Show When Shift Pressed</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                {/* Physical Keyboard Integration */}
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-900">
                      Physical Keyboard Highlighting
                    </label>
                    <input
                      type="checkbox"
                      checked={settings.keyboardLayout.enablePhysicalKeyboard}
                      onChange={(e) => updateKeyboardLayout({ enablePhysicalKeyboard: e.target.checked })}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Highlights virtual keys when you type on your physical Arabic keyboard
                  </p>
                </div>

                {/* Show Alif Variants */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Show Alif Variants (with Ctrl)
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Show أ، إ، آ when Ctrl is pressed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.keyboardLayout.showAlifVariants}
                    onChange={(e) => updateKeyboardLayout({ showAlifVariants: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Mobile Tab */}
            {activeTab === 'mobile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile Settings</h3>

                {/* Touch Feedback */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Touch Feedback
                  </label>
                  <select
                    value={settings.mobile.touchFeedback}
                    onChange={(e) => updateMobile({ touchFeedback: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="highlight">Highlight Only</option>
                    <option value="scale">Scale Effect</option>
                    <option value="both">Highlight & Scale</option>
                  </select>
                </div>

                {/* Touch Area Padding */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Touch Area Padding
                  </label>
                  <select
                    value={settings.mobile.touchAreaPadding}
                    onChange={(e) => updateMobile({ touchAreaPadding: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {/* Swipe to Hide */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Swipe to Hide Keyboard
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Swipe down to close keyboard</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.mobile.swipeToHide}
                    onChange={(e) => updateMobile({ swipeToHide: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Long Press Action */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Press Action
                  </label>
                  <select
                    value={settings.mobile.longPressAction}
                    onChange={(e) => updateMobile({ longPressAction: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="show-alt-chars">Show Alternative Characters</option>
                    <option value="context-menu">Show Context Menu</option>
                    <option value="copy-key">Copy Key</option>
                  </select>
                </div>

                {/* Pinch to Resize */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Pinch to Resize
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Pinch gesture to resize keyboard</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.mobile.pinchToResize}
                    onChange={(e) => updateMobile({ pinchToResize: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Accessibility Tab */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility Settings</h3>

                {/* ARIA Labels */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ARIA Labels (Screen Reader)
                  </label>
                  <select
                    value={settings.accessibility.ariaLabels}
                    onChange={(e) => updateAccessibility({ ariaLabels: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="full">Full (All Keys Labeled)</option>
                    <option value="partial">Partial (Important Keys Only)</option>
                    <option value="none">None</option>
                  </select>
                </div>

                {/* Announce Key Presses */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Announce Key Presses
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Screen reader announces each key</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility.announceKeyPresses}
                    onChange={(e) => updateAccessibility({ announceKeyPresses: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Tab Navigation
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Navigate keys with Tab key</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility.tabNavigation}
                    onChange={(e) => updateAccessibility({ tabNavigation: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Arrow Key Navigation */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Arrow Key Navigation
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Navigate keys with arrow keys</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility.arrowKeyNavigation}
                    onChange={(e) => updateAccessibility({ arrowKeyNavigation: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Focus Indicator */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Indicator
                  </label>
                  <select
                    value={settings.accessibility.focusIndicator}
                    onChange={(e) => updateAccessibility({ focusIndicator: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="default">Default Browser Style</option>
                    <option value="enhanced">Enhanced Outline</option>
                    <option value="custom">Custom Color</option>
                  </select>
                </div>

                {/* Auto Detect High Contrast */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Auto Detect High Contrast Mode
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Detect system high contrast settings</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility.autoDetectHighContrast}
                    onChange={(e) => updateAccessibility({ autoDetectHighContrast: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Respect System Font Size */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Respect System Font Size
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Use system font scaling preferences</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.accessibility.respectSystemFontSize}
                    onChange={(e) => updateAccessibility({ respectSystemFontSize: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Typography Tab */}
            {activeTab === 'typography' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography Settings</h3>

                {/* Font Family */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={settings.typography.fontFamily}
                    onChange={(e) => updateTypography({ fontFamily: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Amiri">Amiri (Classic Serif)</option>
                    <option value="Noto Sans Arabic">Noto Sans Arabic (Modern)</option>
                    <option value="Scheherazade New">Scheherazade New (Traditional)</option>
                    <option value="Traditional Arabic">Traditional Arabic</option>
                    <option value="custom">Custom Font</option>
                  </select>
                </div>

                {/* Key Font Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Font Size
                  </label>
                  <select
                    value={settings.typography.keyFontSize}
                    onChange={(e) => updateTypography({ keyFontSize: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>

                {/* Input Font Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Area Font Size
                  </label>
                  <select
                    value={settings.typography.inputFontSize}
                    onChange={(e) => updateTypography({ inputFontSize: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xl">Extra Large</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>

                {/* Key Font Weight */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Font Weight
                  </label>
                  <select
                    value={settings.typography.keyFontWeight}
                    onChange={(e) => updateTypography({ keyFontWeight: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semi Bold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                {/* Special Key Font Weight */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Key Font Weight
                  </label>
                  <select
                    value={settings.typography.specialKeyFontWeight}
                    onChange={(e) => updateTypography({ specialKeyFontWeight: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semi Bold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>

                {/* Animation Performance */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animation Performance
                  </label>
                  <select
                    value={settings.advanced.animationPerformance}
                    onChange={(e) => updateAdvanced({ animationPerformance: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High Quality (Smooth)</option>
                    <option value="balanced">Balanced</option>
                    <option value="performance">Performance (Fast)</option>
                    <option value="none">None (Instant)</option>
                  </select>
                </div>

                {/* Debounce Key Press */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Debounce Key Press
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Prevent accidental double-presses</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.advanced.debounceKeyPress}
                    onChange={(e) => updateAdvanced({ debounceKeyPress: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {settings.advanced.debounceKeyPress && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Debounce Delay: {settings.advanced.debounceDelay}ms
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={settings.advanced.debounceDelay}
                      onChange={(e) => updateAdvanced({ debounceDelay: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Debug Mode */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Debug Mode
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Show console logs and debug info</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.advanced.debugMode}
                    onChange={(e) => updateAdvanced({ debugMode: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Log Events */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Log Events
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Log all keyboard events to console</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.advanced.logEvents}
                    onChange={(e) => updateAdvanced({ logEvents: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Show Performance Metrics */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Show Performance Metrics
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Display FPS and render time</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.advanced.showPerformanceMetrics}
                    onChange={(e) => updateAdvanced({ showPerformanceMetrics: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                {/* Custom CSS Classes */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block">
                      Enable Custom CSS Classes
                    </label>
                    <p className="text-xs text-gray-500 mt-1">Allow custom CSS styling</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.advanced.customCssClasses}
                    onChange={(e) => updateAdvanced({ customCssClasses: e.target.checked })}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={resetSettings}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
          >
            Reset to Defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
