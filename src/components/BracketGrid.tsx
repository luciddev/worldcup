import React from 'react';
import styled from 'styled-components';
import { TournamentRound, Match as MatchType } from '../types';
import Match from './Match';
import BracketLines from './BracketLines';
import { Card, Section, SectionTitle } from './styled/Common';

interface BracketGridProps {
  rounds: TournamentRound[];
  currentRound: number;
  onSelectWinner: (roundIndex: number, matchIndex: number, teamId: number) => void;
  onAdvanceRound: () => void;
}

const BracketContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: auto;
`;

const BracketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 rounds */
  grid-template-rows: repeat(32, minmax(60px, 1fr)); /* 32 rows with minimum height */
  gap: 2rem;
  min-width: 1400px;
  min-height: 2000px; /* Ensure grid has enough height */
  padding: 2rem 0;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    min-width: auto;
    min-height: auto;
  }
`;

const RoundColumn = styled.div<{ roundIndex: number }>`
  display: contents; /* Make children direct grid items */
`;

const RoundHeader = styled.div<{ roundIndex: number }>`
  background: var(--primary-gradient);
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  grid-column: ${props => props.roundIndex + 1};
  grid-row: 1;
`;

const RoundTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
`;

const RoundDate = styled.div`
  color: #e2e8f0;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const MatchWrapper = styled.div<{ 
  isCurrentRound: boolean;
  position: number;
  totalMatches: number;
  roundIndex: number;
}>`
  opacity: ${props => props.isCurrentRound ? 1 : 0.7};
  transition: opacity 0.3s ease;
  position: relative;
  width: 100%;
  grid-column: ${props => props.roundIndex + 1};
  grid-row: ${props => {
    // Calculate grid position based on round and match position
    const baseRows = 32; // Total grid rows
    const rowSpan = Math.pow(2, props.roundIndex);
    const startRow = (props.position * rowSpan) + 2; // +2 to account for header row
    return `${startRow} / span ${rowSpan}`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid red; /* Debug border to see grid positioning */
`;

const getRoundDates = (round: number): string => {
  switch (round) {
    case 1: return 'Jul 15 - 18';
    case 2: return 'Jul 22 - 25';
    case 3: return 'Jul 29 - Aug 1';
    case 4: return 'Aug 5 - 8';
    case 5: return 'Aug 12';
    default: return '';
  }
};

const getRoundName = (round: number): string => {
  switch (round) {
    case 1: return 'Round of 32';
    case 2: return 'Round of 16';
    case 3: return 'Quarterfinals';
    case 4: return 'Semifinals';
    case 5: return 'Final';
    default: return '';
  }
};

const BracketGridComponent: React.FC<BracketGridProps> = ({ 
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

  return (
    <BracketContainer>
      <Section>
        <SectionTitle>🏆 World Cup 2026 Tournament Bracket</SectionTitle>
      </Section>

      <BracketGrid>
        {rounds.map((round, roundIndex) => (
          <RoundColumn key={round.round} roundIndex={roundIndex}>
            <RoundHeader roundIndex={roundIndex}>
              <RoundTitle>{getRoundName(round.round)}</RoundTitle>
              <RoundDate>{getRoundDates(round.round)}</RoundDate>
            </RoundHeader>
            
            {round.matches.map((match, matchIndex) => (
              <MatchWrapper 
                key={match.id}
                isCurrentRound={round.round === currentRound}
                position={matchIndex}
                totalMatches={round.matches.length}
                roundIndex={roundIndex}
                style={{
                  border: '2px solid blue' // Debug border
                }}
              >
                <Match
                  match={match}
                  onSelectWinner={
                    !round.isComplete
                      ? (teamId) => onSelectWinner(roundIndex, matchIndex, teamId)
                      : undefined
                  }
                  disabled={round.isComplete}
                  showMatchNumber={false}
                />
                {roundIndex < rounds.length - 1 && (
                  <BracketLines
                    roundIndex={roundIndex}
                    matchIndex={matchIndex}
                    totalMatches={round.matches.length}
                    isCurrentRound={round.round === currentRound}
                  />
                )}
              </MatchWrapper>
            ))}
          </RoundColumn>
        ))}
      </BracketGrid>

      {currentRound <= rounds.length && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onAdvanceRound}
            disabled={!canAdvanceCurrentRound()}
            style={{
              background: canAdvanceCurrentRound() ? 'var(--success-gradient)' : 'var(--bg-card)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: canAdvanceCurrentRound() ? 'pointer' : 'not-allowed',
              opacity: canAdvanceCurrentRound() ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            {canAdvanceCurrentRound() 
              ? `Advance to ${rounds[currentRound]?.name || 'Final'}` 
              : 'Complete Current Round First'
            }
          </button>
        </div>
      )}

      {currentRound > rounds.length && (
        <Card style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>
            🎉 Tournament Complete!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            The World Cup 2026 champion has been crowned!
          </p>
          <div style={{ 
            background: 'var(--success-gradient)', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            🏆 Champion: {rounds[rounds.length - 1].matches[0].winner?.flag} {rounds[rounds.length - 1].matches[0].winner?.name}
          </div>
        </Card>
      )}
    </BracketContainer>
  );
};

export default BracketGridComponent;
