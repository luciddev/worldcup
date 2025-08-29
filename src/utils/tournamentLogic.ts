import { Team, Match, TournamentRound, TournamentState, Group, TeamStanding } from '../types';
import { getAllTeams } from '../data/teams';

export const createPlayInGroupsData = (): Group[] => {
  const allTeams = getAllTeams();
  const groups: Group[] = [];
  
  // Create 12 groups of 4 teams each
  for (let i = 0; i < 12; i++) {
    const groupTeams = allTeams.slice(i * 4, (i + 1) * 4);
    const standings: TeamStanding[] = groupTeams.map((team, index) => ({
      team,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      position: index + 1
    }));
    
    groups.push({
      id: `group-${String.fromCharCode(65 + i)}`, // A, B, C, etc.
      name: `Group ${String.fromCharCode(65 + i)}`,
      teams: groupTeams,
      standings,
      isComplete: false
    });
  }
  
  return groups;
};

export const createBracketRounds = (teams: Team[]): TournamentRound[] => {
  const rounds: TournamentRound[] = [];
  
  // Round of 32 (Top 2 from each group + 8 best 3rd place teams)
  const round32Matches: Match[] = [];
  for (let i = 0; i < 16; i++) {
    const team1 = teams[i * 2];
    const team2 = teams[i * 2 + 1];
    
    round32Matches.push({
      id: `r32-${i + 1}`,
      team1,
      team2,
      winner: null,
      round: 1,
      matchNumber: i + 1
    });
  }
  
  rounds.push({
    round: 1,
    name: "Round of 32",
    matches: round32Matches,
    isComplete: false
  });
  
  // Round of 16
  const round16Matches: Match[] = [];
  for (let i = 0; i < 8; i++) {
    round16Matches.push({
      id: `r16-${i + 1}`,
      team1: null,
      team2: null,
      winner: null,
      round: 2,
      matchNumber: i + 1
    });
  }
  
  rounds.push({
    round: 2,
    name: "Round of 16",
    matches: round16Matches,
    isComplete: false
  });
  
  // Quarter Finals
  const quarterMatches: Match[] = [];
  for (let i = 0; i < 4; i++) {
    quarterMatches.push({
      id: `qf-${i + 1}`,
      team1: null,
      team2: null,
      winner: null,
      round: 3,
      matchNumber: i + 1
    });
  }
  
  rounds.push({
    round: 3,
    name: "Quarter Finals",
    matches: quarterMatches,
    isComplete: false
  });
  
  // Semi Finals
  const semiMatches: Match[] = [];
  for (let i = 0; i < 2; i++) {
    semiMatches.push({
      id: `sf-${i + 1}`,
      team1: null,
      team2: null,
      winner: null,
      round: 4,
      matchNumber: i + 1
    });
  }
  
  rounds.push({
    round: 4,
    name: "Semi Finals",
    matches: semiMatches,
    isComplete: false
  });
  
  // Final
  const finalMatch: Match[] = [{
    id: 'final',
    team1: null,
    team2: null,
    winner: null,
    round: 5,
    matchNumber: 1
  }];
  
  rounds.push({
    round: 5,
    name: "Final",
    matches: finalMatch,
    isComplete: false
  });
  

  
  return rounds;
};

export const advanceWinners = (rounds: TournamentRound[], currentRound: number): TournamentRound[] => {
  const updatedRounds = [...rounds];
  
  if (currentRound >= updatedRounds.length) return updatedRounds;
  
  const currentRoundData = updatedRounds[currentRound - 1];
  const nextRoundData = updatedRounds[currentRound];
  
  if (!currentRoundData || !nextRoundData) return updatedRounds;
  
  // Mark current round as complete
  currentRoundData.isComplete = true;
  
  // Advance winners to next round
  const winners = currentRoundData.matches
    .map(match => match.winner)
    .filter(winner => winner !== null) as Team[];
  
  // Assign winners to next round matches
  for (let i = 0; i < nextRoundData.matches.length; i++) {
    const team1Index = i * 2;
    const team2Index = i * 2 + 1;
    
    if (winners[team1Index]) {
      nextRoundData.matches[i].team1 = winners[team1Index];
    }
    if (winners[team2Index]) {
      nextRoundData.matches[i].team2 = winners[team2Index];
    }
  }
  
  return updatedRounds;
};

