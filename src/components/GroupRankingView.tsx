import React, { useState } from 'react';
import styled from 'styled-components';
import { Team } from '../types';

interface GroupRankingViewProps {
  groups: { id: string; name: string; teams: Team[] }[];
  onComplete: (rankedGroups: { [groupId: string]: Team[] }[]) => void;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 700;
`;

const Instructions = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--text-primary);
  font-size: 0.875rem;
`;

const GroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GroupCard = styled.div<{ isComplete: boolean }>`
  background: var(--bg-card);
  border: 2px solid ${props => props.isComplete ? '#10b981' : 'var(--border-color)'};
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  ${props => props.isComplete && `
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  `}
`;

const GroupHeader = styled.div`
  background: var(--primary-gradient);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TeamItem = styled.div<{ position: number; isDragging?: boolean }>`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  position: relative;
  
  ${props => props.isDragging && `
    opacity: 0.5;
    transform: scale(0.98);
  `}
`;

const PositionBadge = styled.div<{ position: number }>`
  background: ${props => {
    switch (props.position) {
      case 1: return '#10b981'; // Green for 1st
      case 2: return '#3b82f6'; // Blue for 2nd
      case 3: return '#f59e0b'; // Orange for 3rd
      default: return '#6b7280'; // Gray for 4th
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
`;

const TeamFlag = styled.div`
  font-size: 1.5rem;
  line-height: 1;
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
`;

const TeamDetails = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const RankControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const RankButton = styled.button<{ direction: 'up' | 'down'; disabled?: boolean }>`
  background: ${props => props.disabled ? 'var(--bg-card)' : 'var(--primary-gradient)'};
  color: white;
  border: none;
  border-radius: 4px;
  width: 2rem;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

const ProgressContainer = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProgressText = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: var(--primary-gradient);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const Button = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled ? 'var(--bg-card)' : 'var(--success-gradient)'};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px var(--shadow-hover);
  }
`;

const GroupRankingView: React.FC<GroupRankingViewProps> = ({ groups, onComplete }) => {
  const [groupRankings, setGroupRankings] = useState<{ [groupId: string]: Team[] }>(() => {
    // Initialize with original team order
    const initial: { [groupId: string]: Team[] } = {};
    groups.forEach(group => {
      initial[group.id] = [...group.teams];
    });
    return initial;
  });

  const moveTeam = (groupId: string, teamIndex: number, direction: 'up' | 'down') => {
    setGroupRankings(prev => {
      const groupTeams = [...prev[groupId]];
      const newIndex = direction === 'up' ? teamIndex - 1 : teamIndex + 1;
      
      // Check bounds
      if (newIndex < 0 || newIndex >= groupTeams.length) return prev;
      
      // Swap teams
      [groupTeams[teamIndex], groupTeams[newIndex]] = [groupTeams[newIndex], groupTeams[teamIndex]];
      
      return {
        ...prev,
        [groupId]: groupTeams
      };
    });
  };

  const canMoveUp = (groupId: string, teamIndex: number): boolean => {
    return teamIndex > 0;
  };

  const canMoveDown = (groupId: string, teamIndex: number): boolean => {
    return teamIndex < groupRankings[groupId].length - 1;
  };

  const completedGroups = Object.keys(groupRankings).length;
  const progress = (completedGroups / groups.length) * 100;

  const handleComplete = () => {
    // Convert to the format expected by onComplete
    const rankedGroupsArray = Object.entries(groupRankings).map(([groupId, teams]) => ({
      [groupId]: teams
    }));
    onComplete(rankedGroupsArray);
  };

  return (
    <Container>
      <Title>🏆 Rank Teams in Groups</Title>
      
      <Instructions>
        <p><strong>How to rank:</strong></p>
        <p>Use the + and - buttons to move teams up or down in each group</p>
        <p>1st place = top, 4th place = bottom</p>
      </Instructions>

      <ProgressContainer>
        <ProgressText>
          Groups Ranked: {completedGroups}/{groups.length}
        </ProgressText>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
      </ProgressContainer>

      <GroupsContainer>
        {groups.map((group) => {
          const groupTeams = groupRankings[group.id] || [];
          
          return (
            <GroupCard key={group.id} isComplete={true}>
              <GroupHeader>{group.name}</GroupHeader>
              <TeamList>
                {groupTeams.map((team, index) => (
                  <TeamItem key={team.id} position={index + 1}>
                    <PositionBadge position={index + 1}>
                      {index + 1}
                    </PositionBadge>
                    <TeamFlag>{team.flag}</TeamFlag>
                    <TeamInfo>
                      <TeamName>{team.name}</TeamName>
                      <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                    </TeamInfo>
                    <RankControls>
                      <RankButton
                        direction="up"
                        disabled={!canMoveUp(group.id, index)}
                        onClick={() => moveTeam(group.id, index, 'up')}
                        title="Move up"
                      >
                        +
                      </RankButton>
                      <RankButton
                        direction="down"
                        disabled={!canMoveDown(group.id, index)}
                        onClick={() => moveTeam(group.id, index, 'down')}
                        title="Move down"
                      >
                        -
                      </RankButton>
                    </RankControls>
                  </TeamItem>
                ))}
              </TeamList>
            </GroupCard>
          );
        })}
      </GroupsContainer>

      <Button onClick={handleComplete}>
        Complete Group Rankings
      </Button>
    </Container>
  );
};

export default GroupRankingView;
