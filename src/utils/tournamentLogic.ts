import { Team, Match, TournamentRound, TournamentState, Group, TeamStanding } from '../types';
import { getAllTeams } from '../data/teams';
import { TOURNAMENT_CONFIG } from '../constants/tournament';

/**
 * Creates initial play-in groups with teams and standings
 */
export const createPlayInGroupsData = (): Group[] => {
  const allTeams = getAllTeams();
  const groups: Group[] = [];

  for (let i = 0; i < TOURNAMENT_CONFIG.GROUPS_COUNT; i++) {
    const groupTeams = allTeams.slice(
      i * TOURNAMENT_CONFIG.TEAMS_PER_GROUP,
      (i + 1) * TOURNAMENT_CONFIG.TEAMS_PER_GROUP
    );

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

/**
 * Helper function to create matches for a specific round
 */
const createRoundMatches = (
  roundNumber: number,
  matchCount: number,
  teams: (Team | null)[],
  idPrefix: string
): Match[] => {
  const matches: Match[] = [];

  for (let i = 0; i < matchCount; i++) {
    const team1 = teams[i * 2] || null;
    const team2 = teams[i * 2 + 1] || null;

    matches.push({
      id: `${idPrefix}-${i + 1}`,
      team1,
      team2,
      winner: null,
      round: roundNumber,
      matchNumber: i + 1
    });
  }

  return matches;
};

/**
 * Creates the bracket rounds structure for the main tournament
 */
export const createBracketRounds = (teams: Team[]): TournamentRound[] => {
  const rounds: TournamentRound[] = [];

  // Round of 32 (Top 2 from each group)
  rounds.push({
    round: 1,
    name: "Round of 32",
    matches: createRoundMatches(1, 16, teams, 'r32'),
    isComplete: false
  });

  // Round of 16
  rounds.push({
    round: 2,
    name: "Round of 16",
    matches: createRoundMatches(2, 8, [], 'r16'),
    isComplete: false
  });

  // Quarter Finals
  rounds.push({
    round: 3,
    name: "Quarter Finals",
    matches: createRoundMatches(3, 4, [], 'qf'),
    isComplete: false
  });

  // Semi Finals
  rounds.push({
    round: 4,
    name: "Semi Finals",
    matches: createRoundMatches(4, 2, [], 'sf'),
    isComplete: false
  });

  // Final
  rounds.push({
    round: 5,
    name: "Final",
    matches: createRoundMatches(5, 1, [], 'final'),
    isComplete: false
  });

  return rounds;
};

/**
 * Advances winning teams to the next round
 */
export const advanceWinners = (rounds: TournamentRound[], currentRound: number): TournamentRound[] => {
  const updatedRounds = [...rounds];

  if (currentRound >= updatedRounds.length) {
    return updatedRounds;
  }

  const currentRoundData = updatedRounds[currentRound - 1];
  const nextRoundData = updatedRounds[currentRound];

  if (!currentRoundData || !nextRoundData) {
    return updatedRounds;
  }

  // Mark current round as complete
  currentRoundData.isComplete = true;

  // Advance winners to next round
  const winners = currentRoundData.matches
    .map(match => match.winner)
    .filter((winner): winner is Team => winner !== null);

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

/**
 * Checks if the current round is complete and can advance to next round
 */
export const canAdvanceRound = (rounds: TournamentRound[], currentRound: number): boolean => {
  if (currentRound > rounds.length) {
    return false;
  }

  const roundData = rounds[currentRound - 1];
  if (!roundData) {
    return false;
  }

  return roundData.matches.every(match => match.winner !== null);
};

/**
 * Creates the initial tournament state with empty brackets
 */
export const getInitialTournamentState = (): TournamentState => {
  const playInGroups = createPlayInGroupsData();
  const placeholderTeams = new Array(TOURNAMENT_CONFIG.ADVANCING_TEAMS).fill(null);
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

/**
 * Updates the tournament state with play-in winners
 */
export const updatePlayInWinners = (
  state: TournamentState,
  advancingTeams: Team[]
): TournamentState => {
  const updatedState = { ...state };

  // Mark play-in as complete
  updatedState.isPlayInComplete = true;

  // Update round of 32 with advancing teams
  updatedState.rounds[TOURNAMENT_CONFIG.ROUND_OF_32_INDEX].matches =
    updatedState.rounds[TOURNAMENT_CONFIG.ROUND_OF_32_INDEX].matches.map((match, index) => ({
      ...match,
      team1: advancingTeams[index * 2] || null,
      team2: advancingTeams[index * 2 + 1] || null
    }));

  return updatedState;
};

/**
 * Updates group standings for a specific team
 */
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
    isComplete: updatedStandings.every(
      standing => standing.position <= TOURNAMENT_CONFIG.TEAMS_ADVANCING_PER_GROUP
    )
  };
};

/**
 * Test helper function to auto-pick teams from play-in groups
 */
export const autoPickPlayInTeams = (
  groups: Group[]
): { [groupId: string]: { first: Team; second: Team } } => {
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

/**
 * Test helper function to auto-advance bracket by randomly picking winners
 */
export const autoAdvanceBracket = (
  rounds: TournamentRound[],
  currentRound: number
): TournamentRound[] => {
  const updatedRounds = [...rounds];

  // Auto-pick winners for current round
  const currentRoundData = updatedRounds[currentRound - 1];
  if (!currentRoundData) {
    return updatedRounds;
  }

  currentRoundData.matches = currentRoundData.matches.map(match => {
    if (match.team1 && match.team2) {
      // Randomly pick winner
      const winner = Math.random() > 0.5 ? match.team1 : match.team2;
      return { ...match, winner };
    }
    return match;
  });
  currentRoundData.isComplete = true;

  // Advance to next round
  if (currentRound >= updatedRounds.length) {
    return updatedRounds;
  }

  const nextRoundData = updatedRounds[currentRound];
  const winners = currentRoundData.matches
    .map(match => match.winner)
    .filter((winner): winner is Team => winner !== null);

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

  return updatedRounds;
};
