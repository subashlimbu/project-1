# project-1 "Javascript Game"

# Timeframe: 7 days

## Technologies used

- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts

# My Game _Space Invaders_

## Overview

Space Invaders is a classic arcade game from the 80s. The player can only move right and left and aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret. The aliens also periodically drop bombs towards the player.

The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

This is my first ever front-end development project, produced as part of General Assembly's Immersive Software Engineering Bootcamp.

My task was to create a grid-based game rendered in the browser that utilised 'vanilla' JavaScript, HTML and CSS.

The project was mainly to consolidate my beginners' knowledge of JavaScript and interacting with the DOM, but I worked hard to make it a fun experience to play.

You can play the game [here](https://subashlimbu.github.io/project-1/)

## The Brief

- **Render a game in the browser**
- **Design logic for winning & visually display which player won**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)

## The Approach

### The Grid

The game is built using a grid. A 21 x 21 square is created using JavaScript. HTML divs are created using a for loop and appended as children of the grid.

```js
const width = 21;
const gridSize = width ** 2;
const grid = document.querySelector(".grid");
let cell = [];
let cells = [];

if (newGame === true) {
  for (let i = 0; i < gridSize; i++) {
    cell = document.createElement("div");
    grid.appendChild(cell);
    cells.push(cell);
  }
}
```

During actual gameplay, the grid isn't visible, but is highlighed below for demonstration purposes:

### Opponent Movement

Enemy ships are defined as an array of numbers which corresponds to their position on the grid:

```js
let aliens = [];
aliens = [
  22,
  24,
  26,
  28,
  30,
  32,
  34,
  36,
  38,
  40,
  43,
  45,
  47,
  49,
  51,
  53,
  55,
  57,
  59,
  61,
  64,
  66,
  68,
  70,
  72,
  74,
  76,
  78,
  80,
  82,
  85,
  87,
  89,
  91,
  93,
  95,
  97,
  99,
  101,
  103,
];
```

They are then added to the grid using a forEach statement

```js
aliens.forEach((element) => {
  cells[element].classList.add("aliens");
});
```

Enemy ship movement is initially defined as a global variable of `1`. Using a `setInterval` function, the ships will move one space to the right unless other criteria are met. If the right-most alien in the array moves into the defined right wall, then the ships' move variable is re-assigned and will each move one space down and then continue to move left until the left-most alien encounters the defined left wall and the movement is re-assigned and mirrored.

left wall is true if the position of first alien in array is divisible by width. e.g if first alien in array is 42 then / 21 = true

right wall is true if last alien in array is divisible by width and leaves a remainder of width -1 (because width array starts at 0)

move the aliens down if leftWall is true and the previous move was left or if rightWall is true and previous move was right

if the previous move was down, then move right if leftWall is true or left otherwise

```js
alienMovement = setInterval(() => {
  if (gameIsEnding === true || gameOver === true) {
    clearInterval(alienMovement);
    return;
  }
  for (let alien = aliens.length - 1; alien >= 0; --alien) {
    cells[aliens[alien]].classList.remove("aliens");
    aliens[alien] += alienMove;
    cells[aliens[alien]].classList.add("aliens");
  }

  const leftWall = aliens[0] % width === 0;

  const rightWall = aliens[aliens.length - 1] % width === width - 1;

  if ((leftWall && alienMove === -1) || (rightWall && alienMove === 1)) {
    alienMove = width;
  } else if (alienMove === width) {
    if (leftWall) alienMove = 1;
    else alienMove = -1;
  }
  if (aliens.some((alien) => alien >= 420)) {
    aliens = 420;
    cells[player].classList.remove("player");
    cells[player].classList.add("explosion");
    defeat();
    return;
  }
  if (aliens.length === 0) {
    bossBattle();
    clearInterval(alienMovement);
  }
}, 1000);
```

### Opponent Lasers

Enemy lasers are fired every 300 milliseconds using a setInterval. The firing position is randomly determined using `Math.random` based on the position of the 10 aliens that are furthest forward. The `.slice(-10)` method used here means that as the number of aliens in the array decreases, the number of aliens firing reduces - rather than having enemy lasers originating from empty space.

