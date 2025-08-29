import React, { useState } from 'react';
import styled from 'styled-components';
import { Team } from '../types';
import { getAllTeams } from '../data/teams';

interface TeamSelectionViewProps {
  onComplete: (selectedTeams: Team[]) => void;
}

const Container = styled.div`
  max-width: 1200px;
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

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Column = styled.div<{ isSelected: boolean }>`
  background: var(--bg-card);
  border: 2px solid ${props => props.isSelected ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 16px;
  padding: 1.5rem;
  min-height: 400px;
  transition: all 0.3s ease;
`;

const ColumnTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;

const TeamCount = styled.div`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 300px;
`;

const TeamItem = styled.div<{ isDragging: boolean; isSelected: boolean }>`
  background: ${props => props.isSelected ? 'var(--primary-gradient)' : 'var(--bg-card)'};
  border: 1px solid ${props => props.isSelected ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isDragging ? 'scale(0.95)' : 'scale(1)'};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--shadow);
  }
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

const GroupSection = styled.div`
  margin-bottom: 1.5rem;
`;

const GroupHeader = styled.div`
  background: var(--primary-gradient);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
`;

const TeamItemDisabled = styled(TeamItem)`
  opacity: 0.5;
  cursor: not-allowed;
  
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

const DragHandle = styled.div`
  color: var(--text-secondary);
  cursor: grab;
  font-size: 1rem;
  
  &:active {
    cursor: grabbing;
  }
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

