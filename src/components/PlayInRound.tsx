import React from 'react';
import styled from 'styled-components';
import { Group, Team as TeamType } from '../types';
import GroupStageSelection from './GroupStageSelection';

interface PlayInRoundProps {
  groups: Group[];
  onComplete: (advancingTeams: TeamType[]) => void;
}

const PlayInContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

/**
 * PlayInRound component - displays the 2026 Group Stage selection
 */
const PlayInRound: React.FC<PlayInRoundProps> = ({ groups, onComplete }) => {
  return (
    <PlayInContainer>
      <GroupStageSelection groups={groups} onComplete={onComplete} />
    </PlayInContainer>
  );
};

export default PlayInRound;
