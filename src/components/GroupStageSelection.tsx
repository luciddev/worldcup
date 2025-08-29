import React, { useState } from 'react';
import styled from 'styled-components';
import { Team } from '../types';

interface GroupStageSelectionProps {
  groups: { id: string; name: string; teams: Team[] }[];
  onComplete: (allQualifiedTeams: Team[]) => void;
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
`;

const Instructions = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-primary);
`;

const StageIndicator = styled.div<{ isActive: boolean; isComplete: boolean }>`
  background: ${props => {
    if (props.isComplete) return 'var(--success-gradient)';
    if (props.isActive) return 'var(--primary-gradient)';
    return 'var(--bg-card)';
  }};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  border: 2px solid ${props => {
    if (props.isComplete) return '#10b981';
    if (props.isActive) return 'var(--primary-color)';
    return 'var(--border-color)';
  }};
`;

const GroupsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
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
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TeamItem = styled.div<{ 
  isSelected: boolean; 
  position: number;
  isThirdPlace: boolean;
  canSelectThird: boolean;
}>`
  background: ${props => {
    if (props.isSelected) return 'var(--primary-gradient)';
    if (props.isThirdPlace && props.canSelectThird) return 'rgba(245, 158, 11, 0.1)';
    return 'var(--bg-card)';
  }};
  border: 1px solid ${props => {
    if (props.isSelected) return 'var(--primary-color)';
    if (props.isThirdPlace && props.canSelectThird) return '#f59e0b';
    return 'var(--border-color)';
  }};
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  cursor: ${props => props.isThirdPlace && props.canSelectThird ? 'pointer' : 'default'};
  
  ${props => props.isThirdPlace && props.canSelectThird && `
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--shadow);
    }
  `}
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
`;

const SummaryContainer = styled.div`
  background: var(--bg-card);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SummarySection = styled.div`
  text-align: center;
`;

const SummaryCount = styled.div<{ type: 'first' | 'second' | 'third' }>`
  background: ${props => {
    switch (props.type) {
      case 'first': return '#10b981';
      case 'second': return '#3b82f6';
      case 'third': return '#f59e0b';
    }
  }};
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
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
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px var(--shadow-hover);
  }
