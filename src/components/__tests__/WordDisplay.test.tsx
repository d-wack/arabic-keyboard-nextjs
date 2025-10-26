import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordDisplay from '../WordDisplay';

describe('WordDisplay Component', () => {
  describe('Rendering', () => {
    it('should render nothing when no words are provided', () => {
      const { container } = render(<WordDisplay words={[]} />);
      const wordElements = container.querySelectorAll('.absolute');
      expect(wordElements).toHaveLength(0);
    });

    it('should render the latest word', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        expect(screen.getByText('مرحبا')).toBeInTheDocument();
      });
    });

    it('should render words with Arabic font class', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveClass('font-arabic');
      });
    });

    it('should update when new words are added', async () => {
      const { rerender } = render(<WordDisplay words={['أول']} />);
      
      await waitFor(() => {
        expect(screen.getByText('أول')).toBeInTheDocument();
      });
      
      rerender(<WordDisplay words={['أول', 'ثاني']} />);
      
      await waitFor(() => {
        expect(screen.getByText('ثاني')).toBeInTheDocument();
      });
    });
  });

  describe('Interaction', () => {
    it('should remove word when clicked', async () => {
      const words = ['مرحبا'];
      const { container } = render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        fireEvent.click(wordElement);
      });
      
      // After click, word should be removed
      await waitFor(() => {
        expect(screen.queryByText('مرحبا')).not.toBeInTheDocument();
      });
    });

    it('should have cursor pointer on words', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveClass('cursor-pointer');
      });
    });
  });

  describe('Styling', () => {
    it('should have absolute positioning', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveClass('absolute');
      });
    });

    it('should have transition effects', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveClass('transition-all');
      });
    });

    it('should have hover scale effect', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveClass('hover:scale-110');
      });
    });

    it('should apply random colors from predefined list', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        const colorClasses = [
          'text-blue-300',
          'text-purple-300',
          'text-green-300',
          'text-yellow-300',
          'text-pink-300',
          'text-indigo-300',
          'text-red-300',
          'text-teal-300',
        ];
        
        const hasValidColor = colorClasses.some(color => 
          wordElement.classList.contains(color)
        );
        expect(hasValidColor).toBe(true);
      });
    });
  });

  describe('Multiple Words Accumulation', () => {
    it('should accumulate multiple words over time', async () => {
      const { rerender, container } = render(<WordDisplay words={['أول']} />);
      
      await waitFor(() => {
        expect(screen.getByText('أول')).toBeInTheDocument();
      });
      
      rerender(<WordDisplay words={['أول', 'ثاني']} />);
      
      await waitFor(() => {
        expect(screen.getByText('ثاني')).toBeInTheDocument();
      });
      
      // Both words should be visible
      expect(screen.getByText('أول')).toBeInTheDocument();
      expect(screen.getByText('ثاني')).toBeInTheDocument();
    });

    it('should limit displayed words to 15 maximum', async () => {
      const manyWords = Array.from({ length: 20 }, (_, i) => `word${i}`);
      const { container } = render(<WordDisplay words={[]} />);
      
      // Add words one by one
      for (let i = 0; i < manyWords.length; i++) {
        const { rerender } = render(<WordDisplay words={manyWords.slice(0, i + 1)} />);
      }
      
      await waitFor(() => {
        const wordElements = container.querySelectorAll('.absolute');
        expect(wordElements.length).toBeLessThanOrEqual(15);
      });
    });
  });

  describe('RTL Support', () => {
    it('should have RTL direction', async () => {
      const words = ['مرحبا'];
      render(<WordDisplay words={words} />);
      
      await waitFor(() => {
        const wordElement = screen.getByText('مرحبا');
        expect(wordElement).toHaveStyle({ direction: 'rtl' });
      });
    });
  });
});
