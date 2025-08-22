import React from 'react';
import styled from 'styled-components';

interface BracketLinesProps {
  roundIndex: number;
  matchIndex: number;
  totalMatches: number;
  isCurrentRound: boolean;
}

const BracketLine = styled.div<{ 
  roundIndex: number;
  matchIndex: number;
  totalMatches: number;
  isCurrentRound: boolean;
}>`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  right: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  
  /* Horizontal line to next round */
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0.5rem;
    height: 3px;
    background: 'var(--border-color)';
    display: block;
    transform: translateY(-50%);
  }
  
  /* Vertical line for bracket connections */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: ${props => {
      const { matchIndex, roundIndex } = props;
      
      // Determine if this is the top or bottom match of the pair
      const isTopMatch = matchIndex % 2 === 0;
      
      if (isTopMatch) {
        // Top match - line goes down to center
        return '50%';
      } else {
        // Bottom match - line goes up to center
        return '0%';
      }
    }};
    width: 3px;
    height: ${props => {
      const { matchIndex, roundIndex } = props;
      
      const isTopMatch = matchIndex % 2 === 0;
      
      if (isTopMatch) {
        // Top match - line extends down to center
        return '50%';
      } else {
        // Bottom match - line extends up to center
        return '50%';
      }
    }};
    background: 'var(--border-color)';
    display: block;
  }
`;

const BracketLines: React.FC<BracketLinesProps> = ({ 
  roundIndex, 
  matchIndex, 
  totalMatches, 
  isCurrentRound 
}) => {
  return (
    <BracketLine
      roundIndex={roundIndex}
      matchIndex={matchIndex}
      totalMatches={totalMatches}
      isCurrentRound={isCurrentRound}
    />
  );
};

export default BracketLines;
