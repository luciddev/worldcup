import React from 'react';
import styled from 'styled-components';
import { Match as MatchType } from '../types';
import Team from './Team';

interface MatchProps {
  match: MatchType;
  onSelectWinner?: (teamId: number) => void;
  disabled?: boolean;
  showMatchNumber?: boolean;
}

const MatchContainer = styled.div<{ disabled?: boolean }>`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const MatchNumber = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.75rem;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: stretch;
  min-height: 100px;
  justify-content: space-between;
`;

const PlaceholderTeam = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Match: React.FC<MatchProps> = ({ 
  match, 
  onSelectWinner, 
  disabled = false,
  showMatchNumber = true
}) => {
  const handleTeamClick = (teamId: number) => {
    if (!disabled && onSelectWinner) {
      onSelectWinner(teamId);
    }
  };

  const hasTeams = match.team1 || match.team2;

  return (
    <MatchContainer disabled={disabled}>
      <MatchHeader>
        {showMatchNumber && (
          <MatchNumber>
            {match.isPlayIn ? 'Play-in' : 'Match'} #{match.matchNumber}
          </MatchNumber>
        )}
      </MatchHeader>
      
      <TeamsContainer>
        {match.team1 ? (
          <Team
            team={match.team1}
            onClick={() => handleTeamClick(match.team1!.id)}
            selected={match.winner?.id === match.team1.id}
            size="medium"
            score={match.team1Score || null}
          />
        ) : (
          <PlaceholderTeam>
            {hasTeams ? 'TBD' : 'Waiting for teams...'}
          </PlaceholderTeam>
        )}
        
        {match.team2 ? (
          <Team
            team={match.team2}
            onClick={() => handleTeamClick(match.team2!.id)}
            selected={match.winner?.id === match.team2.id}
            size="medium"
            score={match.team2Score || null}
          />
        ) : (
          <PlaceholderTeam>
            {hasTeams ? 'TBD' : 'Waiting for teams...'}
          </PlaceholderTeam>
        )}
      </TeamsContainer>
    </MatchContainer>
  );
};

export default Match;
