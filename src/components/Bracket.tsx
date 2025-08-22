import React from 'react';
import styled from 'styled-components';
import { TournamentRound } from '../types';
import Match from './Match';
import { Button, Card, Section, SectionTitle, Flex, Badge } from './styled/Common';

interface BracketProps {
  rounds: TournamentRound[];
  currentRound: number;
  onSelectWinner: (roundIndex: number, matchIndex: number, teamId: number) => void;
  onAdvanceRound: () => void;
}

const BracketContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const RoundsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoundColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoundHeader = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1rem;
`;

const RoundTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const RoundStatus = styled.div`
  color: #e2e8f0;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const MatchWrapper = styled.div<{ isCurrentRound: boolean }>`
  opacity: ${props => props.isCurrentRound ? 1 : 0.7};
  transition: opacity 0.3s ease;
`;

const Bracket: React.FC<BracketProps> = ({ 
  rounds, 
  currentRound, 
  onSelectWinner, 
  onAdvanceRound 
}) => {
  const canAdvanceCurrentRound = () => {
    if (currentRound > rounds.length) return false;
    const roundData = rounds[currentRound - 1];
    if (!roundData) return false;
    return roundData.matches.every(match => match.winner !== null);
  };

  const getRoundStatus = (round: TournamentRound) => {
    if (round.isComplete) return '✅ Complete';
    if (round.round === currentRound) return '🔄 In Progress';
    if (round.round < currentRound) return '✅ Complete';
    return '⏳ Waiting';
  };

  return (
    <BracketContainer>
      <Section>
        <SectionTitle>🏆 World Cup 2026 Tournament Bracket</SectionTitle>
        
        <Card>
          <Flex justify="space-between" align="center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                Current Round: {rounds[currentRound - 1]?.name || 'Complete'}
              </h3>
              <p style={{ color: '#94a3b8', margin: 0 }}>
                Select winners to advance teams through the tournament
              </p>
            </div>
            
            <Button
              variant="success"
              onClick={onAdvanceRound}
              disabled={!canAdvanceCurrentRound()}
            >
              {canAdvanceCurrentRound() 
                ? `Advance to ${rounds[currentRound]?.name || 'Final'}` 
                : 'Complete Current Round First'
              }
            </Button>
          </Flex>
        </Card>
      </Section>

      <RoundsContainer>
        {rounds.map((round, roundIndex) => (
          <RoundColumn key={round.round}>
            <RoundHeader>
              <RoundTitle>{round.name}</RoundTitle>
              <RoundStatus>{getRoundStatus(round)}</RoundStatus>
            </RoundHeader>
            
            {round.matches.map((match, matchIndex) => (
              <MatchWrapper 
                key={match.id} 
                isCurrentRound={round.round === currentRound}
              >
                <Match
                  match={match}
                  onSelectWinner={
                    round.round === currentRound && !round.isComplete
                      ? (teamId) => onSelectWinner(roundIndex, matchIndex, teamId)
                      : undefined
                  }
                  disabled={round.round !== currentRound || round.isComplete}
                  showMatchNumber
                />
              </MatchWrapper>
            ))}
          </RoundColumn>
        ))}
      </RoundsContainer>

      {currentRound > rounds.length && (
        <Card style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>
            🎉 Tournament Complete!
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            The World Cup 2026 champion has been crowned!
          </p>
          <Badge variant="success" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
            🏆 Champion: {rounds[rounds.length - 1].matches[0].winner?.flag} {rounds[rounds.length - 1].matches[0].winner?.name}
          </Badge>
        </Card>
      )}
    </BracketContainer>
  );
};

export default Bracket;
