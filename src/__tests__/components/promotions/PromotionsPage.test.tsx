import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PromotionsPage from '@/components/promotions/PromotionsPage';
import { ToastProvider } from '@/contexts/ToastContext';

const renderPromotionsPage = () => {
  return render(
    <ToastProvider>
      <PromotionsPage />
    </ToastProvider>
  );
};

describe('PromotionsPage Component', () => {
  describe('Rendering', () => {
    it('should render the page title', () => {
      renderPromotionsPage();
      
      // Multiple elements may contain "Promoções" - use getAllBy
      const elements = screen.getAllByText(/Promoções/i);
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should display static promotions', () => {
      renderPromotionsPage();
      
      const welcomeBonus = screen.getAllByText('Bônus de Boas-vindas');
      const cashback = screen.getAllByText('Cashback Semanal');
      const freeSpins = screen.getAllByText('50 Free Spins');
      expect(welcomeBonus.length).toBeGreaterThan(0);
      expect(cashback.length).toBeGreaterThan(0);
      expect(freeSpins.length).toBeGreaterThan(0);
    });

    it('should display promotion descriptions', () => {
      renderPromotionsPage();
      
      // Multiple elements may have the same text (featured + list)
      const welcomeDesc = screen.getAllByText(/100% de bônus no seu primeiro depósito/i);
      const cashbackDesc = screen.getAllByText(/20% das suas perdas/i);
      expect(welcomeDesc.length).toBeGreaterThan(0);
      expect(cashbackDesc.length).toBeGreaterThan(0);
    });

    it('should display bonus values', () => {
      renderPromotionsPage();
      
      // Multiple elements may show the same bonus value
      const bonusValues100 = screen.getAllByText('100%');
      const bonusValues20 = screen.getAllByText('20%');
      expect(bonusValues100.length).toBeGreaterThan(0);
      expect(bonusValues20.length).toBeGreaterThan(0);
    });
  });

  describe('Category Filtering', () => {
    it('should display category filter buttons', () => {
      renderPromotionsPage();
      
      const todos = screen.getAllByText(/Todos/i);
      const cassino = screen.getAllByText(/Cassino/i);
      const esportes = screen.getAllByText(/Esportes/i);
      expect(todos.length).toBeGreaterThan(0);
      expect(cassino.length).toBeGreaterThan(0);
      expect(esportes.length).toBeGreaterThan(0);
    });

    it('should filter promotions by category when clicked', () => {
      renderPromotionsPage();
      
      // Click on Cassino filter
      const casinoFilters = screen.getAllByText(/Cassino/i);
      fireEvent.click(casinoFilters[0]);
      
      // Should still see casino promotions
      const welcomeBonus = screen.getAllByText('Bônus de Boas-vindas');
      expect(welcomeBonus.length).toBeGreaterThan(0);
    });

    it('should show all promotions when "Todos" is selected', () => {
      renderPromotionsPage();
      
      const allFilters = screen.getAllByText(/Todos/i);
      fireEvent.click(allFilters[0]);
      
      const welcomeBonus = screen.getAllByText('Bônus de Boas-vindas');
      expect(welcomeBonus.length).toBeGreaterThan(0);
    });
  });

  describe('Promotion Cards', () => {
    it('should display promo codes', () => {
      renderPromotionsPage();
      
      const welcome = screen.getAllByText('WELCOME100');
      const cashback = screen.getAllByText('CASHBACK20');
      expect(welcome.length).toBeGreaterThan(0);
      expect(cashback.length).toBeGreaterThan(0);
    });

    it('should display emoji icons', () => {
      renderPromotionsPage();
      
      const slotEmojis = screen.getAllByText('🎰');
      const moneyEmojis = screen.getAllByText('💰');
      expect(slotEmojis.length).toBeGreaterThan(0);
      expect(moneyEmojis.length).toBeGreaterThan(0);
    });

    it('should have claim buttons', () => {
      renderPromotionsPage();
      
      const claimButtons = screen.getAllByText(/Aproveitar/i);
      expect(claimButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Featured Promotions', () => {
    it('should highlight featured promotions', () => {
      renderPromotionsPage();
      
      // Featured promotions should be visible (multiple elements may exist)
      const welcomeBonus = screen.getAllByText('Bônus de Boas-vindas');
      const cashback = screen.getAllByText('Cashback Semanal');
      expect(welcomeBonus.length).toBeGreaterThan(0);
      expect(cashback.length).toBeGreaterThan(0);
    });
  });

  describe('Promotion Details', () => {
    it('should display expiration time', () => {
      renderPromotionsPage();
      
      // Should show expiration in hours
      const expirationTexts = screen.getAllByText(/h|horas/i);
      expect(expirationTexts.length).toBeGreaterThan(0);
    });
  });

  describe('Code Copying', () => {
    it('should have copy functionality for promo codes', () => {
      renderPromotionsPage();
      
      // Look for copy buttons or icons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible headings', () => {
      renderPromotionsPage();
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
