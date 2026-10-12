const track = document.querySelector(".carousel-track");
const viewport = document.querySelector(".carousel-overflow") || track.parentElement;
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const cards = document.querySelectorAll(".cards-project");

let index = 0;

function getStep() {
    if (cards.length > 1) {
        return cards[1].offsetLeft - cards[0].offsetLeft;
    }
    return cards[0].offsetWidth;
}

function getMaxScroll() {
    return Math.max(0, track.scrollWidth - viewport.clientWidth);
}

function getMaxIndex() {
    const step = getStep();
    return step > 0 ? Math.ceil(getMaxScroll() / step) : 0;
}

function updateCarousel() {
    const offset = Math.min(index * getStep(), getMaxScroll());
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener("click", () => {
    index = index < getMaxIndex() ? index + 1 : 0;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    index = index > 0 ? index - 1 : getMaxIndex();
    updateCarousel();
});

window.addEventListener("resize", () => {
    index = Math.min(index, getMaxIndex());
    updateCarousel();
});

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.animation = "none";
    });

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * 7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.animation = "";
    });
});

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.cert-card').forEach(card => certObserver.observe(card));

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
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
}

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
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.3 });

document.querySelectorAll('.reveal-title').forEach(title => {
    titleObserver.observe(title);
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-title, .about-description, .about-curriculum, .about-role, .section-subtitle h2, .button-cta button, .reveal-scroll, .about-timeline, .current-role').forEach(el => {
    aboutObserver.observe(el);
});