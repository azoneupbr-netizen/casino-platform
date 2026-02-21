import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatButton from '@/components/layout/ChatButton';

describe('ChatButton Component', () => {
  describe('Rendering', () => {
    it('should render the floating button', () => {
      render(<ChatButton />);
      
      // Chat icon when closed
      expect(screen.getByText('💬')).toBeInTheDocument();
    });

    it('should not render chat window initially', () => {
      render(<ChatButton />);
      
      expect(screen.queryByText('Suporte 24h')).not.toBeInTheDocument();
    });
  });

  describe('Opening Chat', () => {
    it('should open chat window when button is clicked', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByText('Suporte 24h')).toBeInTheDocument();
    });

    it('should show close icon when open', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('should show welcome message', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByText(/Olá! Bem-vindo ao suporte/i)).toBeInTheDocument();
    });

    it('should show online status', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByText('Online')).toBeInTheDocument();
    });
  });

  describe('Closing Chat', () => {
    it('should close chat window when button is clicked again', () => {
      render(<ChatButton />);
      
      // Open
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      expect(screen.getByText('Suporte 24h')).toBeInTheDocument();
      
      // Close
      const closeButton = screen.getByText('✕').closest('button');
      fireEvent.click(closeButton!);
      
      expect(screen.queryByText('Suporte 24h')).not.toBeInTheDocument();
    });

    it('should show chat icon after closing', () => {
      render(<ChatButton />);
      
      // Open
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      // Close
      const closeButton = screen.getByText('✕').closest('button');
      fireEvent.click(closeButton!);
      
      expect(screen.getByText('💬')).toBeInTheDocument();
    });
  });

  describe('Chat Window Elements', () => {
    it('should have a message input', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    });

    it('should have a send button', () => {
      render(<ChatButton />);
      
      const button = screen.getByText('💬').closest('button');
      fireEvent.click(button!);
      
      expect(screen.getByText('➤')).toBeInTheDocument();
    });
  });
});
