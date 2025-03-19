const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const numberOfLines = 50;

// Line Class
class Line {
  constructor(x, y, length, speed, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  update() {
    if (this.x > canvas.width) {
      this.x = -this.length;
    }
    this.x += this.speed;
    this.draw();
  }
}

// Initialize Lines
function init() {
  lines = [];
  for (let i = 0; i < numberOfLines; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = Math.random() * 100 + 50;
    const speed = Math.random() * 2 + 1;
    const color = `rgba(0, 255, 204, ${Math.random() * 0.5 + 0.2})`;
    lines.push(new Line(x, y, length, speed, color));
  }
}

// Animate Lines
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach(line => line.update());
  requestAnimationFrame(animate);
}

// Resize Canvas on Window Resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Start Animation
init();
animate();