import React, { useState } from 'react';
import styled from 'styled-components';
import { Group, Team as TeamType } from '../types';
import Team from './Team';
import TeamSelectionView from './TeamSelectionView';
import GroupStageSelection from './GroupStageSelection';
import { Button, Card, Section, SectionTitle, Flex, Badge, Grid } from './styled/Common';

interface PlayInRoundProps {
  groups: Group[];
  onComplete: (advancingTeams: TeamType[]) => void;
}

const PlayInContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const GroupCard = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

const GroupHeader = styled.div`
  background: var(--primary-gradient);
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
`;

const GroupTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Instructions = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProgressContainer = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 8px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: var(--primary-gradient);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const PlayInRound: React.FC<PlayInRoundProps> = ({ groups, onComplete }) => {
  const [groupSelections, setGroupSelections] = useState<{ [groupId: string]: { first: TeamType | null; second: TeamType | null } }>({});
  const [viewMode, setViewMode] = useState<'groups' | 'selection' | 'group-stage'>('groups');

  const handleTeamClick = (groupId: string, team: TeamType) => {
    setGroupSelections(prev => {
      const current = prev[groupId] || { first: null, second: null };
      
      // If team is already selected, remove it
      if (current.first?.id === team.id) {
        return {
          ...prev,
          [groupId]: { first: current.second, second: null }
        };
      }
      if (current.second?.id === team.id) {
        return {
          ...prev,
          [groupId]: { first: current.first, second: null }
        };
      }
      
      // If no teams selected, assign to first position
      if (!current.first && !current.second) {
        return {
          ...prev,
          [groupId]: { first: team, second: null }
        };
      }
      
      // If only first position filled, assign to second
      if (current.first && !current.second) {
        return {
          ...prev,
          [groupId]: { first: current.first, second: team }
        };
      }
      
      // If both positions filled, replace second position
      if (current.first && current.second) {
        return {
          ...prev,
          [groupId]: { first: current.first, second: team }
        };
      }
      
      return prev;
    });
  };

  const handlePositionToggle = (groupId: string) => {
    setGroupSelections(prev => {
      const current = prev[groupId];
      if (current?.first && current?.second) {
        return {
          ...prev,
          [groupId]: { first: current.second, second: current.first }
        };
      }
      return prev;
    });
  };

  const getTeamPosition = (groupId: string, teamId: number): number | null => {
    const selection = groupSelections[groupId];
    if (!selection) return null;
    if (selection.first?.id === teamId) return 1;
    if (selection.second?.id === teamId) return 2;
    return null;
  };

  const completedGroups = Object.keys(groupSelections).filter(
    groupId => groupSelections[groupId].first && groupSelections[groupId].second
  ).length;

  const progress = (completedGroups / groups.length) * 100;

  const handleComplete = () => {
    const advancingTeams: TeamType[] = [];
    
    groups.forEach(group => {
      const selection = groupSelections[group.id];
      if (selection.first) advancingTeams.push(selection.first);
      if (selection.second) advancingTeams.push(selection.second);
    });
    
    if (advancingTeams.length === 32) {
      onComplete(advancingTeams);
    }
  };

  const canComplete = completedGroups === groups.length;

  const ViewToggle = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  `;

  const ToggleButton = styled.button<{ active: boolean }>`
    background: ${props => props.active ? 'var(--primary-gradient)' : 'var(--bg-card)'};
    color: ${props => props.active ? 'white' : 'var(--text-primary)'};
    border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--shadow);
    }
  `;

  return (
    <PlayInContainer>
      <ViewToggle>
        <ToggleButton 
          active={viewMode === 'groups'} 
          onClick={() => setViewMode('groups')}
        >
          📊 Group View
        </ToggleButton>
        <ToggleButton 
          active={viewMode === 'selection'} 
          onClick={() => setViewMode('selection')}
        >
          🎯 Team Selection
        </ToggleButton>
        <ToggleButton 
          active={viewMode === 'group-stage'} 
          onClick={() => setViewMode('group-stage')}
        >
          🏆 2026 Group Stage
        </ToggleButton>
      </ViewToggle>

      {viewMode === 'selection' ? (
        <TeamSelectionView onComplete={onComplete} />
      ) : viewMode === 'group-stage' ? (
        <GroupStageSelection groups={groups} onComplete={onComplete} />
      ) : (
        <>
          <Section>
            <SectionTitle>🏆 Play-in Tournament - Group Stage</SectionTitle>
        
        <Instructions>
          <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>
            Select the top 2 teams from each group
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Click on teams to select them. Click the position pill to swap 1st and 2nd place. 
            The top 2 teams from each group will advance to the main tournament.
          </p>
        </Instructions>

        <ProgressContainer>
          <Flex justify="space-between" align="center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Progress: {completedGroups}/{groups.length} Groups Complete
              </h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {32 - (completedGroups * 2)} teams remaining to advance
              </p>
            </div>
            <Badge variant="primary">
              {Math.round(progress)}% Complete
            </Badge>
          </Flex>
          
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ProgressContainer>
      </Section>

      <Grid columns={2}>
        {groups.map((group) => {
          const selection = groupSelections[group.id];
          const hasBothPositions = selection?.first && selection?.second;
          
          return (
            <GroupCard key={group.id}>
              <GroupHeader>
                <GroupTitle>{group.name}</GroupTitle>
              </GroupHeader>
              
              <TeamsContainer>
                {group.teams.map((team) => {
                  const position = getTeamPosition(group.id, team.id);
                  const isSelected = position !== null;
                  
                  return (
                    <div key={team.id} style={{ position: 'relative' }}>
                      <Team
                        team={team}
                        onClick={() => handleTeamClick(group.id, team)}
                        selected={isSelected}
                        position={position}
                        size="medium"
                        showSeed
                      />
                    </div>
                  );
                })}
              </TeamsContainer>
              
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                {hasBothPositions ? (
                  <Flex justify="center" gap="1rem" align="center">
                    <Badge variant="success">
                      ✅ Complete - {selection.first?.name} & {selection.second?.name} advance
                    </Badge>
                    <Button
                      variant="secondary"
                      onClick={() => handlePositionToggle(group.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                      🔄 Swap Positions
                    </Button>
                  </Flex>
                ) : (
                  <Badge variant="warning">
                    ⏳ Select 2 teams to advance
                  </Badge>
                )}
              </div>
            </GroupCard>
          );
        })}
      </Grid>

      <Flex justify="center" gap="1rem" style={{ marginTop: '2rem' }}>
        <Button
          variant="success"
          onClick={handleComplete}
          disabled={!canComplete}
        >
          {canComplete ? 'Complete Play-in Tournament' : `Complete ${completedGroups}/${groups.length} Groups`}
        </Button>
      </Flex>

      {canComplete && (
        <Card style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>
            🎉 Play-in Tournament Complete!
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            The following 32 teams have advanced to the main tournament:
          </p>
          <Flex justify="center" gap="0.5rem" style={{ flexWrap: 'wrap' }}>
            {groups.map(group => {
              const selection = groupSelections[group.id];
              return (
                <React.Fragment key={group.id}>
                  {selection.first && (
                    <Badge key={`${group.id}-1`} variant="success">
                      {selection.first.flag} {selection.first.name} (1st)
                    </Badge>
                  )}
                  {selection.second && (
                    <Badge key={`${group.id}-2`} variant="success">
                      {selection.second.flag} {selection.second.name} (2nd)
                    </Badge>
                  )}
                </React.Fragment>
              );
            })}
          </Flex>
        </Card>
      )}
        </>
      )}
    </PlayInContainer>
  );
};

export default PlayInRound;
