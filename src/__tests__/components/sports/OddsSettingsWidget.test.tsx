import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OddsSettingsWidget from '@/components/sports/OddsSettingsWidget';

describe('OddsSettingsWidget Component', () => {
  describe('Rendering', () => {
    it('should render the header', () => {
      render(<OddsSettingsWidget />);
      
      expect(screen.getByText('Configurações de odds')).toBeInTheDocument();
    });

    it('should render info icon', () => {
      render(<OddsSettingsWidget />);
      
      expect(screen.getByText('i')).toBeInTheDocument();
    });
  });

  describe('Hover Interaction', () => {
    it('should show options on hover', () => {
      render(<OddsSettingsWidget />);
      
      // Hover over the widget
      const container = screen.getByText('Configurações de odds').closest('div')!.parentElement;
      fireEvent.mouseEnter(container!);
      
      // Options should be visible
      expect(screen.getByText(/Aceitar quaisquer alterações de odds/i)).toBeInTheDocument();
      expect(screen.getByText(/Aceitar alterações de Odds mais altas/i)).toBeInTheDocument();
      expect(screen.getByText(/Não aceitar alterações nas Odds/i)).toBeInTheDocument();
    });

    it('should hide options on mouse leave', () => {
      render(<OddsSettingsWidget />);
      
      // Hover
      const container = screen.getByText('Configurações de odds').closest('div')!.parentElement;
      fireEvent.mouseEnter(container!);
      
      // Leave
      fireEvent.mouseLeave(container!);
      
      // Options should be hidden (max-h-0)
      const optionsContainer = screen.getByText(/Aceitar quaisquer/i).closest('div')!.parentElement;
      expect(optionsContainer).toHaveClass('max-h-0');
    });
  });

  describe('Radio Selection', () => {
    it('should start with higher odds selected by default', () => {
      render(<OddsSettingsWidget />);
      
      // Hover to show options
      const container = screen.getByText('Configurações de odds').closest('div')!.parentElement;
      fireEvent.mouseEnter(container!);
      
      // Find the radio inputs
      const radios = screen.getAllByRole('radio', { hidden: true });
      expect(radios[1]).toBeChecked(); // 'higher' option (index 1)
    });

    it('should allow selecting any odds option', () => {
      render(<OddsSettingsWidget />);
      
      // Hover to show options
      const container = screen.getByText('Configurações de odds').closest('div')!.parentElement;
      fireEvent.mouseEnter(container!);
      
      // Click on "any" option
      const anyLabel = screen.getByText(/Aceitar quaisquer alterações de odds/i).closest('label');
      fireEvent.click(anyLabel!);
      
      const radios = screen.getAllByRole('radio', { hidden: true });
      expect(radios[0]).toBeChecked();
    });

    it('should allow selecting none option', () => {
      render(<OddsSettingsWidget />);
      
      // Hover to show options
      const container = screen.getByText('Configurações de odds').closest('div')!.parentElement;
      fireEvent.mouseEnter(container!);
      
      // Click on "none" option
      const noneLabel = screen.getByText(/Não aceitar alterações nas Odds/i).closest('label');
      fireEvent.click(noneLabel!);
      
      const radios = screen.getAllByRole('radio', { hidden: true });
      expect(radios[2]).toBeChecked();
    });
  });
});
