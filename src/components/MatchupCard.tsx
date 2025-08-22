import React from 'react';
import styled from 'styled-components';
import { Match as MatchType } from '../types';
import Team from './Team';

interface MatchupCardProps {
  match: MatchType;
  onSelectWinner?: (teamId: number) => void;
  disabled?: boolean;
  isCurrentRound: boolean;
}

const CardContainer = styled.div<{ disabled?: boolean; isCurrentRound: boolean }>`
  background: ${props => props.isCurrentRound 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.isCurrentRound 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
  max-width: 180px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover {
    ${props => !props.disabled && props.isCurrentRound && `
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    `}
  }
`;

const MatchNumber = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.7rem;
  text-align: center;
  margin-bottom: 0.25rem;
  width: fit-content;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PlaceholderTeam = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  color: #64748b;
  font-size: 0.75rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MatchupCard: React.FC<MatchupCardProps> = ({ 
  match, 
  onSelectWinner, 
  disabled = false,
  isCurrentRound = false
}) => {
  const handleTeamClick = (teamId: number) => {
    if (!disabled && onSelectWinner && isCurrentRound) {
      onSelectWinner(teamId);
    }
  };

  const hasTeams = match.team1 || match.team2;

  return (
    <CardContainer disabled={disabled} isCurrentRound={isCurrentRound}>
      <MatchNumber>
        {match.isPlayIn ? 'P' : 'M'}{match.matchNumber}
      </MatchNumber>
      
      <TeamsContainer>
        {match.team1 ? (
          <Team
            team={match.team1}
            onClick={() => handleTeamClick(match.team1!.id)}
            selected={match.winner?.id === match.team1.id}
            size="small"
            score={match.team1Score || null}
          />
        ) : (
          <PlaceholderTeam>
            {hasTeams ? 'TBD' : '—'}
          </PlaceholderTeam>
        )}
        
        {match.team2 ? (
          <Team
            team={match.team2}
            onClick={() => handleTeamClick(match.team2!.id)}
            selected={match.winner?.id === match.team2.id}
            size="small"
            score={match.team2Score || null}
          />
        ) : (
          <PlaceholderTeam>
            {hasTeams ? 'TBD' : '—'}
          </PlaceholderTeam>
        )}
      </TeamsContainer>
    </CardContainer>
  );
};

export default MatchupCard;
