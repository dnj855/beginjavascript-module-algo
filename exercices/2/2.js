class Robot {
  constructor() {
    this.battery = 100;
    this.position = [0, 0];
  }
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
    return battery;
  }
}

class Piece {
  constructor(state, position) {
    this.state = state;
    this.position = position;
  }
  getEmoji() {
    if (this.state === 'clean') {
      return '🧼';
    } else if (globalThis.state === 'clean_by_robot') {
      return '🧽';
    } else {
      return '💩';
    }
  }
}

class House {
  constructor(layout, robot) {
    this.layout = layout;
    this.robot = robot;
  }
  logLayout() {
    const layoutString = this.layout
      .map((row) => {
        return row
          .map((piece) => {
            if (
              piece.position.every(
                (value, index) => value === this.robot.position[index]
              )
            ) {
              return '🤖';
            } else {
              return piece.getEmoji();
            }
          })
          .join('');
      })
      .join('\n');
    return layoutString;
  }
}

const createLayout = (x, y) => {
  const layout = [];
  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      const piece = new Piece(Math.random() < 0.5 ? 'clean' : 'dirty', [i, j]);
      row.push(piece);
    }
    layout.push(row);
  }
  return layout;
};

const play = () => {
  const robot = new Robot();
  const house = new House(createLayout(5, 5), robot);
  console.log(robot.logBattery());
  console.log(house.logLayout());
};

play();
