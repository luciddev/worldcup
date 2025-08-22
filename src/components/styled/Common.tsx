import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Header = styled.header`
  background: var(--primary-gradient);
  padding: 2rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px var(--shadow);
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #e2e8f0;
  margin: 0.5rem 0 0 0;
  font-weight: 400;
`;

export const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px var(--shadow);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px var(--shadow-hover);
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' }>`
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--bg-card)';
      case 'success': return 'var(--success-gradient)';
      case 'danger': return 'var(--danger-gradient)';
      case 'warning': return 'var(--warning-gradient)';
      default: return 'var(--primary-gradient)';
    }
  }};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px var(--shadow-hover);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div<{ direction?: 'row' | 'column'; justify?: string; align?: string; gap?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap || '0'};
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' }>`
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--bg-card)';
      case 'success': return 'rgba(16, 185, 129, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(59, 130, 246, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--text-secondary)';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--border-color)';
      case 'success': return 'rgba(16, 185, 129, 0.3)';
      case 'warning': return 'rgba(245, 158, 11, 0.3)';
      default: return 'rgba(59, 130, 246, 0.3)';
    }
  }};
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ThemeToggle = styled.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-size: 1.25rem;
  
  &:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
    transform: scale(1.05);
  }
`;
