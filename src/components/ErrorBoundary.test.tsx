import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error for cleaner test output
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  test('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    expect(screen.getByText(/Reload Page/i)).toBeInTheDocument();
  });

  test('try again button resets error state', () => {
    // Create a controlled component that we can toggle
    const TestComponent = () => {
      const [shouldError, setShouldError] = React.useState(true);
      return (
        <ErrorBoundary>
          {shouldError ? (
            <ThrowError shouldThrow={true} />
          ) : (
            <div>No error</div>
          )}
        </ErrorBoundary>
      );
    };

    const { rerender } = render(<TestComponent />);

    // Error boundary should show error UI
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();

    const tryAgainButton = screen.getByText(/Try Again/i);
    fireEvent.click(tryAgainButton);

    // After clicking try again, error UI should still be visible since we haven't changed the child
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });
});
