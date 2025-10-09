/** js/scripts.js of bbauska/1970s making 1970s.bauska.org */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class VCREffect {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = Object.assign({
      fps: 60,
      blur: 1,
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 70
    }, options);

        this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.opacity = this.config.opacity;

    this.generateVCRNoise();
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateVCRNoise() {
    if (this.config.fps >= 60) {
      cancelAnimationFrame(this.vcrInterval);
      const animate = () => {
        this.renderTrackingNoise();
        this.vcrInterval = requestAnimationFrame(animate);
      };
      animate();
    } else {
      clearInterval(this.vcrInterval);
      this.vcrInterval = setInterval(() => {
        this.renderTrackingNoise();
      }, 1000 / this.config.fps);
    }
  }

  renderTrackingNoise(radius = 2) {
    const { canvas, ctx, config } = this;
    let { miny, miny2, num } = config;

    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;

    ctx.beginPath();
    for (let i = 0; i <= num; i++) {
      let x = Math.random() * canvas.width;
      let y1 = getRandomInt(miny += 3, canvas.height);
      let y2 = getRandomInt(0, miny2 -= 3);
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();

      this.renderTail(ctx, x, y1, radius);
      this.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  }

  renderTail(ctx, x, y, radius) {
    const n = getRandomInt(1, 50);
    const dirs = [1, -1];
    let dir = dirs[Math.floor(Math.random() * dirs.length)];

    for (let i = 0; i < n; i++) {
      let r = getRandomInt(radius - 0.01, radius);
      let dx = getRandomInt(1, 4) * dir;
      radius -= 0.1;
      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  }
}
/*
https://www.youtube.com/shorts/XJIQeXDfOwE commercials from the 70s
https://youtu.be/-J5PNGGLgKI  land of the lost
https://youtu.be/UK13a1yryVg  all in the family
https://youtu.be/a3_QlasXQWY  welcome back kotter
https://youtu.be/a3_QlasXQWY  get smart
https://youtu.be/fqKEENAGSBo  the fantastic voyage 1977
https://youtu.be/viUbVn0-ZQw  the amazing spiderman
https://youtu.be/8UfS72PBfY8  mccloud
https://youtu.be/FOYnDtO4H1w  the life and times of grizzly adams
https://youtu.be/2-VQ2uyiYLo  cheers
https://youtu.be/yuEBBwJdjhQ  snl word association richard prior
*/
// Usage
const canvas = document.getElementById("canvas");
const vcrEffect = new VCREffect(canvas, {
  opacity: 1,
  miny: 220,
  miny2: 220,
  num: 70,
  fps: 60,
  blur: 1
});
const videoIds = ["UK13a1yryVg", "WfuTipCqs4A", "-J5PNGGLgKI", "a3_QlasXQWY", "fqKEENAGSBo", "viUbVn0-ZQw", "XJIQeXDfOwE", "2-VQ2uyiYLo", "yuEBBwJdjhQ", "-J5PNGGLgKI"];
let currentVideoIndex = 0;
const iframe = document.getElementById("ytplayer");
const snowEffect = document.querySelector(".snow-effect");

function switchToNextVideo() {
  snowEffect.style.opacity = 1;
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    iframe.src = `https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&controls=0&loop=1&mute=1`;
    snowEffect.style.opacity = 0;
  }, 2000); // 2 seconds of static before switching
}

iframe.addEventListener("load", () => {
  setTimeout(switchToNextVideo, 23000); 
});
