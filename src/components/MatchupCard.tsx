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
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  width: 100%;
  max-width: 337px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  box-shadow: none;
`;



const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const PlaceholderTeam = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: none;
  border-radius: 0;
  padding: 0.375rem 0.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 28px; /* Match the exact height of Team component */
  box-shadow: none;
`;

const MatchupCard: React.FC<MatchupCardProps> = ({
  match,
  onSelectWinner,
  disabled = false,
  isCurrentRound = false
}) => {
  const handleTeamClick = (teamId: number) => {
    if (!disabled && onSelectWinner) {
      onSelectWinner(teamId);
    }
  };

  const team1 = match.team1;
  const team2 = match.team2;

  return (
    <CardContainer disabled={disabled} isCurrentRound={isCurrentRound}>
      <TeamsContainer>
        {team1 ? (
          <Team
            team={team1}
            onClick={!disabled ? () => handleTeamClick(team1.id) : undefined}
            selected={match.winner?.id === team1.id}
            size="small"
            score={match.team1Score || null}
          />
        ) : (
          <PlaceholderTeam>
            —
          </PlaceholderTeam>
        )}

        {team2 ? (
          <Team
            team={team2}
            onClick={!disabled ? () => handleTeamClick(team2.id) : undefined}
            selected={match.winner?.id === team2.id}
            size="small"
            score={match.team2Score || null}
          />
        ) : (
          <PlaceholderTeam>
            —
          </PlaceholderTeam>
        )}
      </TeamsContainer>
    </CardContainer>
  );
};

/**
 * Memoized version to prevent unnecessary re-renders
 */
export default React.memo(MatchupCard, (prevProps, nextProps) => {
  return (
    prevProps.match.id === nextProps.match.id &&
    prevProps.match.winner?.id === nextProps.match.winner?.id &&
    prevProps.match.team1?.id === nextProps.match.team1?.id &&
    prevProps.match.team2?.id === nextProps.match.team2?.id &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.isCurrentRound === nextProps.isCurrentRound
  );
});
