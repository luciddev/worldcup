import React, { useState } from 'react';
import { Container, Header, Title, Subtitle, Button, Flex, Card, ThemeToggle } from './components/styled/Common';
import { TournamentState, Team } from './types';
import { getInitialTournamentState, updatePlayInWinners, advanceWinners, canAdvanceRound, autoPickPlayInTeams, autoAdvanceBracket } from './utils/tournamentLogic';
import { getTeamById } from './data/teams';
import PlayInRound from './components/PlayInRound';
import BracketGridComponent from './components/BracketGrid';
import TestControls from './components/TestControls';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const [tournamentState, setTournamentState] = useState<TournamentState>(getInitialTournamentState());
  const { theme, toggleTheme } = useTheme();

  const handlePlayInComplete = (winners: Team[]) => {
    const updatedState = updatePlayInWinners(tournamentState, winners);
    setTournamentState({
      ...updatedState,
      currentRound: 1 // Move to Round of 32
    });
  };

  const handleSelectWinner = (roundIndex: number, matchIndex: number, teamId: number) => {
    const team = getTeamById(teamId);
    if (!team) return;

    console.log(`Selecting winner: ${team.name} in round ${roundIndex + 1}, match ${matchIndex + 1}`);

    const updatedRounds = [...tournamentState.rounds];
    const currentRound = updatedRounds[roundIndex];
    
    // Set the winner for the current match
    currentRound.matches[matchIndex].winner = team;

    // Automatically advance winners to the next round
    if (roundIndex < updatedRounds.length - 1) {
      const nextRound = updatedRounds[roundIndex + 1];
      const nextMatchIndex = Math.floor(matchIndex / 2);
      
      if (matchIndex % 2 === 0) {
        // First match of the pair - goes to team1
        nextRound.matches[nextMatchIndex].team1 = team;
        console.log(`Advanced ${team.name} to next round (team1) at match ${nextMatchIndex + 1}`);
      } else {
        // Second match of the pair - goes to team2
        nextRound.matches[nextMatchIndex].team2 = team;
        console.log(`Advanced ${team.name} to next round (team2) at match ${nextMatchIndex + 1}`);
      }
    }

    // Check if current round is complete
    const isRoundComplete = currentRound.matches.every(match => match.winner !== null);
    if (isRoundComplete) {
      currentRound.isComplete = true;
      console.log(`Round ${roundIndex + 1} is now complete`);
    }

    setTournamentState({
      ...tournamentState,
      rounds: updatedRounds
    });
  };

  const handleAdvanceRound = () => {
    if (!canAdvanceRound(tournamentState.rounds, tournamentState.currentRound)) {
      return;
    }

    const updatedRounds = advanceWinners(tournamentState.rounds, tournamentState.currentRound);
    setTournamentState({
      ...tournamentState,
      rounds: updatedRounds,
      currentRound: tournamentState.currentRound + 1
    });
  };

  const handleResetTournament = () => {
    setTournamentState(getInitialTournamentState());
  };

  const handleAutoPickPlayIn = () => {
    const autoSelections = autoPickPlayInTeams(tournamentState.playInGroups);
    const advancingTeams: Team[] = [];
    
    Object.values(autoSelections).forEach(selection => {
      advancingTeams.push(selection.first, selection.second);
    });
    
    handlePlayInComplete(advancingTeams);
  };

  const handleAutoAdvanceBracket = () => {
    const updatedRounds = autoAdvanceBracket(tournamentState.rounds, tournamentState.currentRound);
    setTournamentState({
      ...tournamentState,
      rounds: updatedRounds,
      currentRound: tournamentState.currentRound + 1
    });
  };

  const renderCurrentView = () => {
    if (tournamentState.currentRound === 0) {
      return (
        <PlayInRound
          groups={tournamentState.playInGroups}
          onComplete={handlePlayInComplete}
        />
      );
    }

    return (
      <BracketGridComponent
        rounds={tournamentState.rounds}
        currentRound={tournamentState.currentRound}
        onSelectWinner={handleSelectWinner}
        onAdvanceRound={handleAdvanceRound}
      />
    );
  };

  return (
    <div>
      <Header>
        <Container>
          <Flex justify="space-between" align="center">
            <div>
              <Title>World Cup 2026</Title>
              <Subtitle>Tournament Bracket Challenge</Subtitle>
            </div>
            <ThemeToggle onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </ThemeToggle>
          </Flex>
        </Container>
      </Header>

      <Container>
        <TestControls
          onAutoPickPlayIn={handleAutoPickPlayIn}
          onAutoAdvanceBracket={handleAutoAdvanceBracket}
          onResetTournament={handleResetTournament}
          currentRound={tournamentState.currentRound}
          isPlayInComplete={tournamentState.isPlayInComplete}
        />

        {tournamentState.currentRound > 0 && (
          <Card style={{ marginBottom: '2rem' }}>
            <Flex justify="space-between" align="center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Tournament Progress
                </h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  {tournamentState.currentRound === 1 && 'Play-in tournament completed! Main bracket begins.'}
                  {tournamentState.currentRound > 1 && tournamentState.currentRound <= 5 && 
                    `Round ${tournamentState.currentRound - 1} completed. ${tournamentState.rounds[tournamentState.currentRound - 1]?.name} in progress.`
                  }
                  {tournamentState.currentRound > 5 && 'Tournament complete!'}
                </p>
              </div>
              
              <Button
                variant="secondary"
                onClick={handleResetTournament}
              >
                Reset Tournament
              </Button>
            </Flex>
          </Card>
        )}

        {renderCurrentView()}
      </Container>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
