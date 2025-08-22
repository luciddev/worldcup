import { Team } from '../types';

// World Cup 2026 Teams Data - 64 teams for play-in round
// Using country codes for flag emojis and realistic team data

export const teams: Team[] = [
  // Top Seeds (Automatic Qualifiers)
  { id: 1, name: "Brazil", code: "BRA", flag: "🇧🇷", seed: 1, region: "CONMEBOL", fifaRank: 1 },
  { id: 2, name: "Argentina", code: "ARG", flag: "🇦🇷", seed: 2, region: "CONMEBOL", fifaRank: 2 },
  { id: 3, name: "France", code: "FRA", flag: "🇫🇷", seed: 3, region: "UEFA", fifaRank: 3 },
  { id: 4, name: "England", code: "ENG", flag: "🇬🇧", seed: 4, region: "UEFA", fifaRank: 4 },
  { id: 5, name: "Belgium", code: "BEL", flag: "🇧🇪", seed: 5, region: "UEFA", fifaRank: 5 },
  { id: 6, name: "Netherlands", code: "NED", flag: "🇳🇱", seed: 6, region: "UEFA", fifaRank: 6 },
  { id: 7, name: "Portugal", code: "POR", flag: "🇵🇹", seed: 7, region: "UEFA", fifaRank: 7 },
  { id: 8, name: "Spain", code: "ESP", flag: "🇪🇸", seed: 8, region: "UEFA", fifaRank: 8 },
  { id: 9, name: "Italy", code: "ITA", flag: "🇮🇹", seed: 9, region: "UEFA", fifaRank: 9 },
  { id: 10, name: "Croatia", code: "CRO", flag: "🇭🇷", seed: 10, region: "UEFA", fifaRank: 10 },
  { id: 11, name: "Uruguay", code: "URU", flag: "🇺🇾", seed: 11, region: "CONMEBOL", fifaRank: 11 },
  { id: 12, name: "Morocco", code: "MAR", flag: "🇲🇦", seed: 12, region: "CAF", fifaRank: 12 },
  { id: 13, name: "Switzerland", code: "SUI", flag: "🇨🇭", seed: 13, region: "UEFA", fifaRank: 13 },
  { id: 14, name: "USA", code: "USA", flag: "🇺🇸", seed: 14, region: "CONCACAF", fifaRank: 14 },
  { id: 15, name: "Germany", code: "GER", flag: "🇩🇪", seed: 15, region: "UEFA", fifaRank: 15 },
  { id: 16, name: "Mexico", code: "MEX", flag: "🇲🇽", seed: 16, region: "CONCACAF", fifaRank: 16 },
  { id: 17, name: "Senegal", code: "SEN", flag: "🇸🇳", seed: 17, region: "CAF", fifaRank: 17 },
  { id: 18, name: "Denmark", code: "DEN", flag: "🇩🇰", seed: 18, region: "UEFA", fifaRank: 18 },
  { id: 19, name: "Japan", code: "JPN", flag: "🇯🇵", seed: 19, region: "AFC", fifaRank: 19 },
  { id: 20, name: "Poland", code: "POL", flag: "🇵🇱", seed: 20, region: "UEFA", fifaRank: 20 },
  { id: 21, name: "Colombia", code: "COL", flag: "🇨🇴", seed: 21, region: "CONMEBOL", fifaRank: 21 },
  { id: 22, name: "Wales", code: "WAL", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", seed: 22, region: "UEFA", fifaRank: 22 },
  { id: 23, name: "Ukraine", code: "UKR", flag: "🇺🇦", seed: 23, region: "UEFA", fifaRank: 23 },
  { id: 24, name: "Ecuador", code: "ECU", flag: "🇪🇨", seed: 24, region: "CONMEBOL", fifaRank: 24 },
  { id: 25, name: "Qatar", code: "QAT", flag: "🇶🇦", seed: 25, region: "AFC", fifaRank: 25 },
  { id: 26, name: "Canada", code: "CAN", flag: "🇨🇦", seed: 26, region: "CONCACAF", fifaRank: 26 },
  { id: 27, name: "Ghana", code: "GHA", flag: "🇬🇭", seed: 27, region: "CAF", fifaRank: 27 },
  { id: 28, name: "Serbia", code: "SRB", flag: "🇷🇸", seed: 28, region: "UEFA", fifaRank: 28 },
  { id: 29, name: "Cameroon", code: "CMR", flag: "🇨🇲", seed: 29, region: "CAF", fifaRank: 29 },
  { id: 30, name: "Australia", code: "AUS", flag: "🇦🇺", seed: 30, region: "AFC", fifaRank: 30 },
  { id: 31, name: "Costa Rica", code: "CRC", flag: "🇨🇷", seed: 31, region: "CONCACAF", fifaRank: 31 },
  { id: 32, name: "Tunisia", code: "TUN", flag: "🇹🇳", seed: 32, region: "CAF", fifaRank: 32 },
  { id: 33, name: "Peru", code: "PER", flag: "🇵🇪", seed: 33, region: "CONMEBOL", fifaRank: 33 },
  { id: 34, name: "Chile", code: "CHI", flag: "🇨🇱", seed: 34, region: "CONMEBOL", fifaRank: 34 },
  { id: 35, name: "Paraguay", code: "PAR", flag: "🇵🇾", seed: 35, region: "CONMEBOL", fifaRank: 35 },
  { id: 36, name: "Venezuela", code: "VEN", flag: "🇻🇪", seed: 36, region: "CONMEBOL", fifaRank: 36 },
  { id: 37, name: "Panama", code: "PAN", flag: "🇵🇦", seed: 37, region: "CONCACAF", fifaRank: 37 },
  { id: 38, name: "Jamaica", code: "JAM", flag: "🇯🇲", seed: 38, region: "CONCACAF", fifaRank: 38 },
  { id: 39, name: "Honduras", code: "HON", flag: "🇭🇳", seed: 39, region: "CONCACAF", fifaRank: 39 },
  { id: 40, name: "El Salvador", code: "SLV", flag: "🇸🇻", seed: 40, region: "CONCACAF", fifaRank: 40 },
  { id: 41, name: "Egypt", code: "EGY", flag: "🇪🇬", seed: 41, region: "CAF", fifaRank: 41 },
  { id: 42, name: "Nigeria", code: "NGA", flag: "🇳🇬", seed: 42, region: "CAF", fifaRank: 42 },
  { id: 43, name: "Algeria", code: "ALG", flag: "🇩🇿", seed: 43, region: "CAF", fifaRank: 43 },
  { id: 44, name: "Ivory Coast", code: "CIV", flag: "🇨🇮", seed: 44, region: "CAF", fifaRank: 44 },
  { id: 45, name: "South Korea", code: "KOR", flag: "🇰🇷", seed: 45, region: "AFC", fifaRank: 45 },
  { id: 46, name: "Iran", code: "IRN", flag: "🇮🇷", seed: 46, region: "AFC", fifaRank: 46 },
  { id: 47, name: "Saudi Arabia", code: "KSA", flag: "🇸🇦", seed: 47, region: "AFC", fifaRank: 47 },
  { id: 48, name: "UAE", code: "UAE", flag: "🇦🇪", seed: 48, region: "AFC", fifaRank: 48 },
  { id: 49, name: "Bolivia", code: "BOL", flag: "🇧🇴", seed: 49, region: "CONMEBOL", fifaRank: 49 },
  { id: 50, name: "Guatemala", code: "GTM", flag: "🇬🇹", seed: 50, region: "CONCACAF", fifaRank: 50 },
  { id: 51, name: "Haiti", code: "HTI", flag: "🇭🇹", seed: 51, region: "CONCACAF", fifaRank: 51 },
  { id: 52, name: "Trinidad & Tobago", code: "TTO", flag: "🇹🇹", seed: 52, region: "CONCACAF", fifaRank: 52 },
  { id: 53, name: "Mali", code: "MLI", flag: "🇲🇱", seed: 53, region: "CAF", fifaRank: 53 },
  { id: 54, name: "Burkina Faso", code: "BFA", flag: "🇧🇫", seed: 54, region: "CAF", fifaRank: 54 },
  { id: 55, name: "DR Congo", code: "COD", flag: "🇨🇩", seed: 55, region: "CAF", fifaRank: 55 },
  { id: 56, name: "Zambia", code: "ZMB", flag: "🇿🇲", seed: 56, region: "CAF", fifaRank: 56 },
  { id: 57, name: "China", code: "CHN", flag: "🇨🇳", seed: 57, region: "AFC", fifaRank: 57 },
  { id: 58, name: "Iraq", code: "IRQ", flag: "🇮🇶", seed: 58, region: "AFC", fifaRank: 58 },
  { id: 59, name: "Oman", code: "OMN", flag: "🇴🇲", seed: 59, region: "AFC", fifaRank: 59 },
  { id: 60, name: "Jordan", code: "JOR", flag: "🇯🇴", seed: 60, region: "AFC", fifaRank: 60 },
  { id: 61, name: "Uzbekistan", code: "UZB", flag: "🇺🇿", seed: 61, region: "AFC", fifaRank: 61 },
  { id: 62, name: "Vietnam", code: "VNM", flag: "🇻🇳", seed: 62, region: "AFC", fifaRank: 62 },
  { id: 63, name: "Thailand", code: "THA", flag: "🇹🇭", seed: 63, region: "AFC", fifaRank: 63 },
  { id: 64, name: "Malaysia", code: "MYS", flag: "🇲🇾", seed: 64, region: "AFC", fifaRank: 64 }
];

export const getTeamById = (id: number): Team | undefined => {
  return teams.find(team => team.id === id);
};

export const getTeamsByRegion = (region: string): Team[] => {
  return teams.filter(team => team.region === region);
};

export const getAllTeams = (): Team[] => {
  return teams;
};

export const createPlayInGroups = (): Team[][] => {
  // Create 16 groups of 4 teams each
  const groups: Team[][] = [];
  for (let i = 0; i < 16; i++) {
    const groupTeams = teams.slice(i * 4, (i + 1) * 4);
    groups.push(groupTeams);
  }
  return groups;
};