Below, a `setInterval` is declared. It contains a variable that finds the front 10 of our array of alien ships.

```js
enemyLaserInterval = setInterval(() => {
      if (gameIsEnding === true || gameOver === true || finalBattle === true) {
        return;
      }
      const enemyLaserFront = aliens.slice(-10);
      let enemyLaser =
        enemyLaserFront[Math.floor(Math.random() * enemyLaserFront.length)] +
        width;
      cells[enemyLaser].classList.add("enemylaser");
      enemyLaserSound.play();
      const enemyLaserTimer = setInterval(() => {
        if (aliens.some((alien) => alien >= 400)) {
          cells[enemyLaser].classList.remove("enemylaser");
          clearInterval(enemyLaserTimer);
          return;
        } else if (gameOver === true) {
          clearInterval(enemyLaserTimer);
        }
        cells[enemyLaser].classList.remove("enemylaser");
        enemyLaser += width;
        cells[enemyLaser].classList.add("enemylaser");
        if (cells[enemyLaser].classList.contains("player") === true) {
          clearInterval(enemyLaserTimer);
          cells[enemyLaser].classList.remove("enemylaser", "player");
          cells[player].classList.add("explosion");
          setTimeout(() => {
            cells[player].classList.remove("explosion");
          }, 1500);
          defeat();
          clearInterval(enemyLaserTimer);
          return;
        } else if (enemyLaser >= 420) {
          clearInterval(enemyLaserTimer);
          setTimeout(() => {
            cells[enemyLaser].classList.remove("enemylaser");
          }, 80);
        }
      }, 150);
    }, 300);
  };

```

The `enemyLaserFront` CSS class is added to the cell in front of the random ship, a sound plays and another setInterval is declared that adds and removes the CSS class until there is collision with the player or the enemy laser reaches the end of the grid.

```js
      cells[enemyLaser].classList.add('enemylaser')
      enemyLaserSound.play()
      const enemyLaserTimer = setInterval(() => {
        if (aliens.some(alien => alien >= 400)) {
          cells[enemyLaser].classList.remove('enemylaser')
          clearInterval(enemyLaserTimer)
          return
        } else if (gameOver === true) {
          clearInterval(enemyLaserTimer)
        }
        cells[enemyLaser].classList.remove('enemylaser')
        enemyLaser += width
        cells[enemyLaser].classList.add('enemylaser')
        if (cells[enemyLaser].classList.contains('player') === true) {
          clearInterval(enemyLaserTimer)
          cells[enemyLaser].classList.remove('enemylaser', 'player')
          cells[player].classList.add('explosion')
          setTimeout(() => {
            cells[player].classList.remove('explosion')
          }, 1500)
          defeat()
          clearInterval(enemyLaserTimer)
          return
        } else if (enemyLaser >= 420) {
          clearInterval(enemyLaserTimer)
          setTimeout(() => {
            cells[enemyLaser].classList.remove('enemylaser')
          }, 80)
        }
      }, 150)
    }, 300)
  }

```

### The Player

The player is a variable defined with a number, which defines its position on the grid:

```js
let player = 409;
```

Moving the player comes from an event listener that checks for a `keyup` event on the user's keyboard. I then defined a switch case statement that established whether the player's ship would move left, right or fire lasers.

When case 32 is called (keyup on the space bar), the player's laser fires. A variable is assigned to the position that is one space in front of the player on the grid alongside an associated CSS class. This includes a sound playing and the `'playerlaser'` CSS class being moved up the length of the grid, concurrent with the position of the `playerLaser` variable. This also includes logic for removing the laser and an enemy ship whilst increasing the score if there is a collision detected, as well as removing the player's laser if it reaches the end of the grid.

