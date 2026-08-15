const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const cards = document.querySelectorAll(".cards-project");

let index = 0;
const total = cards.length;

function getCardWidth() {
    const gap = parseFloat(getComputedStyle(track).gap);
    return cards[0].offsetWidth + gap;
}

function updateCarousel() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
}

nextBtn.addEventListener("click", () => {
    if (index < total - 1) {
        index++;
    } else {
        index = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        index = total - 1;
    }
    updateCarousel();
});

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.cert-card').forEach(card => certObserver.observe(card));

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 6 + 'px';
    cursor.style.top = e.clientY - 6 + 'px';
    follower.style.left = e.clientX - 17 + 'px';
    follower.style.top = e.clientY - 17 + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'var(--orange)';
        cursor.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.width = '35px';
        follower.style.height = '35px';
        follower.style.borderColor = 'var(--accent-header)';
        cursor.style.transform = 'scale(1)';
    });
});

const otherSide = document.getElementById('other-side');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    otherSide.style.backgroundPositionY = `calc(center + ${scrollY * 0.3}px)`;
});

const counters = document.querySelectorAll('.counter-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const step = target / (2000 / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);

        counterObserver.unobserve(counter);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-number').forEach(counter => {
    counterObserver.observe(counter);
});

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.reveal-title').forEach(title => {
    titleObserver.observe(title);
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-title, .about-description, .about-curriculum, .about-role, .section-subtitle h2, .button-cta button, .reveal-scroll, .about-timeline, .current-role').forEach(el => {
    aboutObserver.observe(el);
});