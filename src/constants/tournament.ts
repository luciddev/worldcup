/**
 * Tournament configuration constants
 * Extracted to avoid magic numbers throughout the codebase
 */

export const TOURNAMENT_CONFIG = {
  // Team counts
  TOTAL_TEAMS: 64,
  PLAY_IN_TEAMS: 64,
  ADVANCING_TEAMS: 32,
  GROUPS_COUNT: 12,
  TEAMS_PER_GROUP: 4,
  TEAMS_ADVANCING_PER_GROUP: 2,
  THIRD_PLACE_TEAMS: 8, // Best 3rd place teams from 12 groups

  // Round counts
  TOTAL_ROUNDS: 5,
  ROUND_OF_32_INDEX: 0,
  ROUND_OF_16_INDEX: 1,
  QUARTERFINALS_INDEX: 2,
  SEMIFINALS_INDEX: 3,
  FINAL_INDEX: 4,

  // Match counts per round
  MATCHES_PER_ROUND: {
    1: 16, // Round of 32
    2: 8,  // Round of 16
    3: 4,  // Quarter Finals
    4: 2,  // Semi Finals
    5: 1,  // Final
  },
} as const;

export const ROUND_NAMES = {
  0: 'Play-in Tournament',
  1: 'Round of 32',
  2: 'Round of 16',
  3: 'Quarterfinals',
  4: 'Semifinals',
  5: 'Final',
} as const;

export const ROUND_DATES = {
  1: 'Jul 15 - 18',
  2: 'Jul 22 - 25',
  3: 'Jul 29 - Aug 1',
  4: 'Aug 5 - 8',
  5: 'Aug 12',
} as const;

/**
 * Grid layout constants for BracketGrid component
 */
export const GRID_LAYOUT = {
  // Grid configuration
  MIN_ROW_HEIGHT: 60,
  MIN_ROW_HEIGHT_CONDENSED: 40,
  MIN_ROW_HEIGHT_MOBILE: 30,
  GRID_ROWS: 32,
  GRID_COLUMNS: 5,

  // Gap sizing
  GAP_NORMAL: '2rem',
  GAP_CONDENSED: '0.5rem',
  GAP_MOBILE: '1rem',
  GAP_MOBILE_CONDENSED: '0.25rem',

  COLUMN_GAP_NORMAL: '2rem',
  COLUMN_GAP_FOCUSED: '3rem',

  // Column width percentages when focused
  FOCUSED_COLUMN_PREVIOUS: '6%',
  FOCUSED_COLUMN_MAIN: '55%',
  FOCUSED_COLUMN_NEXT: '13%',
  FOCUSED_COLUMN_FINAL: '100%',
  FOCUSED_COLUMN_HIDDEN: '0%',

  // Minimum sizes
  MIN_GRID_WIDTH: 2000,
  MIN_GRID_HEIGHT: 2000,
  MIN_MOBILE_WIDTH: '100vw',
} as const;

/**
 * Animation and timing constants
 */
export const ANIMATION = {
  TRANSITION_DURATION: '0.3s',
  TRANSITION_DURATION_SLOW: '0.5s',
  AUTO_ADVANCE_DELAY: 1000, // milliseconds
  EASE_FUNCTION: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const;