```js
document.addEventListener("keyup", (e) => {
  if (gameIsEnding || newGame === false) {
    return;
  }
  switch (e.keyCode) {
    case 37: {
      if (player === 420 || player === 399) {
        return;
      }
      cells[player].classList.remove("player");
      player = player - 1;
      cells[player].classList.add("player");
      break;
    }
    case 39: {
      if (player === gridSize - 1 || player === 419) {
        return;
      }
      cells[player].classList.remove("player");
      player = player + 1;
      cells[player].classList.add("player");
      break;
    }
    case 32: {
      playerLaserSound.pause();
      playerLaserSound.currentTime = 0;
      playerLaserSound.play();
      let playerLaser = [player - width];
      cells[playerLaser].classList.add("playerlaser");
      const playerLaserTimer = setInterval(() => {
        cells[playerLaser].classList.remove("playerlaser");
        playerLaser -= width;
        if (gameOver) {
          clearInterval(playerLaserTimer);
        }
        if (playerLaser <= 0) {
          clearInterval(playerLaserTimer);
        } else if (cells[playerLaser].classList.contains("aliens") === true) {
          clearInterval(playerLaserTimer);
          const alienDeath = aliens.indexOf(playerLaser);
          aliens.splice(alienDeath, 1);
          cells[playerLaser].classList.remove("playerlaser", "aliens");
          cells[playerLaser].classList.add("explosion");
          explosionSound.pause();
          explosionSound.currentTime = 0;
          explosionSound.play();
          setTimeout(() => {
            cells[playerLaser].classList.remove("explosion");
          }, 200);
          addScore();
        } else if (playerLaser > -1) {
          cells[playerLaser].classList.add("playerlaser");
        }
      }, 100);
    }
  }
});
```

### Screenshots

<img src=images/screenshots/Screenshot1.png width=500>
<img src=images/screenshots/Screenshot2.png width=500>
<img src=images/screenshots/Screenshot3.png width=500>

# **Process**

The main idea of this project was to create a game using basic grid layout so the spaceship is able to move left and right. This was created by a list of (21 x 21) 'div's in the HTML. Each divs within the grid is an individual element. These divs are nestled within a container. The spaceship, aliens, laser and explosions were created by applying classes to the elements within the grid. When these elements are moved, their class is also removed from the div of their current position and applied to the new div which becomes their new current position.

I created the aliens in an array and displayed them on the grid by adding class aliens to the divs. Their movement patterns are created by moving the index of the aliens array with a for each loop and then passing the aliens indexes on the the div index to display.

To move the player's lasers and alien's bombs I created a function with a set interval to move the index of player's laser upwards and alien bomb class downwards every few milliseconds. Within this function, I incorporated collision detection condition, so that when the players laser hits the alien it initiates the explosive sprite sheet class and removes the alien.

# **Challenges**

There were several timings and aliens direction bugs that I had to deal with. For example, if the last alien died at left edge of the screen would mean that the global variable for next wave of aliens is still left instead of right (default value). As the aliens wave are generated at div index 0 this led to error as the new wave of alines indexes would go - 1, -2, -3 when it should go right 0, 1, 2. I fixed this error by generating the aliens from the centre of the grid on all cases which meant that the new wave of alien could go right or left and when they reach the edge of the grid the aliens would move down a row.

## Wins

- In this project, I had to work with arrays and various array methods to build the main logic of the game. Timings events were also crucial part of this project as a lot of features depended on it and I managed to used it to create some of the main features that showed movement in the game.

- I'm pleased with the look and feel of the game in terms of its appearance and the sounds and the satisfaction of removing enemy ships.

- The project really helped to consolidate my knowledge of JavaScript, HTML and CSS and interacting with the DOM.

## Key learnings

- Working with lots of functions.
- Plan ahead.
- Naming variables appropriately.
- Styling using CSS.

## Potential future features

- I would like to add more features to enhance user interace like screen notifying players have levelled up.

- Different points for different row of aliens-the topmost being the hightest points and different styling accordingly.

- I'd be keen to make this game mobile friendly. I treated the task as the first try-out of my JavaScript knowledge and so was more concerned with building something that worked on a screen with a keyboard. I'd need to reconsider how the player interacts with the game to make it suitable for smartphone or tablet use.

Thanks for reading and happy shooting aliens!
