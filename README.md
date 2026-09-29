# Super Mario Game 🍄

A fun and interactive Mario-style platformer game built with HTML5 Canvas and vanilla JavaScript!

## Features

✨ **Game Features:**
- Classic platformer gameplay with jumping mechanics
- Multiple platforms to navigate
- Collectible coins for points
- Enemies to avoid or jump on
- Lives system (start with 3 lives)
- Score tracking
- Game over and restart functionality

## How to Play

### Controls
- **Move Left:** ← or A
- **Move Right:** → or D
- **Jump:** SPACE
- **Restart:** R

### Objectives
1. Navigate through platforms without falling
2. Collect all the golden coins for points
3. Avoid or jump on enemies
4. Complete the level and get the highest score!

## Game Rules

- You start with **3 lives**
- Falling off the bottom of the map costs 1 life
- Running into an enemy costs 1 life (unless you jump on it!)
- Jumping on an enemy defeats it and gives you 50 points
- Collecting a coin gives you 10 points
- Game ends when you run out of lives

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Naman951/mario-game.git
```

2. Open `index.html` in your web browser

```bash
cd mario-game
# Open index.html with your favorite browser
```

## File Structure

```
mario-game/
├── index.html    # Main HTML file
├── style.css     # Styling and layout
├── game.js       # Game logic and mechanics
└── README.md     # Documentation
```

## Game Objects

### Player (Red Square)
- Controlled with arrow keys or WASD
- Can jump with spacebar
- Affected by gravity

### Platforms (Brown Rectangles)
- Use platforms to navigate the level
- Fall off the bottom to lose a life

### Coins (Gold Circles)
- Collect for 10 points each
- Disappear when collected

### Enemies (Green Turtles)
- Patrol back and forth on platforms
- Defeat them by jumping on top
- Avoid running into them horizontally

## Tips & Tricks

💡 **Pro Tips:**
- Time your jumps carefully to land on platforms
- Jump on enemies from above to defeat them
- Collect all coins for a perfect score
- Use the screen wrap-around to your advantage
- Enemies drop coins when defeated - collect them!

## Future Enhancements

🚀 Possible features for future versions:
- More levels with increasing difficulty
- Power-ups (speed boost, invincibility, etc.)
- Boss battles
- Sound effects and background music
- Different character skins
- Mobile touch controls
- Leaderboard system

## Technologies Used

- **HTML5** - Markup structure
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Game logic and physics
- **Canvas API** - Graphics rendering

## License

This project is open source and available for educational purposes.

## Have Fun! 🎮

Enjoy playing Super Mario Game and try to get the highest score!