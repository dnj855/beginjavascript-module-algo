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

  /**
   * Checks the battery level of the robot.
   * If the battery level is 0, the robot returns to the charging station at position [0, 0] and recharges its battery to 100.
   * @returns {boolean} Returns true if the battery was empty and the robot had to recharge, false otherwise.
   */
  checkBattery() {
    if (this.battery > 0) {
      return false;
    }
    console.log('Batterie épuisée. Retour à la station de recharge.');
    this.position = [0, 0];
    this.battery = 100;
    console.log('Batterie chargée. Prêt à reprendre le nettoyage.');
    return true;
  }

  /**
   * Moves the robot to a new position.
   * The robot can only move one step at a time, either horizontally or vertically.
   * Moving consumes 1% of the robot's battery.
   * @param {Number} x - The vertical displacement.
   * @param {Number} y - The horizontal displacement.
   */
  move(x, y) {
    if (this.checkBattery()) return;

    if (Math.abs(x) > 1 || Math.abs(y) > 1) {
      console.log("Le robot ne peut pas se déplacer de plus d'une case à la fois.");
      return;
    }
    this.battery--;
    this.position = [this.position[0] + x, this.position[1] + y];
    console.log(
      `Le robot se déplace à la position ${this.position}. Etat de la batterie : ${this.battery}%.`
    );
  }

  /**
   * Cleans the current position of the robot.
   * Cleaning consumes 5% of the robot's battery.
   * @param {House} house - The house in which the robot is.
   */
  clean(house) {
    if (this.checkBattery()) return;
    this.battery -= 5;
    console.log(
      `Nettoyage de la position ${this.position}. Etat de la batterie : ${this.battery}%.`
    );
    house.clean(this.position);
  }
  /**
   *
   * @param {House} house
   */
  doWork(house) {
    const nearestDirtyPiece = house.nearestDirtyPiece();
    if (!nearestDirtyPiece) {
      console.log('La maison est propre.');
      return false;
    }
    const robotPosition = this.position;

    const deltaX = nearestDirtyPiece[0] - robotPosition[0];
    const deltaY = nearestDirtyPiece[1] - robotPosition[1];
    if (deltaX === 0 && deltaY === 0) {
      this.clean(house);
      return;
    }
    if (deltaX > 0) {
      this.move(1, 0);
    } else if (deltaX < 0) {
      this.move(-1, 0);
    } else if (deltaY > 0) {
      this.move(0, 1);
    } else if (deltaY < 0) {
      this.move(0, -1);
    }
    return true;
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

  get isDirty() {
    return this.state === 'dirty';
  }

  get isClean() {
    return !this.isDirty;
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

  /**
   * Cleans the piece.
   * The state of the piece is changed to 'clean_by_robot' if it was 'dirty'.
   */
  clean() {
    if (this.state !== 'dirty') return;
    this.state = 'clean_by_robot';
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

  isAllClean() {
    return !this.layout.some((row) => row.some((piece) => piece.isDirty));
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

  /**
   * Cleans the piece at the given position.
   * @param {Array} position - The position of the piece to clean. The first element is the row index and the second element is the column index.
   */
  clean(position) {
    const [x, y] = position;
    this.layout[x]?.[y]?.clean();
  }

  nearestDirtyPiece() {
    const position = this.robot.position;
    if (this.layout[position[0]][position[1]].isDirty) {
      return position;
    }
    let nearestDirtyPiece = null;
    let nearestDistance = null;
    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j].isClean) continue;
        if (this.layout[i][j].isDirty) {
          const distance = Math.abs(position[0] - i) + Math.abs(position[1] - j);
          if (nearestDistance === null || distance < nearestDistance) {
            nearestDirtyPiece = [i, j];
            nearestDistance = distance;
          }
        }
      }
    }
    return nearestDirtyPiece;
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
const play = async () => {
  const houseSize = [10, 10];
  const robot = new Robot();
  const house = new House(createLayout(houseSize[0], houseSize[1]), robot);
  let time = 0;
  const workInterval = setInterval(() => {
    console.clear();
    robot.logBattery();
    house.logLayout();
    time++;
    if (!house.isAllClean()) {
      robot.doWork(house);
      return;
    }
    clearInterval(workInterval);
    console.log(`Le robot a terminé le nettoyage en ${time} fois.`);
  }, 100);
};

// Starts the game.
play();
