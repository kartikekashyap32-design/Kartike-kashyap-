const titles = [
  'Full Stack Developer',
  'UI/UX Focused Engineer',
  'JavaScript & Node.js Specialist'
];

const typingEl = document.getElementById('typing-text');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = titles[titleIndex];
  typingEl.textContent = current.slice(0, charIndex);

  if (!isDeleting) {
    charIndex += 1;
    if (charIndex > current.length) {
      isDeleting = true;
      return setTimeout(typeLoop, 1000);
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, isDeleting ? 45 : 95);
}

typeLoop();

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const canvas = document.getElementById('bg-particles');
const ctx = canvas.getContext('2d');
const particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.2 + 0.6,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35
  };
}

function initParticles(count = 120) {
  particles.length = 0;
  for (let i = 0; i < count; i += 1) {
    particles.push(makeParticle());
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(150, 169, 255, 0.45)';

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
initParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles(Math.floor(window.innerWidth / 12));
});
