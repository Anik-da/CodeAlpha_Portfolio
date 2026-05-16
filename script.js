/* ===== PARTICLE BACKGROUND ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '168,85,247' : '6,182,212';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        if (mouse.x) {
            const dx = mouse.x - this.x, dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
document.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .filter-btn, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
}

/* ===== TYPING ANIMATION ===== */
const typingEl = document.getElementById('typing-text');
const roles = ['Frontend Developer', 'AI Enthusiast', 'Student', 'Web Developer', 'Creative Coder'];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const current = roles[roleIdx];
    typingEl.textContent = isDeleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === current.length + 1) { speed = 2000; isDeleting = true; }
    if (isDeleting && charIdx < 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 400; }
    setTimeout(typeEffect, speed);
}
typeEffect();

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

/* Active nav highlighting on scroll */
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
        const top = sec.offsetTop, height = sec.offsetHeight, id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) link.classList.add('active');
            else link.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', highlightNav);

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

/* ===== SKILL BAR ANIMATION ===== */
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.getAttribute('data-count');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.floor(current);
            }, 16);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ===== GITHUB PROJECT SYNC ===== */
async function fetchGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const username = 'Anik-da';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        
        if (!Array.isArray(repos)) throw new Error('Failed to fetch repos');

        // Update Stats Dynamically
        const repoCountEl = document.getElementById('repo-count');
        const commitCountEl = document.getElementById('commit-count');
        
        if (repoCountEl) repoCountEl.setAttribute('data-count', repos.length);
        if (commitCountEl) {
            // Approximate activity score based on stars/watchers/size for visual impact
            const activityScore = repos.reduce((acc, r) => acc + r.stargazers_count + r.watchers_count + (r.size / 100), 100);
            commitCountEl.setAttribute('data-count', Math.floor(activityScore));
        }
        
        // Re-trigger counter observation for updated targets
        counters.forEach(c => counterObserver.observe(c));

        // Clear loading state
        projectsGrid.innerHTML = '';

        // Filter out fork repositories and the profile repo
        const filteredRepos = repos.filter(repo => !repo.fork && repo.name !== username);

        filteredRepos.forEach((repo, i) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            
            // Determine category based on topics or language
            let category = 'web';
            if (repo.topics && repo.topics.includes('ai')) category = 'ai';
            if (repo.topics && repo.topics.includes('firebase')) category = 'firebase';
            card.setAttribute('data-category', category);

            // Create Icon based on language
            let icon = 'fas fa-code';
            if (repo.language === 'HTML') icon = 'fab fa-html5';
            if (repo.language === 'JavaScript') icon = 'fab fa-js';
            if (repo.language === 'Python') icon = 'fab fa-python';
            if (repo.name.toLowerCase().includes('calculator')) icon = 'fas fa-calculator';
            if (repo.name.toLowerCase().includes('gallery')) icon = 'fas fa-image';
            if (repo.name.toLowerCase().includes('maintenance')) icon = 'fas fa-city';
            if (repo.name.toLowerCase().includes('vote')) icon = 'fas fa-vote-yea';

            card.innerHTML = `
                <div class="project-image">
                    <div class="project-img-placeholder"><i class="${icon}"></i></div>
                </div>
                <div class="project-info">
                    <span class="project-tag">${repo.language || 'Project'} / ${category.toUpperCase()}</span>
                    <h3>${repo.name.replace(/_/g, ' ').replace(/-/g, ' ')}</h3>
                    <p>${repo.description || 'Modern project built with clean code and best practices.'}</p>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
            
            // Observe the new element for reveal animation
            revealObserver.observe(card);
        });

        // Re-initialize filter logic for dynamic cards
        initFiltering();

    } catch (error) {
        console.error('GitHub Fetch Error:', error);
        projectsGrid.innerHTML = `<p class="error-msg">Failed to load projects. Please <a href="https://github.com/${username}" target="_blank">visit my GitHub</a> directly.</p>`;
    }
}

function initFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        };
    });
}

// Call the fetch function on load
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);

/* ===== RESUME GENERATION ===== */
const resumeBtn = document.getElementById('generate-resume');
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        const element = document.getElementById('resume-template');
        
        const opt = {
            margin: [0.5, 0.5],
            filename: 'Anik_Das_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate and download
        html2pdf().set(opt).from(element).save();
    });
}

/* ===== CONTACT FORM ===== */
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        this.reset();
    }, 3000);
});

/* ===== FADE-UP KEYFRAME (injected) ===== */
const style = document.createElement('style');
style.textContent = `@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(style);
