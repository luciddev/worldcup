# World Cup 2026 Tournament Bracket Challenge

A modern, ESPN-quality React TypeScript application for managing and participating in the World Cup 2026 tournament bracket challenge. This app features a play-in tournament followed by a single elimination bracket, similar to March Madness.

## 🏆 Features

### Play-in Tournament
- 16 teams compete in 8 matches
- Select winners to advance 8 teams to the main tournament
- Real-time progress tracking
- Modern, responsive UI with team flags

### Main Tournament Bracket
- 32-team single elimination bracket
- 5 rounds: Round of 32 → Round of 16 → Quarter Finals → Semi Finals → Final
- Interactive team selection with visual feedback
- Round-by-round progression with validation

### Modern UI/UX
- ESPN-inspired design with gradients and animations
- Responsive layout for all devices
- Smooth transitions and hover effects
- Team flags and detailed information
- Progress indicators and status badges

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WorldCup
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎮 How to Play

### Play-in Tournament
1. You'll see 8 matches with 16 teams
2. Click on a team to select them as the winner of their match
3. Complete all 8 matches to advance to the main tournament
4. The 8 winners will join the top 16 seeded teams in the main bracket

### Main Tournament
1. The bracket shows all 5 rounds of the tournament
2. Select winners for each match in the current round
3. Click "Advance to Next Round" when all matches in the current round are complete
4. Continue until you have a champion!

### Testing Features
- **Reset Tournament**: Start over at any time
- **Round Navigation**: Complete rounds one at a time
- **Visual Feedback**: See which teams are selected and advancing

## 🏗️ Technical Details

### Tech Stack
- **React 18** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **Modern CSS** with gradients and glassmorphism effects

### Project Structure
```
src/
├── components/          # React components
│   ├── styled/         # Styled components
│   ├── Team.tsx        # Team display component
│   ├── Match.tsx       # Match display component
│   ├── PlayInRound.tsx # Play-in tournament
│   └── Bracket.tsx     # Main tournament bracket
├── data/
│   └── teams.ts        # Team data and utilities
├── types/
│   └── index.ts        # TypeScript type definitions
├── utils/
│   └── tournamentLogic.ts # Tournament logic and state management
└── App.tsx             # Main application component
```

### Key Features
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks for tournament state
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and state updates

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#1e3a8a → #3b82f6)
- **Success**: Green gradient (#059669 → #10b981)
- **Background**: Dark gradient (#0f1419 → #1a2332)
- **Cards**: Glassmorphism with backdrop blur

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Scales appropriately on all devices

### Components
- **Cards**: Glassmorphism effect with hover animations
- **Buttons**: Gradient backgrounds with hover effects
- **Badges**: Colored indicators for status and information
- **Progress Bars**: Animated progress indicators

## 🏁 Tournament Structure

### Teams
- **48 Total Teams**: 16 automatic qualifiers + 32 play-in teams
- **Regions**: CONMEBOL, UEFA, CONCACAF, CAF, AFC
- **Seeding**: Based on FIFA rankings
- **Flags**: Unicode flag emojis for all teams

### Rounds
1. **Play-in Tournament**: 8 matches, 8 winners advance
2. **Round of 32**: 16 matches, 16 winners advance
3. **Round of 16**: 8 matches, 8 winners advance
4. **Quarter Finals**: 4 matches, 4 winners advance
5. **Semi Finals**: 2 matches, 2 winners advance
6. **Final**: 1 match, 1 champion crowned

## 🛠️ Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Adding Teams
Edit `src/data/teams.ts` to add or modify teams:
```typescript
{
  id: number,
  name: string,
  code: string,
  flag: string, // Unicode flag emoji
  seed: number,
  region: string,
  fifaRank: number
}
```

### Customization
- Modify colors in `src/components/styled/Common.tsx`
- Update tournament logic in `src/utils/tournamentLogic.ts`
- Add new components in `src/components/`

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy the World Cup 2026 Tournament Bracket Challenge!** ⚽🏆
