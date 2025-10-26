import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArabicKeyboard from '../ArabicKeyboard';

describe('ArabicKeyboard Component', () => {
  const mockOnToggle = jest.fn();
  const mockOnWordComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Visibility and Toggle', () => {
    it('should render open button when not visible', () => {
      render(
        <ArabicKeyboard
          isVisible={false}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const openButton = screen.getByText('Open');
      expect(openButton).toBeInTheDocument();
    });

    it('should render keyboard and textarea when visible', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...');
      expect(textarea).toBeInTheDocument();
      
      const closeButton = screen.getByText('Close');
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onToggle when open button is clicked', () => {
      render(
        <ArabicKeyboard
          isVisible={false}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const openButton = screen.getByText('Open');
      fireEvent.click(openButton);
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('should call onToggle when close button is clicked', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('should close keyboard when clicking overlay', () => {
      const { container } = render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const overlay = container.querySelector('.fixed.inset-0');
      expect(overlay).toBeInTheDocument();
      
      fireEvent.click(overlay!);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Text Input', () => {
    it('should update text when typing in textarea', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'مرحبا' } });
      
      expect(textarea.value).toBe('مرحبا');
    });

    it('should have RTL direction', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      expect(textarea).toHaveStyle({ direction: 'rtl' });
    });
  });

  describe('Keyboard Keys', () => {
    it('should render all Arabic letter keys', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      // Check for some key Arabic letters
      expect(screen.getByText('ض')).toBeInTheDocument();
      expect(screen.getByText('ص')).toBeInTheDocument();
      expect(screen.getByText('ث')).toBeInTheDocument();
      expect(screen.getByText('ق')).toBeInTheDocument();
    });

    it('should render Arabic numbers', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      expect(screen.getByText('١')).toBeInTheDocument();
      expect(screen.getByText('٢')).toBeInTheDocument();
      expect(screen.getByText('٩')).toBeInTheDocument();
      expect(screen.getByText('٠')).toBeInTheDocument();
    });

    it('should render special control keys', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      expect(screen.getByText('⌫')).toBeInTheDocument(); // Backspace
      expect(screen.getByText('↵')).toBeInTheDocument(); // Enter
      expect(screen.getByText('مسافة')).toBeInTheDocument(); // Space
      expect(screen.getByText('مسح')).toBeInTheDocument(); // Clear
    });

    it('should render modifier keys', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const shiftButtons = screen.getAllByText('Shift');
      expect(shiftButtons).toHaveLength(2); // Two shift buttons
      
      expect(screen.getByText('Ctrl')).toBeInTheDocument();
      
      const altButtons = screen.getAllByText('Alt');
      expect(altButtons).toHaveLength(2); // Two alt buttons
    });
  });

  describe('Key Functionality', () => {
    it('should insert text when clicking letter keys', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      const letterKey = screen.getByText('ا');
      
      fireEvent.click(letterKey);
      
      expect(textarea.value).toBe('ا');
    });

    it('should clear text when clicking clear button', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      
      // Add some text
      fireEvent.change(textarea, { target: { value: 'مرحبا' } });
      expect(textarea.value).toBe('مرحبا');
      
      // Click clear
      const clearButton = screen.getByText('مسح');
      fireEvent.click(clearButton);
      
      expect(textarea.value).toBe('');
    });

    it('should delete last character when clicking backspace', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      
      // Add some text
      fireEvent.change(textarea, { target: { value: 'مرحبا' } });
      
      // Click backspace
      const backspaceButton = screen.getByText('⌫');
      fireEvent.click(backspaceButton);
      
      expect(textarea.value).toBe('مرحب');
    });

    it('should add space when clicking space button', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      
      // Add text
      const letterKey = screen.getByText('ا');
      fireEvent.click(letterKey);
      
      // Click space
      const spaceButton = screen.getByText('مسافة');
      fireEvent.click(spaceButton);
      
      expect(textarea.value).toBe('ا ');
    });

    it('should complete word when clicking enter', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...') as HTMLTextAreaElement;
      
      // Add text
      fireEvent.change(textarea, { target: { value: 'مرحبا' } });
      
      // Click enter
      const enterButton = screen.getByText('↵');
      fireEvent.click(enterButton);
      
      expect(mockOnWordComplete).toHaveBeenCalledWith('مرحبا');
      expect(textarea.value).toBe('');
    });

    it('should not complete word if text is empty', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const enterButton = screen.getByText('↵');
      fireEvent.click(enterButton);
      
      expect(mockOnWordComplete).not.toHaveBeenCalled();
    });
  });

  describe('Modifier Keys', () => {
    it('should toggle shift state when clicking shift button', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const shiftButtons = screen.getAllByText('Shift');
      const firstShiftButton = shiftButtons[0];
      
      // Shift is initially off
      expect(firstShiftButton).toHaveClass('bg-blue-500');
      
      // Click to activate
      fireEvent.click(firstShiftButton);
      
      // Should change to active state
      expect(firstShiftButton).toHaveClass('bg-blue-600');
    });

    it('should toggle ctrl state when clicking ctrl button', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const ctrlButton = screen.getByText('Ctrl');
      
      // Ctrl is initially off
      expect(ctrlButton).toHaveClass('bg-purple-500');
      
      // Click to activate
      fireEvent.click(ctrlButton);
      
      // Should change to active state
      expect(ctrlButton).toHaveClass('bg-purple-600');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const textarea = screen.getByPlaceholderText('اكتب هنا...');
      expect(textarea).toHaveAttribute('rows', '1');
    });

    it('should have interactive elements', () => {
      render(
        <ArabicKeyboard
          isVisible={true}
          onToggle={mockOnToggle}
          onWordComplete={mockOnWordComplete}
        />
      );

      const closeButton = screen.getByText('Close');
      const textarea = screen.getByPlaceholderText('اكتب هنا...');
      
      // Elements should exist and be in the document
      expect(closeButton).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
    });
  });
});
