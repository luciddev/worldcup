import React from 'react';
import styled from 'styled-components';
import { Team as TeamType } from '../types';

interface TeamProps {
  team: TeamType;
  onClick?: () => void;
  selected?: boolean;
  position?: number | null;
  size?: 'small' | 'medium' | 'large';
  showSeed?: boolean;
  showRank?: boolean;
  score?: number | null;
}

const TeamContainer = styled.div<{ 
  selected?: boolean; 
  position?: number | null;
  size?: string;
  clickable?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.size === 'small' ? '0.25rem 0.375rem' : props.size === 'large' ? '0.5rem 0.75rem' : '0.375rem 0.5rem'};
  background: ${props => {
    if (props.selected) return 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.3) 100%)';
    return 'var(--bg-card)';
  }};
  border: 1px solid ${props => {
    if (props.selected) return '#3b82f6';
    return 'var(--border-color)';
  }};
  border-radius: 6px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  min-width: ${props => props.size === 'small' ? '160px' : props.size === 'large' ? '240px' : '200px'};
  position: relative;
`;

const Flag = styled.div<{ size?: string }>`
  font-size: ${props => props.size === 'small' ? '1.25rem' : props.size === 'large' ? '2rem' : '1.5rem'};
  line-height: 1;
`;

const TeamInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TeamName = styled.div<{ size?: string }>`
  font-weight: 600;
  font-size: ${props => props.size === 'small' ? '0.75rem' : props.size === 'large' ? '1.125rem' : '0.875rem'};
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Score = styled.div<{ size?: string }>`
  font-weight: 700;
  font-size: ${props => props.size === 'small' ? '0.875rem' : props.size === 'large' ? '1.25rem' : '1rem'};
  color: var(--text-primary);
  min-width: 1.5rem;
  text-align: center;
  margin-left: 0.5rem;
`;

const Team: React.FC<TeamProps> = ({ 
  team, 
  onClick, 
  selected = false, 
  position = null,
  size = 'medium',
  showSeed = false,
  showRank = false,
  score = null
}) => {
  return (
    <TeamContainer 
      selected={selected}
      position={position}
      size={size}
      clickable={!!onClick}
      onClick={onClick}
    >
      <Flag size={size}>
        {team.flag}
      </Flag>
      
      <TeamInfo>
        <TeamName size={size}>
          {team.name}
        </TeamName>
        
        {score !== null && (
          <Score size={size}>
            {score}
          </Score>
        )}
      </TeamInfo>
    </TeamContainer>
  );
};

export default Team;
