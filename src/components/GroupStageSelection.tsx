import React, { useState } from 'react';
import styled from 'styled-components';
import { Team } from '../types';
import { TOURNAMENT_CONFIG } from '../constants/tournament';

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
  isClickable: boolean;
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
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};

  ${props => props.isClickable && `
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px var(--shadow);
      border-color: ${props.isSelected ? 'var(--primary-color)' : 'rgba(59, 130, 246, 0.5)'};
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

const GroupStageSelection: React.FC<GroupStageSelectionProps> = ({ groups, onComplete }) => {
  const [groupSelections, setGroupSelections] = useState<{
    [groupId: string]: {
      first: Team | null;
      second: Team | null;
      third: Team | null;
    }
  }>({});

  // Calculate progress
  const completedGroups = Object.values(groupSelections).filter(
    selection => selection.first && selection.second
  ).length;
  const firstPlaceCount = Object.values(groupSelections).filter(selection => selection.first).length;
  const secondPlaceCount = Object.values(groupSelections).filter(selection => selection.second).length;
  const thirdPlaceCount = Object.values(groupSelections).filter(selection => selection.third).length;
  const totalSelected = firstPlaceCount + secondPlaceCount + thirdPlaceCount;

  const handleTeamClick = (groupId: string, team: Team) => {
    setGroupSelections(prev => {
      const current = prev[groupId] || { first: null, second: null, third: null };

      // Check if this team is already selected
      const isFirst = current.first?.id === team.id;
      const isSecond = current.second?.id === team.id;
      const isThird = current.third?.id === team.id;

      if (isFirst) {
        // Clicking on 1st: swap with 2nd (2nd becomes 1st, clicked team becomes unranked)
        return {
          ...prev,
          [groupId]: {
            first: current.second,  // 2nd becomes 1st (or null if no 2nd)
            second: current.third,  // 3rd becomes 2nd (or null if no 3rd)
            third: null             // Clicked team loses ranking
          }
        };
      } else if (isSecond) {
        // Clicking on 2nd: remove it, move 3rd to 2nd
        return {
          ...prev,
          [groupId]: {
            first: current.first,
            second: current.third,  // 3rd moves up to 2nd
            third: null
          }
        };
      } else if (isThird) {
        // Clicking on 3rd: remove it
        return {
          ...prev,
          [groupId]: {
            first: current.first,
            second: current.second,
            third: null
          }
        };
      } else {
        // Clicking on unselected team
        if (!current.first) {
          // No 1st yet: make this 1st
          return {
            ...prev,
            [groupId]: {
              first: team,
              second: current.second,
              third: current.third
            }
          };
        } else if (!current.second) {
          // 1st exists but no 2nd: make this 2nd
          return {
            ...prev,
            [groupId]: {
              first: current.first,
              second: team,
              third: current.third
            }
          };
        } else if (!current.third && thirdPlaceCount < TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS) {
          // 1st and 2nd exist, no 3rd yet, and we haven't reached max third-place teams: make this 3rd
          return {
            ...prev,
            [groupId]: {
              first: current.first,
              second: current.second,
              third: team
            }
          };
        } else if (current.third) {
          // All three exist: replace 3rd with this team
          return {
            ...prev,
            [groupId]: {
              first: current.first,
              second: current.second,
              third: team
            }
          };
        } else {
          // 1st and 2nd exist, but can't select 3rd (already have 8): replace 2nd
          return {
            ...prev,
            [groupId]: {
              first: current.first,
              second: team,
              third: current.third
            }
          };
        }
      }
    });
  };

  const handleComplete = () => {
    // Check if we have 24 teams (12 first + 12 second) and exactly 8 third-place teams
    if (completedGroups === TOURNAMENT_CONFIG.GROUPS_COUNT && thirdPlaceCount === TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS) {
      // Combine all qualified teams
      const allQualifiedTeams: Team[] = [];

      // Add all teams in order
      Object.values(groupSelections).forEach(selection => {
        if (selection.first) allQualifiedTeams.push(selection.first);
        if (selection.second) allQualifiedTeams.push(selection.second);
      });

      // Add 3rd place teams
      Object.values(groupSelections).forEach(selection => {
        if (selection.third) allQualifiedTeams.push(selection.third);
      });

      onComplete(allQualifiedTeams);
    }
  };

  return (
    <Container>
      <Title>🏆 2026 World Cup Group Stage</Title>

      <Instructions>
        <p><strong>How it works:</strong> Click teams to select 1st, 2nd, and 3rd place from each group</p>
        <p><strong>Required:</strong> {TOURNAMENT_CONFIG.GROUPS_COUNT} first-place + {TOURNAMENT_CONFIG.GROUPS_COUNT} second-place + {TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS} third-place teams = {TOURNAMENT_CONFIG.ADVANCING_TEAMS} total</p>
        <p><strong>Note:</strong> You can only select {TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS} third-place teams total (not all {TOURNAMENT_CONFIG.GROUPS_COUNT} groups will have a 3rd place team advance)</p>
      </Instructions>

      <SummaryContainer>
        <SummaryTitle>Selection Progress ({totalSelected}/{TOURNAMENT_CONFIG.ADVANCING_TEAMS} teams)</SummaryTitle>
        <SummaryGrid>
          <SummarySection>
            <SummaryCount type="first">{firstPlaceCount}/{TOURNAMENT_CONFIG.GROUPS_COUNT}</SummaryCount>
            <div>1st Place Teams</div>
          </SummarySection>
          <SummarySection>
            <SummaryCount type="second">{secondPlaceCount}/{TOURNAMENT_CONFIG.GROUPS_COUNT}</SummaryCount>
            <div>2nd Place Teams</div>
          </SummarySection>
          <SummarySection>
            <SummaryCount type="third">{thirdPlaceCount}/{TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS}</SummaryCount>
            <div>3rd Place Teams {thirdPlaceCount === TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS && '✓'}</div>
          </SummarySection>
        </SummaryGrid>
      </SummaryContainer>

      <GroupsContainer>
        {groups.map((group) => {
          const selection = groupSelections[group.id];
          const isComplete = selection?.first && selection?.second;
          const hasThirdPlace = !!selection?.third;

          return (
            <GroupCard key={group.id} isComplete={!!isComplete && (hasThirdPlace || thirdPlaceCount === TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS)}>
              <GroupHeader>
                {group.name}
                {hasThirdPlace && ' • 3rd selected'}
              </GroupHeader>
              <TeamList>
                {group.teams.map((team) => {
                  const isFirst = selection?.first?.id === team.id;
                  const isSecond = selection?.second?.id === team.id;
                  const isThird = selection?.third?.id === team.id;
                  const isSelected = isFirst || isSecond || isThird;

                  // All teams are clickable
                  const isClickable = true;

                  return (
                    <TeamItem
                      key={team.id}
                      isSelected={isSelected}
                      position={isFirst ? 1 : isSecond ? 2 : isThird ? 3 : 0}
                      isThirdPlace={false}
                      canSelectThird={false}
                      isClickable={isClickable}
                      onClick={() => handleTeamClick(group.id, team)}
                    >
                      <TeamFlag>{team.flag}</TeamFlag>
                      <TeamInfo>
                        <TeamName>{team.name}</TeamName>
                        <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                      </TeamInfo>
                      {isFirst && (
                        <PositionBadge position={1}>1st ✓</PositionBadge>
                      )}
                      {isSecond && (
                        <PositionBadge position={2}>2nd ✓</PositionBadge>
                      )}
                      {isThird && (
                        <PositionBadge position={3}>3rd ✓</PositionBadge>
                      )}
                    </TeamItem>
                  );
                })}
              </TeamList>
            </GroupCard>
          );
        })}
      </GroupsContainer>

      <Button
        onClick={handleComplete}
        disabled={!(completedGroups === TOURNAMENT_CONFIG.GROUPS_COUNT && thirdPlaceCount === TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS)}
      >
        {totalSelected < TOURNAMENT_CONFIG.ADVANCING_TEAMS
          ? `Select ${TOURNAMENT_CONFIG.ADVANCING_TEAMS - totalSelected} more teams (need ${TOURNAMENT_CONFIG.GROUPS_COUNT - firstPlaceCount} 1st, ${TOURNAMENT_CONFIG.GROUPS_COUNT - secondPlaceCount} 2nd, ${TOURNAMENT_CONFIG.THIRD_PLACE_TEAMS - thirdPlaceCount} 3rd)`
          : `Complete Group Stage (${TOURNAMENT_CONFIG.ADVANCING_TEAMS} teams qualified) ✓`
        }
      </Button>
    </Container>
  );
};

export default GroupStageSelection;
