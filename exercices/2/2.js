/**
 * Represents a robot.
 * @constructor
 */
class Robot {
  constructor() {
    this.battery = 100;
    this.position = [0, 0];
  }

  /**
   * Logs the battery level of the robot.
   * The battery level is represented as a series of emojis, where '🟩' represents a charged segment and '🟥' represents a discharged segment.
   * Each segment represents 10% of the battery's capacity.
   */
  logBattery() {
    let batteryCopy = this.battery;
    let battery = '';
    for (let i = 0; i < 10; i++) {
      if (batteryCopy > 0) {
        battery += '🟩';
      } else {
        battery += '🟥';
      }
      batteryCopy -= 10;
    }
    console.log(battery);
  }
}
/**
 * Represents a piece of the house.
 * @constructor
 */
class Piece {
  /**
   *
   * @param {"clean" | "dirty" | "clean_by_robot"} state - The initial state of the piece.
   */
  constructor(state) {
    this.state = state;
  }

  /**
   * Returns an emoji representation of the piece's state.
   * '🧼' represents a clean state, '🧽' represents a state cleaned by the robot, and '💩' represents any other state.
   * @returns {string} An emoji representing the state of the piece.
   */
  getEmoji() {
    if (this.state === 'clean') {
      return '🧼';
    } else if (this.state === 'clean_by_robot') {
      return '🧽';
    } else {
      return '💩';
    }
  }
}

/**
 * Represents a house.
 * @constructor
 */
class House {
  /**
   * @param {Array} layout - The initial layout of the house. Each element of the array represents a piece of the house.
   * @param {Robot} robot - The robot that is in the house.
   */
  constructor(layout, robot) {
    this.layout = layout;
    this.robot = robot;
  }
  /**
   * Logs the layout of the house.
   * The layout is represented as a string, where each piece is represented by an emoji.
   * The robot is represented by '🤖', a clean piece by '🧼', a piece cleaned by the robot by '🧽', and any other piece by '💩'.
   */
  logLayout() {
    const layoutString = this.layout
      .map((row, i) => {
        return row
          .map((piece, j) => {
            if (this.robot.position[0] === i && this.robot.position[1] === j) {
              return '🤖';
            } else {
              return piece.getEmoji();
            }
          })
          .join('');
      })
      .join('\n');
    console.log(layoutString);
  }
}

/**
 * Creates a layout for the house.
 * The layout is a 2D array of pieces, where each piece is either clean or dirty.
 * @param {number} x - The number of rows in the layout.
 * @param {number} y - The number of columns in the layout.
 * @returns {Array} The created layout.
 */
const createLayout = (x, y) => {
  const layout = [];
  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      const piece = new Piece(Math.random() < 0.5 ? 'clean' : 'dirty');
      row.push(piece);
    }
    layout.push(row);
  }
  return layout;
};

/**
 * Plays the game.
 * A robot is created, a house is created with a layout of 5x5, and then the robot's battery and the house's layout are logged.
 */
const play = () => {
  const robot = new Robot();
  const house = new House(createLayout(5, 5), robot);
  robot.logBattery();
  house.logLayout();
};

// Starts the game.
play();
