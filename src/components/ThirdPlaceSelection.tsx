import React, { useState } from 'react';
import styled from 'styled-components';
import { Team } from '../types';

interface ThirdPlaceSelectionProps {
  groups: { id: string; name: string; teams: Team[] }[];
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

const GroupsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GroupCard = styled.div<{ isSelected: boolean }>`
  background: var(--bg-card);
  border: 2px solid ${props => props.isSelected ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow);
  }
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

const TeamItem = styled.div<{ isSelected: boolean; isThirdPlace: boolean }>`
  background: ${props => props.isSelected ? 'var(--primary-gradient)' : 'var(--bg-card)'};
  border: 1px solid ${props => props.isSelected ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  
  ${props => props.isThirdPlace && `
    border-left: 4px solid #f59e0b;
    background: ${props.isSelected ? 'var(--primary-gradient)' : 'rgba(245, 158, 11, 0.1)'};
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

const SelectedTeamsContainer = styled.div`
  background: var(--bg-card);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SelectedTeamsTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;

const SelectedTeamsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
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

const ThirdPlaceSelection: React.FC<ThirdPlaceSelectionProps> = ({ groups, onComplete }) => {
  const [selectedThirdPlaceTeams, setSelectedThirdPlaceTeams] = useState<Team[]>([]);

  const handleGroupClick = (group: { id: string; name: string; teams: Team[] }) => {
    // Find the 3rd place team in this group (assuming teams are ordered by position)
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

  const handleComplete = () => {
    if (selectedThirdPlaceTeams.length === 8) {
      onComplete(selectedThirdPlaceTeams);
    }
  };

  return (
    <Container>
      <Title>🏆 Select 8 Third-Place Teams</Title>
      
      <Instructions>
        <p><strong>How to use:</strong></p>
        <p>Click on groups to select their 3rd place team for the knockout stage</p>
        <p>You need to select exactly 8 third-place teams to continue</p>
        <p><strong>Note:</strong> Only the 3rd place team from each group can be selected (highlighted in orange)</p>
      </Instructions>

      {selectedThirdPlaceTeams.length > 0 && (
        <SelectedTeamsContainer>
          <SelectedTeamsTitle>
            Selected Third-Place Teams ({selectedThirdPlaceTeams.length}/8)
          </SelectedTeamsTitle>
          <SelectedTeamsList>
            {selectedThirdPlaceTeams.map((team, index) => (
              <TeamItem key={team.id} isSelected={true} isThirdPlace={true}>
                <TeamFlag>{team.flag}</TeamFlag>
                <TeamInfo>
                  <TeamName>{team.name}</TeamName>
                  <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                </TeamInfo>
                <PositionBadge position={index + 1}>#{index + 1}</PositionBadge>
              </TeamItem>
            ))}
          </SelectedTeamsList>
        </SelectedTeamsContainer>
      )}

      <GroupsContainer>
        {groups.map((group) => {
          const thirdPlaceTeam = group.teams[2];
          const isSelected = selectedThirdPlaceTeams.some(team => team.id === thirdPlaceTeam?.id);
          
          return (
            <GroupCard 
              key={group.id} 
              isSelected={isSelected}
              onClick={() => handleGroupClick(group)}
            >
              <GroupHeader>{group.name}</GroupHeader>
              <TeamList>
                {group.teams.map((team, index) => (
                  <TeamItem 
                    key={team.id} 
                    isSelected={isSelected && team.id === thirdPlaceTeam?.id}
                    isThirdPlace={index === 2}
                  >
                    <TeamFlag>{team.flag}</TeamFlag>
                    <TeamInfo>
                      <TeamName>{team.name}</TeamName>
                      <TeamDetails>Seed {team.seed} • {team.region}</TeamDetails>
                    </TeamInfo>
                    <PositionBadge position={index + 1}>
                      {index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : '4th'}
                    </PositionBadge>
                  </TeamItem>
                ))}
              </TeamList>
            </GroupCard>
          );
        })}
      </GroupsContainer>

      <Button 
        onClick={handleComplete}
        disabled={selectedThirdPlaceTeams.length !== 8}
      >
        {selectedThirdPlaceTeams.length < 8 
          ? `Select ${8 - selectedThirdPlaceTeams.length} more third-place teams` 
          : 'Continue to Knockout Stage'
        }
      </Button>
    </Container>
  );
};

export default ThirdPlaceSelection;
