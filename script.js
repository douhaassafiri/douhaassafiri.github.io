const canvas = document.querySelector('.connecting-dots');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = 300;
let particles = [];
let mouse = {x: null, y: null};

const isMobile = window.innerWidth <= 768;

const config = {
    particleCount: isMobile ? 40 : 90,
    maxDistance: isMobile ? 60 : 120,
    dotRadius: 2.5,
    colors: ['#77ddff', '#cc99ff', '#ffee99', '#99ffcc'],
    lineColor: 'rgba(255, 255, 255, 0.08)'
};


function createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < config.particleCount; i++) {
        let p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, config.dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = config.colors[i % config.colors.length];
        ctx.shadowColor = config.colors[i % config.colors.length];
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < config.particleCount; j++) {
            let q = particles[j];
            let dx = p.x - q.x;
            let dy = p.y - q.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.maxDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = config.lineColor;
                ctx.stroke();
            }
        }

        // line to mouse
        if (mouse.x !== null && mouse.y !== null) {
            let dx = p.x - mouse.x;
            let dy = p.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.maxDistance * 1.5) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = 'rgba(80, 80, 120, 0.3)';
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = 300;
    createParticles();
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

const glow = document.querySelector('.cursor-glow');
const wrapper = document.querySelector('.canvas-wrapper');

wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.display = 'block';
});

wrapper.addEventListener('mouseleave', () => {
    glow.style.display = 'none';
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

createParticles();
draw();

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
});

document.querySelectorAll('.flip-card-back').forEach(cardBack => {
    cardBack.addEventListener('mouseenter', () => {
        document.body.classList.add('disable-scroll');
    });
    cardBack.addEventListener('mouseleave', () => {
        document.body.classList.remove('disable-scroll');
    });

    cardBack.addEventListener('touchstart', () => {
        document.body.classList.add('disable-scroll');
    });
    cardBack.addEventListener('touchend', () => {
        document.body.classList.remove('disable-scroll');
    });
});

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}
