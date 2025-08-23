import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TournamentRound, Match as MatchType } from '../types';
import MatchupCard from './MatchupCard';
import BracketLines from './BracketLines';
import { Card, Section, SectionTitle } from './styled/Common';

interface BracketGridProps {
  rounds: TournamentRound[];
  currentRound: number;
  onSelectWinner: (roundIndex: number, matchIndex: number, teamId: number) => void;
  onAdvanceRound: () => void;
}

const BracketContainer = styled.div`
  max-width: none;
  margin: 0;
  overflow-x: auto;
  width: 100%;
`;

const BracketGrid = styled.div<{ focusedRound: number | null; hasFrozenRounds: boolean }>`
  display: grid;
      grid-template-columns: ${props => {
      if (props.focusedRound === null) return 'repeat(5, 1fr)'; // Normal 5 equal columns
      // When focused, make the focused column wider, previous 6%, next 13%, leaving 26% for gaps
      const columns = [];
      for (let i = 0; i < 5; i++) {
        if (i === props.focusedRound - 1) columns.push('6%'); // Previous round
        else if (i === props.focusedRound) {
          // Final round gets more space since there's no next round
          if (props.focusedRound === 4 || props.focusedRound === 5) {
            columns.push('100%'); // Final round gets full width
          } else {
            columns.push('55%'); // Other focused rounds
          }
        }
        else if (i === props.focusedRound + 1) columns.push('13%'); // Next round
        else columns.push('0%'); // Hide other rounds
      }
      return columns.join(' ');
    }};
  grid-template-rows: repeat(32, minmax(${props => (props.focusedRound !== null || props.hasFrozenRounds) ? '40px' : '60px'}, 1fr)); /* 32 rows with minimum height */
  gap: ${props => {
    // When focused or has frozen rounds, use condensed spacing
    if (props.focusedRound !== null || props.hasFrozenRounds) return '0.5rem';
    return '2rem';
  }};
  column-gap: ${props => props.focusedRound === null ? '2rem' : '3rem'};
  min-width: 2000px;
  min-height: 2000px;
  padding: 0;
  position: relative;
  transition: gap 0.4s ease, column-gap 0.4s ease;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(32, minmax(${props => (props.focusedRound !== null || props.hasFrozenRounds) ? '30px' : '60px'}, 1fr));
    gap: ${props => {
      // When focused or has frozen rounds, use condensed spacing
      if (props.focusedRound !== null || props.hasFrozenRounds) return '0.25rem';
      return '1rem';
    }};
    min-width: 100vw;
    min-height: 2000px;
    overflow-x: auto;
    scroll-behavior: smooth;
    transition: gap 0.4s ease;
  }
`;

const RoundColumn = styled.div<{ roundIndex: number }>`
  display: contents; /* Make children direct grid items */
`;

const RoundHeader = styled.div<{ roundIndex: number; focusedRound: number | null; hasFrozenRounds: boolean }>`
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(29, 78, 216, 0.95) 50%, rgba(37, 99, 235, 0.9) 100%);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: ${props => (props.focusedRound !== null || props.hasFrozenRounds) ? '0.25rem' : '1rem'};
  position: sticky;
  top: 0;
  z-index: 10;
  grid-column: ${props => props.roundIndex + 1};
  grid-row: 1;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: ${props => props.roundIndex === 4 ? '80vw' : '250px'};
  margin-left: ${props => props.roundIndex > 0 ? '0.5rem' : '0'};
  margin-right: ${props => props.roundIndex < 4 ? '0.5rem' : '0'};
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(29, 78, 216, 1) 50%, rgba(59, 130, 246, 0.95) 100%);
    border-color: rgba(59, 130, 246, 0.4);
  }
`;

const RoundTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.025em;
`;

const RoundDate = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;



const MatchWrapper = styled.div<{ 
  isCurrentRound: boolean;
  position: number;
  totalMatches: number;
  roundIndex: number;
  focusedRound: number | null;
}>`
  opacity: ${props => props.isCurrentRound ? 1 : 0.7};
  visibility: visible;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;
  grid-column: ${props => props.roundIndex + 1};
  grid-row: ${props => {
    // Always maintain proper grid positioning regardless of focus
    const rowSpan = Math.pow(2, props.roundIndex);
    const startRow = (props.position * rowSpan) + 2; // +2 to account for header row
    
    // When focused, recalculate positioning as if focused round is the first round
    if (props.focusedRound !== null) {
      if (props.roundIndex === props.focusedRound) {
        return 'auto'; // Remove grid positioning from focused round
      } else if (props.roundIndex > props.focusedRound) {
        // Recalculate as if focused round is round 0
        const adjustedRoundIndex = props.roundIndex - props.focusedRound;
        const adjustedRowSpan = Math.pow(2, adjustedRoundIndex);
        const adjustedStartRow = (props.position * adjustedRowSpan) + 2;
        return `${adjustedStartRow} / span ${adjustedRowSpan}`;
      }
    }
    
    return `${startRow} / span ${rowSpan}`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;

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
  const [focusedRound, setFocusedRound] = useState<number | null>(null);
  const [frozenRounds, setFrozenRounds] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const canAdvanceCurrentRound = () => {
    if (currentRound > rounds.length) return false;
    const roundData = rounds[currentRound - 1];
    if (!roundData) return false;
    return roundData.matches.every(match => match.winner !== null);
  };

  const handleRoundHeaderClick = (roundIndex: number) => {
    // If clicking on Round of 32 (index 0), reset focus to show full view
    if (roundIndex === 0) {
      setFocusedRound(null);
      setFrozenRounds(new Set()); // Clear frozen rounds
    } else {
      setFocusedRound(roundIndex);
      // Freeze all rounds that are "behind" the focused round
      const newFrozenRounds = new Set<number>();
      for (let i = 0; i < roundIndex; i++) {
        newFrozenRounds.add(i);
      }
      setFrozenRounds(newFrozenRounds);
    }
    
    // Focus viewport on the selected round
    if (gridRef.current) {
      const columnWidth = gridRef.current.scrollWidth / 5;
      let scrollPosition;
      
      if (roundIndex === 4) {
        // For the final round, scroll all the way to the right
        scrollPosition = gridRef.current.scrollWidth - gridRef.current.clientWidth;
      } else {
        // For other rounds, show a bit of previous round
        scrollPosition = columnWidth * (roundIndex - 0.2);
      }
      
      gridRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <BracketContainer>
      <div style={{ marginBottom: '3rem' }}>
        <SectionTitle>🏆 World Cup 2026 Tournament Bracket</SectionTitle>
      </div>

            <BracketGrid ref={gridRef} focusedRound={focusedRound} hasFrozenRounds={frozenRounds.size > 0}>
        {rounds.map((round, roundIndex) => (
          <RoundColumn key={round.round} roundIndex={roundIndex}>
            <RoundHeader 
              roundIndex={roundIndex}
              focusedRound={focusedRound}
              hasFrozenRounds={frozenRounds.size > 0}
              onClick={() => handleRoundHeaderClick(roundIndex)}
            >
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
                focusedRound={focusedRound}

              >
                <MatchupCard
                  match={match}
                  onSelectWinner={
                    !round.isComplete
                      ? (teamId: number) => onSelectWinner(roundIndex, matchIndex, teamId)
                      : undefined
                  }
                  disabled={round.isComplete}
                  isCurrentRound={round.round === currentRound}
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
