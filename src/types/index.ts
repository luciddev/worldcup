export interface Team {
  id: number;
  name: string;
  code: string;
  flag: string;
  seed: number;
  region: string;
  fifaRank: number;
}

export interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
  round: number;
  matchNumber: number;
  isPlayIn?: boolean;
  team1Score?: number | null;
  team2Score?: number | null;
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
  standings: TeamStanding[];
  isComplete: boolean;
}

export interface TeamStanding {
  team: Team;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  position: number;
}

export interface TournamentRound {
  round: number;
  name: string;
  matches: Match[];
  isComplete: boolean;
}

export interface TournamentState {
  currentRound: number;
  rounds: TournamentRound[];
  playInGroups: Group[];
  isPlayInComplete: boolean;
  selectedTeams: Team[];
  groupStage: Group[];
  isGroupStageComplete: boolean;
}

export type Region = 'CONMEBOL' | 'UEFA' | 'CONCACAF' | 'CAF' | 'AFC';

export interface BracketMatch {
  id: string;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
  round: number;
  position: number;
  nextMatchId?: string;
}
