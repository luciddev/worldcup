import {
  createPlayInGroupsData,
  createBracketRounds,
  advanceWinners,
  canAdvanceRound,
  getInitialTournamentState,
  autoPickPlayInTeams
} from './tournamentLogic';
import { getAllTeams } from '../data/teams';

describe('Tournament Logic', () => {
  describe('createPlayInGroupsData', () => {
    test('creates 12 groups', () => {
      const groups = createPlayInGroupsData();
      expect(groups).toHaveLength(12);
    });

    test('each group has 4 teams', () => {
      const groups = createPlayInGroupsData();
      groups.forEach(group => {
        expect(group.teams).toHaveLength(4);
      });
    });

    test('groups have correct naming (A-L)', () => {
      const groups = createPlayInGroupsData();
      const expectedNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
      groups.forEach((group, index) => {
        expect(group.name).toBe(`Group ${expectedNames[index]}`);
      });
    });
  });

  describe('createBracketRounds', () => {
    test('creates 5 rounds', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);
      expect(rounds).toHaveLength(5);
    });

    test('round of 32 has 16 matches', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);
      expect(rounds[0].matches).toHaveLength(16);
    });

    test('final round has 1 match', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);
      expect(rounds[4].matches).toHaveLength(1);
    });

    test('rounds have correct names', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);
      expect(rounds[0].name).toBe('Round of 32');
      expect(rounds[1].name).toBe('Round of 16');
      expect(rounds[2].name).toBe('Quarter Finals');
      expect(rounds[3].name).toBe('Semi Finals');
      expect(rounds[4].name).toBe('Final');
    });
  });

  describe('canAdvanceRound', () => {
    test('returns false if not all matches have winners', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);
      expect(canAdvanceRound(rounds, 1)).toBe(false);
    });

    test('returns true if all matches have winners', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);

      // Set winners for all round 1 matches
      rounds[0].matches.forEach((match, index) => {
        if (match.team1) {
          match.winner = match.team1;
        }
      });

      expect(canAdvanceRound(rounds, 1)).toBe(true);
    });
  });

  describe('advanceWinners', () => {
    test('advances winners to next round', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);

      // Set winners for all round 1 matches
      rounds[0].matches.forEach((match) => {
        if (match.team1) {
          match.winner = match.team1;
        }
      });

      const updatedRounds = advanceWinners(rounds, 1);

      // Check that round 2 now has teams
      const hasTeams = updatedRounds[1].matches.some(match => match.team1 !== null || match.team2 !== null);
      expect(hasTeams).toBe(true);
    });

    test('marks current round as complete', () => {
      const teams = getAllTeams().slice(0, 32);
      const rounds = createBracketRounds(teams);

      rounds[0].matches.forEach((match) => {
        if (match.team1) {
          match.winner = match.team1;
        }
      });

      const updatedRounds = advanceWinners(rounds, 1);
      expect(updatedRounds[0].isComplete).toBe(true);
    });
  });

  describe('getInitialTournamentState', () => {
    test('returns valid tournament state', () => {
      const state = getInitialTournamentState();
      expect(state).toHaveProperty('currentRound');
      expect(state).toHaveProperty('rounds');
      expect(state).toHaveProperty('playInGroups');
      expect(state).toHaveProperty('isPlayInComplete');
      expect(state.currentRound).toBe(0);
      expect(state.isPlayInComplete).toBe(false);
    });

    test('has 12 play-in groups', () => {
      const state = getInitialTournamentState();
      expect(state.playInGroups).toHaveLength(12);
    });

    test('has 5 tournament rounds', () => {
      const state = getInitialTournamentState();
      expect(state.rounds).toHaveLength(5);
    });
  });

  describe('autoPickPlayInTeams', () => {
    test('selects 2 teams from each group', () => {
      const groups = createPlayInGroupsData();
      const selections = autoPickPlayInTeams(groups);

      expect(Object.keys(selections)).toHaveLength(12);
      Object.values(selections).forEach(selection => {
        expect(selection.first).toBeDefined();
        expect(selection.second).toBeDefined();
        expect(selection.first.id).not.toBe(selection.second.id);
      });
    });
  });
});