export const canAdvanceRound = (rounds: TournamentRound[], currentRound: number): boolean => {
  if (currentRound > rounds.length) return false;
  
  const roundData = rounds[currentRound - 1];
  if (!roundData) return false;
  
  return roundData.matches.every(match => match.winner !== null);
};

export const getInitialTournamentState = (): TournamentState => {
  const playInGroups = createPlayInGroupsData();
  const placeholderTeams = new Array(32).fill(null);
  const rounds = createBracketRounds(placeholderTeams);
  
  return {
    currentRound: 0, // 0 = play-in, 1 = round of 32, etc.
    rounds,
    playInGroups,
    isPlayInComplete: false,
    selectedTeams: [],
    groupStage: [],
    isGroupStageComplete: false
  };
};

export const updatePlayInWinners = (
  state: TournamentState, 
  advancingTeams: Team[]
): TournamentState => {
  const updatedState = { ...state };
  
  // Mark play-in as complete
  updatedState.isPlayInComplete = true;
  
  // Update round of 32 with advancing teams
  if (updatedState.isPlayInComplete) {
    updatedState.rounds[0].matches = updatedState.rounds[0].matches.map((match, index) => ({
      ...match,
      team1: advancingTeams[index * 2] || null,
      team2: advancingTeams[index * 2 + 1] || null
    }));
  }
  
  return updatedState;
};

export const updateGroupStandings = (
  group: Group,
  teamId: number,
  position: number
): Group => {
  const updatedStandings = group.standings.map(standing => ({
    ...standing,
    position: standing.team.id === teamId ? position : standing.position
  }));
  
  return {
    ...group,
    standings: updatedStandings,
    isComplete: updatedStandings.every(standing => standing.position <= 2)
  };
};

// Test helper functions
export const autoPickPlayInTeams = (groups: Group[]): { [groupId: string]: { first: Team; second: Team } } => {
  const selections: { [groupId: string]: { first: Team; second: Team } } = {};
  
  groups.forEach(group => {
    const shuffledTeams = [...group.teams].sort(() => Math.random() - 0.5);
    selections[group.id] = {
      first: shuffledTeams[0],
      second: shuffledTeams[1]
    };
  });
  
  return selections;
};

export const autoAdvanceBracket = (rounds: TournamentRound[], currentRound: number): TournamentRound[] => {
  const updatedRounds = [...rounds];
  
  // Auto-pick winners for current round
  const currentRoundData = updatedRounds[currentRound - 1];
  if (currentRoundData) {
    currentRoundData.matches = currentRoundData.matches.map(match => {
      if (match.team1 && match.team2) {
        // Randomly pick winner
        const winner = Math.random() > 0.5 ? match.team1 : match.team2;
        return { ...match, winner };
      }
      return match;
    });
    currentRoundData.isComplete = true;
  }
  
  // Advance to next round
  if (currentRound < updatedRounds.length) {
    const nextRoundData = updatedRounds[currentRound];
    const winners = currentRoundData?.matches
      .map(match => match.winner)
      .filter(winner => winner !== null) as Team[];
    
    if (nextRoundData && winners.length > 0) {
      for (let i = 0; i < nextRoundData.matches.length; i++) {
        const team1Index = i * 2;
        const team2Index = i * 2 + 1;
        
        if (winners[team1Index]) {
          nextRoundData.matches[i].team1 = winners[team1Index];
        }
        if (winners[team2Index]) {
          nextRoundData.matches[i].team2 = winners[team2Index];
        }
      }
    }
  }
  
  return updatedRounds;
};
