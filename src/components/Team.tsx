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
  padding: ${props => props.size === 'small' ? '0.375rem 0.5rem' : props.size === 'large' ? '0.5rem 0.75rem' : '0.375rem 0.5rem'};
  background: ${props => {
    if (props.selected) return 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.25) 100%)';
    return 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)';
  }};
  border: ${props => {
    if (props.selected) return '2px solid rgba(59, 130, 246, 0.8)';
    return 'none';
  }};
  box-shadow: ${props => {
    if (props.selected) return '0 0 0 1px rgba(59, 130, 246, 0.2)';
    return 'none';
  }};
  border-radius: 3px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
`;

const Flag = styled.div<{ size?: string }>`
  font-size: ${props => props.size === 'small' ? '1.44rem' : props.size === 'large' ? '2.3rem' : '1.73rem'};
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
  font-size: ${props => props.size === 'small' ? '0.86rem' : props.size === 'large' ? '1.29rem' : '1.01rem'};
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Score = styled.div<{ size?: string }>`
  font-weight: 700;
  font-size: ${props => props.size === 'small' ? '1.01rem' : props.size === 'large' ? '1.44rem' : '1.15rem'};
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
