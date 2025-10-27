'use client';

import { useSettings } from '@/context/SettingsContext';
import { THEME_PRESETS } from '@/config/defaultSettings';

export default function SettingsTestPanel() {
  const { settings, updateLayout, updateTheme, updateSound, applyPreset, resetSettings } = useSettings();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-xl border-2 border-gray-200 max-w-xs max-h-[90vh] overflow-y-auto">
      <h3 className="font-bold text-lg mb-3 text-gray-900">⚙️ Settings Test Panel</h3>
      
      {/* Sound Settings */}
      <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
        <h4 className="font-semibold text-sm mb-2 text-gray-900">🔊 Sound Settings</h4>
        
        {/* Master Sound Toggle */}
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-800">Enable Sound:</label>
          <input
            type="checkbox"
            checked={settings.sound.soundEnabled}
            onChange={(e) => updateSound({ soundEnabled: e.target.checked })}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Master Volume */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Master Volume: {settings.sound.masterVolume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sound.masterVolume}
            onChange={(e) => updateSound({ masterVolume: parseInt(e.target.value) })}
            disabled={!settings.sound.soundEnabled}
            className="w-full"
          />
        </div>

        {/* Keypress Sound Toggle */}
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-gray-700">Keypress Sound:</label>
          <input
            type="checkbox"
            checked={settings.sound.clickSoundEnabled}
            onChange={(e) => updateSound({ clickSoundEnabled: e.target.checked })}
            disabled={!settings.sound.soundEnabled}
            className="w-4 h-4 cursor-pointer"
          />
        </div>

        {/* Keypress Volume */}
        <div className="mb-3">
          <label className="block text-xs text-gray-700 mb-1">
            Keypress Vol: {settings.sound.clickSoundVolume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sound.clickSoundVolume}
            onChange={(e) => updateSound({ clickSoundVolume: parseInt(e.target.value) })}
            disabled={!settings.sound.soundEnabled || !settings.sound.clickSoundEnabled}
            className="w-full"
          />
        </div>

        {/* Open/Close Sound Toggle */}
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-gray-700">Open/Close Sound:</label>
          <input
            type="checkbox"
            checked={settings.sound.openCloseSoundEnabled}
            onChange={(e) => updateSound({ openCloseSoundEnabled: e.target.checked })}
            disabled={!settings.sound.soundEnabled}
            className="w-4 h-4 cursor-pointer"
          />
        </div>

        {/* Open/Close Volume */}
        <div className="mb-2">
          <label className="block text-xs text-gray-700 mb-1">
            Open/Close Vol: {settings.sound.openCloseSoundVolume}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sound.openCloseSoundVolume}
            onChange={(e) => updateSound({ openCloseSoundVolume: parseInt(e.target.value) })}
            disabled={!settings.sound.soundEnabled || !settings.sound.openCloseSoundEnabled}
            className="w-full"
          />
        </div>
      </div>
      {/* Theme Preset */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Theme Preset:</label>
        <select
          value={settings.theme.preset}
          onChange={(e) => applyPreset(e.target.value as keyof typeof THEME_PRESETS)}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="high-contrast">High Contrast</option>
          <option value="colorful">Colorful</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>

      {/* Keyboard Size */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Keyboard Size:</label>
        <select
          value={settings.layout.scale}
          onChange={(e) => updateLayout({ scale: e.target.value as any })}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>

      {/* Key Size */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Key Size:</label>
        <select
          value={settings.layout.keySize}
          onChange={(e) => updateLayout({ keySize: e.target.value as any })}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
          <option value="touch-optimized">Touch Optimized</option>
        </select>
      </div>

      {/* Position */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Position:</label>
        <select
          value={settings.layout.position}
          onChange={(e) => updateLayout({ position: e.target.value as any })}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="bottom-center">Bottom Center</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="top-center">Top Center</option>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
        </select>
      </div>

      {/* Border Radius */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Border Radius:</label>
        <select
          value={settings.layout.borderRadius}
          onChange={(e) => updateLayout({ borderRadius: e.target.value as any })}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="none">None</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>

      {/* Shadow */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-800">Key Shadow:</label>
        <select
          value={settings.layout.keyShadow}
          onChange={(e) => updateLayout({ keyShadow: e.target.value as any })}
          className="w-full p-2 border rounded text-gray-900 bg-white"
        >
          <option value="none">None</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetSettings}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Reset to Defaults
      </button>

      <div className="mt-3 text-xs text-gray-600 font-medium">
        Settings persist in localStorage
      </div>
    </div>
  );
}
