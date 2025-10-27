import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsButton from '../SettingsButton';
import SettingsModal from '../SettingsModal';
import { SettingsProvider } from '@/context/SettingsContext';

// Helper function to render with SettingsProvider
const renderWithSettings = (ui: React.ReactElement) => {
  return render(<SettingsProvider>{ui}</SettingsProvider>);
};

describe('Settings Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  describe('SettingsButton', () => {
    it('should render settings button with gear icon', () => {
      const mockOnClick = jest.fn();
      render(<SettingsButton onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: /open settings/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('title', 'Settings');
    });

    it('should call onClick when clicked', () => {
      const mockOnClick = jest.fn();
      render(<SettingsButton onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: /open settings/i });
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have hover effect class', () => {
      const mockOnClick = jest.fn();
      render(<SettingsButton onClick={mockOnClick} />);

      const button = screen.getByRole('button', { name: /open settings/i });
      expect(button).toHaveClass('hover:bg-gray-200');
    });

    it('should apply custom className', () => {
      const mockOnClick = jest.fn();
      render(<SettingsButton onClick={mockOnClick} className="custom-class" />);

      const button = screen.getByRole('button', { name: /open settings/i });
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('SettingsModal', () => {
    it('should not render when isOpen is false', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByText('⚙️ Keyboard Settings')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('⚙️ Keyboard Settings')).toBeInTheDocument();
    });

    it('should display all 9 tab options', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Theme')).toBeInTheDocument();
      expect(screen.getByText('Layout')).toBeInTheDocument();
      expect(screen.getByText('Behavior')).toBeInTheDocument();
      expect(screen.getByText('Sound')).toBeInTheDocument();
      expect(screen.getByText('Keyboard')).toBeInTheDocument();
      expect(screen.getByText('Mobile')).toBeInTheDocument();
      expect(screen.getByText('Accessibility')).toBeInTheDocument();
      expect(screen.getByText('Typography')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText('Close settings');
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Cancel button is clicked', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Save & Close button is clicked', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      const saveButton = screen.getByText('Save & Close');
      fireEvent.click(saveButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should switch tabs when clicking tab buttons', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Initially on Theme tab
      expect(screen.getByText('Theme Preset')).toBeInTheDocument();

      // Click Layout tab
      const layoutTab = screen.getByText('Layout');
      fireEvent.click(layoutTab);
      expect(screen.getByText('Keyboard Size')).toBeInTheDocument();

      // Click Sound tab
      const soundTab = screen.getByText('Sound');
      fireEvent.click(soundTab);
      expect(screen.getByText('Enable All Sounds')).toBeInTheDocument();
    });

    it('should display theme preset selector on Theme tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('Theme Preset')).toBeInTheDocument();
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should display keyboard size selector on Layout tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Layout tab
      const layoutTab = screen.getByText('Layout');
      fireEvent.click(layoutTab);

      expect(screen.getByText('Keyboard Size')).toBeInTheDocument();
    });

    it('should display sound controls on Sound tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Sound tab
      const soundTab = screen.getByText('Sound');
      fireEvent.click(soundTab);

      expect(screen.getByText('Enable All Sounds')).toBeInTheDocument();
      expect(screen.getByText(/Master Volume:/)).toBeInTheDocument();
      expect(screen.getByText('Keypress Sound')).toBeInTheDocument();
      expect(screen.getByText('Open/Close Sound')).toBeInTheDocument();
    });

    it('should have Reset to Defaults button', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      const resetButton = screen.getByText('Reset to Defaults');
      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toHaveClass('bg-red-500');
    });

    it('should display physical keyboard toggle on Keyboard tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Keyboard tab
      const keyboardTab = screen.getByText('Keyboard');
      fireEvent.click(keyboardTab);

      expect(screen.getByText('Physical Keyboard Highlighting')).toBeInTheDocument();
    });

    it('should show accessibility options on Accessibility tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Accessibility tab
      const accessibilityTab = screen.getByText('Accessibility');
      fireEvent.click(accessibilityTab);

      expect(screen.getByText('ARIA Labels (Screen Reader)')).toBeInTheDocument();
      expect(screen.getByText('Tab Navigation')).toBeInTheDocument();
    });

    it('should show typography options on Typography tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Typography tab
      const typographyTab = screen.getByText('Typography');
      fireEvent.click(typographyTab);

      expect(screen.getByText('Font Family')).toBeInTheDocument();
      expect(screen.getByText('Key Font Size')).toBeInTheDocument();
    });

    it('should show advanced options on Advanced tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      // Click Advanced tab
      const advancedTab = screen.getByText('Advanced');
      fireEvent.click(advancedTab);

      expect(screen.getByText('Animation Performance')).toBeInTheDocument();
      expect(screen.getByText('Debug Mode')).toBeInTheDocument();
    });

    it('should highlight active tab', () => {
      const mockOnClose = jest.fn();
      renderWithSettings(<SettingsModal isOpen={true} onClose={mockOnClose} />);

      const themeTab = screen.getByText('Theme').closest('button');
      expect(themeTab).toHaveClass('bg-blue-100', 'text-blue-700');

      // Click Layout tab
      const layoutTab = screen.getByText('Layout').closest('button');
      if (layoutTab) fireEvent.click(layoutTab);
      
      expect(layoutTab).toHaveClass('bg-blue-100', 'text-blue-700');
    });
  });

  describe('Settings Integration', () => {
    it('should render settings button in keyboard when visible', () => {
      renderWithSettings(
        <>
          <SettingsButton onClick={jest.fn()} />
        </>
      );

      const settingsButton = screen.getByRole('button', { name: /open settings/i });
      expect(settingsButton).toBeInTheDocument();
    });
  });
});
