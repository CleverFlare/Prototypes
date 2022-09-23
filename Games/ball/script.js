// -----canvas biolerplate-----
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeAdjustment, false);

function resizeAdjustment() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeAdjustment();

// -----blocks logic------
class Block {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.x = position.x;
    this.y = position.y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "#8C5B5B";
    ctx.fillRect(this.x, this.y, Block.width, Block.height);
    ctx.strokeRect(this.x, this.y, Block.width, Block.height);
    ctx.closePath();
  }
}

const blocks = [];

const design = [
  [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ],
  [" "],
  [" "],
  [" "],
  [" "],
  [
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ],
  [" "],
  [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "-",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ],
  [
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ],
];

design.forEach((level, levelIndex) => {
  level.forEach((unit, unitIndex) => {
    switch (unit) {
      case "-":
        blocks.push(
          new Block({
            position: {
              x: Block.width * unitIndex,
              y: canvas.height - Block.height * (design.length - levelIndex),
            },
          })
        );
    }
  });
});

// -----player logic-----
class Player {
  static radius = 20;
  constructor({ position, velocity, speed = 5 }) {
    this.position = position;
    this.velocity = velocity;
    this.gravityLimit = 100;
    this.landed = false;
    this.dy = 2;
    this.jump = 10;
    this.speed = speed;
    this.radius = Player.radius;
    this.keys = {
      up: {
        pressed: false,
      },
      down: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
      right: {
        pressed: false,
      },
    };
    addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 87:
        case 38:
        case 32:
          this.keys.up.pressed = true;
          break;
        case 65:
        case 37:
          this.keys.left.pressed = true;
          break;
        case 68:
        case 39:
          this.keys.right.pressed = true;
          break;
      }
    });

    addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 87:
        case 38:
        case 32:
          this.keys.up.pressed = false;
          break;
        case 65:
        case 37:
          this.keys.left.pressed = false;
          break;
        case 68:
        case 39:
          this.keys.right.pressed = false;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  gravity() {
    let landed = false;
    let smashed = false;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (
        this.position.y - this.radius - this.dy <= block.y &&
        this.position.y + this.radius + this.dy >= block.y &&
        this.position.x - this.radius <= block.x + Block.width &&
        this.position.x + this.radius >= block.x
      ) {
        landed = true;
        break;
      }
    }
    if (landed) {
      this.dy = -this.dy * 0.6;
      if (this.keys.up.pressed) {
        this.dy = -(this.jump - this.dy);
      }
    } else {
      this.dy += 1;
    }

    this.position.y += this.dy;
  }

  update() {
    this.draw();
    this.gravity();
    this.position.x += this.velocity.x;
  }

  movement() {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
    }
    this.velocity.x = 0;
    if (this.keys.left.pressed) {
      this.velocity.x = -this.speed;
    }
    if (this.keys.right.pressed) {
      this.velocity.x = this.speed;
    }
  }

  initiate() {
    this.update();
    this.movement();
  }
}

const player = new Player({
  position: {
    x: canvas.width / 2 - Player.radius,
    y: Player.radius,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// -----animation logic-----
(function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  blocks.forEach((block) => block.draw());

  player.initiate();
})();

// Copyright 2013, Flare, All rights reserved.
