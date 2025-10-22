import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('renders the app header', () => {
    render(<App />);
    const titleElement = screen.getByText(/World Cup 2026/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders tournament bracket challenge subtitle', () => {
    render(<App />);
    const subtitleElement = screen.getByText(/Tournament Bracket Challenge/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    render(<App />);
    const themeButtons = screen.getAllByRole('button');
    expect(themeButtons.length).toBeGreaterThan(0);
  });

  test('renders play-in tournament initially', () => {
    render(<App />);
    const playInElement = screen.getByText(/Play-in Tournament/i);
    expect(playInElement).toBeInTheDocument();
  });

  test('renders test controls', () => {
    render(<App />);
    const testControlsElement = screen.getByText(/Test Controls/i);
    expect(testControlsElement).toBeInTheDocument();
  });

  test('auto-pick play-in button works', async () => {
    render(<App />);
    const autoPickButton = screen.getByText(/Auto-Pick Play-in Teams/i);
    expect(autoPickButton).toBeInTheDocument();

    fireEvent.click(autoPickButton);

    await waitFor(() => {
      const bracketElement = screen.queryByText(/Round of 32/i);
      expect(bracketElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('reset tournament button works', () => {
    render(<App />);
    const resetButton = screen.getByText(/Reset Tournament/i);
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);

    const playInElement = screen.getByText(/Play-in Tournament/i);
    expect(playInElement).toBeInTheDocument();
  });
});
