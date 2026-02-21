import { renderHook, act } from '@testing-library/react';
import { useAuthModal } from '@/components/auth/useAuthModal';

describe('useAuthModal Hook', () => {
  describe('Initial State', () => {
    it('should start with modal closed', () => {
      const { result } = renderHook(() => useAuthModal());
      expect(result.current.isOpen).toBe(false);
    });

    it('should start with login tab selected', () => {
      const { result } = renderHook(() => useAuthModal());
      expect(result.current.tab).toBe('login');
    });
  });

  describe('open()', () => {
    it('should open the modal', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open();
      });
      
      expect(result.current.isOpen).toBe(true);
    });

    it('should open with login tab by default', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open();
      });
      
      expect(result.current.tab).toBe('login');
    });

    it('should open with signup tab when specified', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open('signup');
      });
      
      expect(result.current.tab).toBe('signup');
      expect(result.current.isOpen).toBe(true);
    });

    it('should open with login tab when specified', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open('login');
      });
      
      expect(result.current.tab).toBe('login');
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('close()', () => {
    it('should close the modal', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
      
      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('switchTab()', () => {
    it('should switch to signup tab', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.switchTab('signup');
      });
      
      expect(result.current.tab).toBe('signup');
    });

    it('should switch to login tab', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.switchTab('signup');
      });
      
      act(() => {
        result.current.switchTab('login');
      });
      
      expect(result.current.tab).toBe('login');
    });

    it('should switch tabs while modal is open', () => {
      const { result } = renderHook(() => useAuthModal());
      
      act(() => {
        result.current.open('login');
      });
      
      act(() => {
        result.current.switchTab('signup');
      });
      
      expect(result.current.isOpen).toBe(true);
      expect(result.current.tab).toBe('signup');
    });
  });
});
