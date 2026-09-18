const canvas = document.getElementById('fireSafetyCanvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  const glow = 0;

  function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(260, 150, 40, 260, 180, 300);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0.28)');
    gradient.addColorStop(0.45, 'rgba(217, 60, 46, 0.10)');
    gradient.addColorStop(1, 'rgba(13, 17, 23, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.ellipse(326, 290, 200, 110, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawExtinguisher() {
    ctx.save();
    ctx.translate(250, 180);

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(-58, -110, 116, 220);

    const body = ctx.createLinearGradient(-58, -110, 58, 110);
    body.addColorStop(0, '#f8fafc');
    body.addColorStop(0.5, '#e2e8f0');
    body.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = body;
    ctx.fillRect(-50, -100, 100, 200);

    ctx.fillStyle = '#d93c2e';
    ctx.fillRect(-30, -126, 60, 26);

    ctx.fillStyle = '#111827';
    ctx.fillRect(-12, -152, 24, 26);

    ctx.fillStyle = '#d93c2e';
    ctx.fillRect(-8, -180, 16, 26);

    ctx.fillStyle = '#ef5d2a';
    ctx.fillRect(-18, 104, 36, 56);

    ctx.fillStyle = '#111827';
    ctx.fillRect(-8, 160, 16, 18);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-38, -75, 76, 16);
    ctx.fillRect(-38, -25, 76, 16);
    ctx.fillRect(-38, 25, 76, 16);

    ctx.restore();
  }

  function drawFlame(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.bezierCurveTo(13, -22, 28, -8, 18, 18);
    ctx.bezierCurveTo(10, 34, 0, 42, 0, 52);
    ctx.bezierCurveTo(-18, 38, -26, 20, -18, 0);
    ctx.bezierCurveTo(-12, -14, -6, -22, 0, -42);
    ctx.closePath();

    const flame = ctx.createLinearGradient(0, -42, 0, 52);
    flame.addColorStop(0, '#fef3c7');
    flame.addColorStop(0.2, '#fbbf24');
    flame.addColorStop(0.7, '#f97316');
    flame.addColorStop(1, '#ef4444');
    ctx.fillStyle = flame;
    ctx.fill();

    ctx.restore();
  }

  function drawIcons() {
    drawFlame(170, 120, 1.1);
    drawFlame(365, 150, 0.96);
    drawFlame(420, 190, 0.78);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(175, 92, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(420, 118, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate() {
    drawBackground();
    drawExtinguisher();
    drawIcons();

    const time = Date.now() * 0.001;
    ctx.save();
    ctx.translate(250, 180);
    ctx.fillStyle = 'rgba(249, 115, 22, 0.12)';
    ctx.fillRect(-70, 120, 140, 20 + Math.sin(time) * 4);
    ctx.restore();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.slider-dot'));
const heroSlider = document.querySelector('.hero-slider');
const heroTrack = document.querySelector('.hero-track');

if (heroSlides.length && heroDots.length && heroSlider && heroTrack) {
  let activeSlide = 0;
  let slideTimer;

  function showSlide(slideIndex) {
    activeSlide = (slideIndex + heroSlides.length) % heroSlides.length;

    heroTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

    heroSlides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeSlide);
    });

    heroDots.forEach((dot, index) => {
      const isActive = index === activeSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function restartSlideTimer() {
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
  }

  document.querySelectorAll('[data-slide]').forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slide));
      restartSlideTimer();
    });
  });

  document.querySelectorAll('[data-slide-direction]').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const direction = arrow.dataset.slideDirection === 'next' ? 1 : -1;
      showSlide(activeSlide + direction);
      restartSlideTimer();
    });
  });

  heroSlider.addEventListener('mouseenter', () => window.clearInterval(slideTimer));
  heroSlider.addEventListener('mouseleave', restartSlideTimer);
  showSlide(0);
  restartSlideTimer();
}