`;

type Stage = 'group-selection' | 'third-place-selection';

const GroupStageSelection: React.FC<GroupStageSelectionProps> = ({ groups, onComplete }) => {
  const [stage, setStage] = useState<Stage>('group-selection');
  const [groupSelections, setGroupSelections] = useState<{ [groupId: string]: { first: Team | null; second: Team | null } }>({});
  const [selectedThirdPlaceTeams, setSelectedThirdPlaceTeams] = useState<Team[]>([]);

  // Calculate progress
  const completedGroups = Object.values(groupSelections).filter(selection => selection.first && selection.second).length;
  const firstPlaceCount = Object.values(groupSelections).filter(selection => selection.first).length;
  const secondPlaceCount = Object.values(groupSelections).filter(selection => selection.second).length;

  const handleTeamClick = (groupId: string, team: Team, position: 1 | 2) => {
    setGroupSelections(prev => {
      const current = prev[groupId] || { first: null, second: null };
      
      if (position === 1) {
        // If clicking on first position
        if (current.first?.id === team.id) {
          // Remove from first
          return { ...prev, [groupId]: { first: null, second: current.second } };
        } else if (current.second?.id === team.id) {
          // Move from second to first
          return { ...prev, [groupId]: { first: team, second: null } };
        } else {
          // Set as first, remove from second if it was there
          return { ...prev, [groupId]: { first: team, second: current.second } };
        }
      } else {
        // If clicking on second position
        if (current.second?.id === team.id) {
          // Remove from second
          return { ...prev, [groupId]: { first: current.first, second: null } };
        } else if (current.first?.id === team.id) {
          // Move from first to second
          return { ...prev, [groupId]: { first: null, second: team } };
        } else {
          // Set as second, remove from first if it was there
          return { ...prev, [groupId]: { first: current.first, second: team } };
        }
      }
    });
  };

  const handleThirdPlaceClick = (group: { id: string; name: string; teams: Team[] }) => {
    const thirdPlaceTeam = group.teams[2]; // 3rd team (index 2)
    if (!thirdPlaceTeam) return;

    const isSelected = selectedThirdPlaceTeams.some(team => team.id === thirdPlaceTeam.id);
    
    if (isSelected) {
      // Remove from selection
      setSelectedThirdPlaceTeams(prev => prev.filter(team => team.id !== thirdPlaceTeam.id));
    } else {
      // Add to selection (if we haven't reached 8 teams)
      if (selectedThirdPlaceTeams.length < 8) {
        setSelectedThirdPlaceTeams(prev => [...prev, thirdPlaceTeam]);
      }
    }
  };

  const handleCompleteGroupStage = () => {
    if (completedGroups === 12) {
      setStage('third-place-selection');
    }
  };

  const handleCompleteThirdPlace = () => {
    if (selectedThirdPlaceTeams.length === 8) {
      // Combine all qualified teams
      const allQualifiedTeams: Team[] = [];
      
      // Add 1st and 2nd place teams
      Object.values(groupSelections).forEach(selection => {
        if (selection.first) allQualifiedTeams.push(selection.first);
        if (selection.second) allQualifiedTeams.push(selection.second);
      });
      
      // Add 3rd place teams
      allQualifiedTeams.push(...selectedThirdPlaceTeams);
      
      onComplete(allQualifiedTeams);
    }
  };

  const canSelectThirdPlace = (groupId: string): boolean => {
    const selection = groupSelections[groupId];
    return !!(selection?.first && selection?.second); // Can only select 3rd place if 1st and 2nd are selected
  };

  return (
    <Container>
      <Title>🏆 2026 World Cup Group Stage</Title>
      
      <Instructions>
        <p><strong>Stage 1:</strong> Select 1st and 2nd place from each group (24 teams total)</p>
        <p><strong>Stage 2:</strong> Select 8 best 3rd place teams from the 12 groups</p>
        <p><strong>Total:</strong> 32 teams will advance to the Round of 32</p>
      </Instructions>

      <StageIndicator 
        isActive={stage === 'group-selection'} 
        isComplete={stage === 'third-place-selection'}
      >
        {stage === 'group-selection' 
          ? `Stage 1: Group Selection (${completedGroups}/12 groups complete)`
          : 'Stage 1: Group Selection ✅ Complete'
        }
      </StageIndicator>

      {stage === 'third-place-selection' && (
        <StageIndicator 
          isActive={stage === 'third-place-selection'} 
          isComplete={false}
        >
          Stage 2: Third Place Selection ({selectedThirdPlaceTeams.length}/8 teams selected)
        </StageIndicator>
      )}

      {stage === 'group-selection' && (
        <SummaryContainer>
          <SummaryTitle>Group Stage Progress</SummaryTitle>
          <SummaryGrid>
            <SummarySection>
              <SummaryCount type="first">{firstPlaceCount}/12</SummaryCount>
              <div>1st Place Teams</div>
            </SummarySection>
            <SummarySection>
              <SummaryCount type="second">{secondPlaceCount}/12</SummaryCount>
              <div>2nd Place Teams</div>
            </SummarySection>
            <SummarySection>
              <SummaryCount type="third">0/8</SummaryCount>
              <div>3rd Place Teams</div>
            </SummarySection>
          </SummaryGrid>
        </SummaryContainer>
      )}

      {stage === 'third-place-selection' && selectedThirdPlaceTeams.length > 0 && (
        <SummaryContainer>
          <SummaryTitle>Selected Third-Place Teams</SummaryTitle>
          <SummaryGrid>
            {selectedThirdPlaceTeams.map((team, index) => (
              <TeamItem key={team.id} isSelected={true} position={3} isThirdPlace={true} canSelectThird={false}>
                <TeamFlag>{team.flag}</TeamFlag>
                <TeamInfo>
                  <TeamName>{team.name}</TeamName>
                  <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                </TeamInfo>
                <PositionBadge position={index + 1}>#{index + 1}</PositionBadge>
              </TeamItem>
            ))}
          </SummaryGrid>
        </SummaryContainer>
      )}

      <GroupsContainer>
        {groups.map((group) => {
          const selection = groupSelections[group.id];
          const isComplete = selection?.first && selection?.second;
          const canSelectThird = canSelectThirdPlace(group.id);
          const thirdPlaceTeam = group.teams[2];
          const isThirdSelected = selectedThirdPlaceTeams.some(team => team.id === thirdPlaceTeam?.id);
          
          return (
            <GroupCard key={group.id} isComplete={!!isComplete}>
              <GroupHeader>{group.name}</GroupHeader>
              <TeamList>
                {group.teams.map((team, index) => {
                  const position = index + 1;
                  const isSelected = (selection?.first?.id === team.id) || (selection?.second?.id === team.id);
                  const isFirst = selection?.first?.id === team.id;
                  const isSecond = selection?.second?.id === team.id;
                  
                  return (
                    <TeamItem 
                      key={team.id} 
                      isSelected={isSelected}
                      position={position}
                      isThirdPlace={position === 3}
                      canSelectThird={position === 3 && canSelectThird && stage === 'third-place-selection'}
                      onClick={() => {
                        if (stage === 'group-selection') {
                          if (position <= 2) {
                            handleTeamClick(group.id, team, position as 1 | 2);
                          }
                        } else if (stage === 'third-place-selection' && position === 3 && canSelectThird) {
                          handleThirdPlaceClick(group);
                        }
                      }}
                    >
                      <TeamFlag>{team.flag}</TeamFlag>
                      <TeamInfo>
                        <TeamName>{team.name}</TeamName>
                        <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                      </TeamInfo>
                      <PositionBadge position={position}>
                        {position === 1 ? '1st' : position === 2 ? '2nd' : position === 3 ? '3rd' : '4th'}
                        {isFirst && ' ✓'}
                        {isSecond && ' ✓'}
                        {position === 3 && isThirdSelected && ' ✓'}
                      </PositionBadge>
                    </TeamItem>
                  );
                })}
              </TeamList>
            </GroupCard>
          );
        })}
      </GroupsContainer>

      {stage === 'group-selection' ? (
        <Button 
          onClick={handleCompleteGroupStage}
          disabled={completedGroups !== 12}
        >
          {completedGroups < 12 
            ? `Complete ${12 - completedGroups} more groups` 
            : 'Continue to Third Place Selection'
          }
        </Button>
      ) : (
        <Button 
          onClick={handleCompleteThirdPlace}
          disabled={selectedThirdPlaceTeams.length !== 8}
        >
          {selectedThirdPlaceTeams.length < 8 
            ? `Select ${8 - selectedThirdPlaceTeams.length} more third-place teams` 
            : 'Complete Group Stage (32 teams qualified)'
          }
        </Button>
      )}
    </Container>
  );
};

export default GroupStageSelection;