const TeamSelectionView: React.FC<TeamSelectionViewProps> = ({ onComplete }) => {
  const [availableTeams, setAvailableTeams] = useState<Team[]>(getAllTeams());
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [draggedTeam, setDraggedTeam] = useState<Team | null>(null);

  // Group teams by their group (every 4 teams = 1 group)
  const getTeamGroup = (teamId: number): string => {
    const groupIndex = Math.floor((teamId - 1) / 4);
    return String.fromCharCode(65 + groupIndex); // A, B, C, etc.
  };

  // Check if we can add more teams from a specific group
  const canAddFromGroup = (groupId: string): boolean => {
    const teamsFromGroup = selectedTeams.filter(team => getTeamGroup(team.id) === groupId);
    return teamsFromGroup.length < 3;
  };

  const handleTeamClick = (team: Team, fromSelected: boolean) => {
    if (fromSelected) {
      // Move from selected to available
      setSelectedTeams(prev => prev.filter(t => t.id !== team.id));
      setAvailableTeams(prev => [...prev, team]);
    } else {
      // Check if we can add more teams from this group
      const teamGroup = getTeamGroup(team.id);
      if (!canAddFromGroup(teamGroup)) {
        return; // Can't add more teams from this group
      }
      
      // Move from available to selected
      setAvailableTeams(prev => prev.filter(t => t.id !== team.id));
      setSelectedTeams(prev => [...prev, team]);
    }
  };

  const handleDragStart = (e: React.DragEvent, team: Team) => {
    setDraggedTeam(team);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetList: 'available' | 'selected') => {
    e.preventDefault();
    if (!draggedTeam) return;

    if (targetList === 'selected') {
      // Check if we can add more teams from this group
      const teamGroup = getTeamGroup(draggedTeam.id);
      if (!canAddFromGroup(teamGroup)) {
        setDraggedTeam(null);
        return; // Can't add more teams from this group
      }
      
      // Move to selected
      setAvailableTeams(prev => prev.filter(t => t.id !== draggedTeam.id));
      setSelectedTeams(prev => [...prev, draggedTeam]);
    } else {
      // Move to available
      setSelectedTeams(prev => prev.filter(t => t.id !== draggedTeam.id));
      setAvailableTeams(prev => [...prev, draggedTeam]);
    }
    setDraggedTeam(null);
  };

  const handleDragEnd = () => {
    setDraggedTeam(null);
  };

  const moveTeamInList = (fromIndex: number, toIndex: number) => {
    const newSelectedTeams = [...selectedTeams];
    const [movedTeam] = newSelectedTeams.splice(fromIndex, 1);
    newSelectedTeams.splice(toIndex, 0, movedTeam);
    setSelectedTeams(newSelectedTeams);
  };

  const handleComplete = () => {
    if (selectedTeams.length >= 8) {
      onComplete(selectedTeams.slice(0, 8)); // Take first 8 teams
    }
  };

  return (
    <Container>
      <Title>🏆 Select Your Play-in Teams</Title>
      
      <Instructions>
        <p><strong>How to use:</strong></p>
        <p>1. Click or drag teams from the left column to the right (max 3 per group)</p>
        <p>2. Drag teams in the right column to reorder them (1st place = top)</p>
        <p>3. Select at least 8 teams to continue</p>
        <p><strong>Note:</strong> Teams are organized by their group (A-P). You can select up to 3 teams from each group.</p>
      </Instructions>

      <ColumnsContainer>
        <Column isSelected={false}>
          <ColumnTitle>Available Teams</ColumnTitle>
          <TeamCount>{availableTeams.length} teams available</TeamCount>
          <TeamList
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'available')}
          >
            {Array.from({ length: 16 }, (_, i) => {
              const groupId = String.fromCharCode(65 + i);
              const groupTeams = availableTeams.filter(team => getTeamGroup(team.id) === groupId);
              
              if (groupTeams.length === 0) return null;
              
              return (
                <GroupSection key={groupId}>
                  <GroupHeader>Group {groupId}</GroupHeader>
                  {groupTeams.map((team) => {
                    const canAdd = canAddFromGroup(groupId);
                    const TeamComponent = canAdd ? TeamItem : TeamItemDisabled;
                    
                    return (
                      <TeamComponent
                        key={team.id}
                        isDragging={draggedTeam?.id === team.id}
                        isSelected={false}
                        onClick={() => canAdd && handleTeamClick(team, false)}
                        draggable={canAdd}
                        onDragStart={canAdd ? (e) => handleDragStart(e, team) : undefined}
                        onDragEnd={handleDragEnd}
                      >
                        <TeamFlag>{team.flag}</TeamFlag>
                        <TeamInfo>
                          <TeamName>{team.name}</TeamName>
                          <TeamDetails>Seed {team.seed} • {team.region} • Group {groupId}</TeamDetails>
                        </TeamInfo>
                        <DragHandle>⋮⋮</DragHandle>
                      </TeamComponent>
                    );
                  })}
                </GroupSection>
              );
            })}
          </TeamList>
        </Column>

        <Column isSelected={true}>
          <ColumnTitle>Selected Teams</ColumnTitle>
          <TeamCount>{selectedTeams.length} teams selected</TeamCount>
          <TeamList
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'selected')}
          >
            {selectedTeams.map((team, index) => (
              <TeamItem
                key={team.id}
                isDragging={draggedTeam?.id === team.id}
                isSelected={true}
                onClick={() => handleTeamClick(team, true)}
                draggable
                onDragStart={(e) => handleDragStart(e, team)}
                onDragEnd={handleDragEnd}
                style={{ order: index }}
              >
                <TeamFlag>{team.flag}</TeamFlag>
                <TeamInfo>
                  <TeamName>{team.name}</TeamName>
                  <TeamDetails>#{index + 1} • Seed {team.seed} • {team.region} • Group {getTeamGroup(team.id)}</TeamDetails>
                </TeamInfo>
                <DragHandle>⋮⋮</DragHandle>
              </TeamItem>
            ))}
          </TeamList>
        </Column>
      </ColumnsContainer>

      <Button 
        onClick={handleComplete}
        disabled={selectedTeams.length < 8}
      >
        {selectedTeams.length < 8 
          ? `Select ${8 - selectedTeams.length} more teams` 
          : 'Continue to Tournament'
        }
      </Button>
    </Container>
  );
};

export default TeamSelectionView;
