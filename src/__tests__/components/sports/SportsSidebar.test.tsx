import { render, screen, fireEvent } from '@testing-library/react';
import SportsSidebar from '@/components/sports/SportsSidebar';

describe('SportsSidebar Component', () => {
  const mockOnSelectSport = jest.fn();

  beforeEach(() => {
    mockOnSelectSport.mockClear();
  });

  describe('Rendering', () => {
    it('should render the sidebar', () => {
      const { container } = render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render search input', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      expect(screen.getByPlaceholderText('Buscar ligas...')).toBeInTheDocument();
    });

    it('should render "Principais Esportes" header', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      expect(screen.getByText('Principais Esportes')).toBeInTheDocument();
    });

    it('should render search icon', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });
  });

  describe('Sports List', () => {
    it('should render all sports', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('Todos')).toBeInTheDocument();
      expect(screen.getByText('Futebol')).toBeInTheDocument();
      expect(screen.getByText('Basquete')).toBeInTheDocument();
      expect(screen.getByText('eSports')).toBeInTheDocument();
      expect(screen.getByText('Tênis')).toBeInTheDocument();
      expect(screen.getByText('Vôlei')).toBeInTheDocument();
      expect(screen.getByText('MMA')).toBeInTheDocument();
      expect(screen.getByText('Futebol Americano')).toBeInTheDocument();
    });

    it('should render sport icons', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('🌐')).toBeInTheDocument();
    });

    it('should render SVG icons for sports', () => {
      const { container } = render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Selection', () => {
    it('should call onSelectSport when a sport is clicked', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      const futebolButton = screen.getByText('Futebol');
      fireEvent.click(futebolButton);
      
      expect(mockOnSelectSport).toHaveBeenCalledWith('Futebol');
    });

    it('should highlight selected sport', () => {
      render(
        <SportsSidebar selectedSport="Futebol" onSelectSport={mockOnSelectSport} />
      );
      
      const futebolButton = screen.getByText('Futebol').closest('button');
      expect(futebolButton).toHaveClass('bg-tertiary');
    });

    it('should not highlight non-selected sports', () => {
      render(
        <SportsSidebar selectedSport="Futebol" onSelectSport={mockOnSelectSport} />
      );
      
      const basqueteButton = screen.getByText('Basquete').closest('button');
      expect(basqueteButton).not.toHaveClass('bg-tertiary');
    });
  });

  describe('Live Indicators', () => {
    it('should show AO VIVO badge for sports with live events', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      const liveBadges = screen.getAllByText('AO VIVO');
      expect(liveBadges.length).toBeGreaterThan(0);
    });

    it('should show live count for Futebol', () => {
      render(
        <SportsSidebar selectedSport="Futebol" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('999')).toBeInTheDocument();
    });
  });

  describe('Leagues Submenu', () => {
    it('should show leagues when sport is selected', () => {
      render(
        <SportsSidebar selectedSport="Futebol" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('Brasileirão')).toBeInTheDocument();
      expect(screen.getByText('Premier League')).toBeInTheDocument();
      expect(screen.getByText('La Liga')).toBeInTheDocument();
    });

    it('should show NBA league for Basquete', () => {
      render(
        <SportsSidebar selectedSport="Basquete" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('NBA')).toBeInTheDocument();
      expect(screen.getByText('NBB')).toBeInTheDocument();
    });

    it('should not show leagues for sport without leagues', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.queryByText('Brasileirão')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have background class', () => {
      const { container } = render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(container.firstChild).toHaveClass('bg-secondary');
    });

    it('should have flex layout', () => {
      const { container } = render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(container.firstChild).toHaveClass('flex');
    });
  });

  describe('Search Input', () => {
    it('should be focusable', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      const input = screen.getByPlaceholderText('Buscar ligas...');
      input.focus();
      
      expect(document.activeElement).toBe(input);
    });

    it('should allow typing', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      const input = screen.getByPlaceholderText('Buscar ligas...') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Premier' } });
      
      expect(input.value).toBe('Premier');
    });
  });

  describe('Sport Counts', () => {
    it('should display sport counts', () => {
      render(
        <SportsSidebar selectedSport="Todos" onSelectSport={mockOnSelectSport} />
      );
      
      expect(screen.getByText('2500')).toBeInTheDocument(); // Todos count
    });

    it('should display event count for selected sport', () => {
      render(
        <SportsSidebar selectedSport="eSports" onSelectSport={mockOnSelectSport} />
      );
      
      // eSports has 161 live events
      expect(screen.getByText('161')).toBeInTheDocument();
    });
  });
});
