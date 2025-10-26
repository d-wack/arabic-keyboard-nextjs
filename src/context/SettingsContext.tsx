/**
 * Settings Context
 * 
 * Provides keyboard settings throughout the component tree.
 * Handles loading, saving, and updating settings.
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  KeyboardSettings,
  DEFAULT_SETTINGS,
  getStoredSettings,
  saveSettings,
  resetSettings as resetSettingsUtil,
  exportSettings as exportSettingsUtil,
  importSettings as importSettingsUtil,
  applyThemePreset,
  THEME_PRESETS,
} from '../config/defaultSettings';

// ============================================================================
// Context Type
// ============================================================================

interface SettingsContextType {
  settings: KeyboardSettings;
  updateSettings: (updates: Partial<KeyboardSettings>) => void;
  updateTheme: (updates: Partial<KeyboardSettings['theme']>) => void;
  updateLayout: (updates: Partial<KeyboardSettings['layout']>) => void;
  updateBehavior: (updates: Partial<KeyboardSettings['behavior']>) => void;
  updateSound: (updates: Partial<KeyboardSettings['sound']>) => void;
  updateKeyboardLayout: (updates: Partial<KeyboardSettings['keyboardLayout']>) => void;
  updateMobile: (updates: Partial<KeyboardSettings['mobile']>) => void;
  updateAccessibility: (updates: Partial<KeyboardSettings['accessibility']>) => void;
  updateTypography: (updates: Partial<KeyboardSettings['typography']>) => void;
  updateData: (updates: Partial<KeyboardSettings['data']>) => void;
  updateAdvanced: (updates: Partial<KeyboardSettings['advanced']>) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (jsonString: string) => boolean;
  applyPreset: (preset: keyof typeof THEME_PRESETS) => void;
  isLoading: boolean;
}

// ============================================================================
// Context
// ============================================================================

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface SettingsProviderProps {
  children: React.ReactNode;
  initialSettings?: Partial<KeyboardSettings>;
  onSettingsChange?: (settings: KeyboardSettings) => void;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
  initialSettings,
  onSettingsChange,
}) => {
  const [settings, setSettings] = useState<KeyboardSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const stored = getStoredSettings();
        const merged = initialSettings
          ? { ...stored, ...initialSettings }
          : stored;
        setSettings(merged);
      } catch (error) {
        console.error('Error loading settings:', error);
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [initialSettings]);

  // Save settings when they change
  useEffect(() => {
    if (!isLoading && settings.data.autoSave) {
      saveSettings(settings);
      onSettingsChange?.(settings);
    }
  }, [settings, isLoading, onSettingsChange]);

  // Update entire settings object
  const updateSettings = useCallback((updates: Partial<KeyboardSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Update theme settings
  const updateTheme = useCallback((updates: Partial<KeyboardSettings['theme']>) => {
    setSettings((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...updates,
      },
    }));
  }, []);

  // Update layout settings
  const updateLayout = useCallback((updates: Partial<KeyboardSettings['layout']>) => {
    setSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        ...updates,
      },
    }));
  }, []);

  // Update behavior settings
  const updateBehavior = useCallback((updates: Partial<KeyboardSettings['behavior']>) => {
    setSettings((prev) => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        ...updates,
      },
    }));
  }, []);

  // Update sound settings
  const updateSound = useCallback((updates: Partial<KeyboardSettings['sound']>) => {
    setSettings((prev) => ({
      ...prev,
      sound: {
        ...prev.sound,
        ...updates,
      },
    }));
  }, []);

  // Update keyboard layout settings
  const updateKeyboardLayout = useCallback((updates: Partial<KeyboardSettings['keyboardLayout']>) => {
    setSettings((prev) => ({
      ...prev,
      keyboardLayout: {
        ...prev.keyboardLayout,
        ...updates,
      },
    }));
  }, []);

  // Update mobile settings
  const updateMobile = useCallback((updates: Partial<KeyboardSettings['mobile']>) => {
    setSettings((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        ...updates,
      },
    }));
  }, []);

  // Update accessibility settings
  const updateAccessibility = useCallback((updates: Partial<KeyboardSettings['accessibility']>) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        ...updates,
      },
    }));
  }, []);

  // Update typography settings
  const updateTypography = useCallback((updates: Partial<KeyboardSettings['typography']>) => {
    setSettings((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        ...updates,
      },
    }));
  }, []);

  // Update data settings
  const updateData = useCallback((updates: Partial<KeyboardSettings['data']>) => {
    setSettings((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        ...updates,
      },
    }));
  }, []);

  // Update advanced settings
  const updateAdvanced = useCallback((updates: Partial<KeyboardSettings['advanced']>) => {
    setSettings((prev) => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        ...updates,
      },
    }));
  }, []);

  // Reset to defaults
  const resetSettingsHandler = useCallback(() => {
    const defaults = resetSettingsUtil();
    setSettings(defaults);
    onSettingsChange?.(defaults);
  }, [onSettingsChange]);

  // Export settings as JSON
  const exportSettingsHandler = useCallback(() => {
    return exportSettingsUtil(settings);
  }, [settings]);

  // Import settings from JSON
  const importSettingsHandler = useCallback((jsonString: string) => {
    try {
      const imported = importSettingsUtil(jsonString);
      setSettings(imported);
      saveSettings(imported);
      onSettingsChange?.(imported);
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  }, [onSettingsChange]);

  // Apply theme preset
  const applyPreset = useCallback((preset: keyof typeof THEME_PRESETS) => {
    const updated = applyThemePreset(settings, preset);
    setSettings(updated);
  }, [settings]);

  const value: SettingsContextType = {
    settings,
    updateSettings,
    updateTheme,
    updateLayout,
    updateBehavior,
    updateSound,
    updateKeyboardLayout,
    updateMobile,
    updateAccessibility,
    updateTypography,
    updateData,
    updateAdvanced,
    resetSettings: resetSettingsHandler,
    exportSettings: exportSettingsHandler,
    importSettings: importSettingsHandler,
    applyPreset,
    isLoading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access keyboard settings
 * Must be used within a SettingsProvider
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// ============================================================================
// HOC for components that need settings
// ============================================================================

export function withSettings<P extends object>(
  Component: React.ComponentType<P & { settings: KeyboardSettings }>
) {
  return function SettingsWrappedComponent(props: P) {
    const { settings } = useSettings();
    return <Component {...props} settings={settings} />;
  };
}
