import React from 'react';
import styled from 'styled-components';
import { Button, Card, Flex } from './styled/Common';

interface TestControlsProps {
  onAutoPickPlayIn: () => void;
  onAutoAdvanceBracket: () => void;
  onResetTournament: () => void;
  currentRound: number;
  isPlayInComplete: boolean;
}

const TestControlsContainer = styled(Card)`
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  margin-bottom: 2rem;
`;

const TestTitle = styled.h3`
  color: #f59e0b;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const TestDescription = styled.p`
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
`;

const TestControls: React.FC<TestControlsProps> = ({
  onAutoPickPlayIn,
  onAutoAdvanceBracket,
  onResetTournament,
  currentRound,
  isPlayInComplete
}) => {
  return (
    <TestControlsContainer>
      <TestTitle>🧪 Test Controls</TestTitle>
      <TestDescription>
        Use these controls to quickly test the tournament flow. 
        Auto-pick will randomly select teams and advance through rounds.
      </TestDescription>
      
      <Flex gap="1rem" style={{ flexWrap: 'wrap' }}>
        {!isPlayInComplete && (
          <Button
            variant="warning"
            onClick={onAutoPickPlayIn}
          >
            🎲 Auto-Pick Play-in Teams
          </Button>
        )}
        
        {isPlayInComplete && currentRound <= 5 && (
          <Button
            variant="warning"
            onClick={onAutoAdvanceBracket}
          >
            🚀 Auto-Advance Bracket
          </Button>
        )}
        
        <Button
          variant="danger"
          onClick={onResetTournament}
        >
          🔄 Reset Tournament
        </Button>
      </Flex>
    </TestControlsContainer>
  );
};

export default TestControls;
