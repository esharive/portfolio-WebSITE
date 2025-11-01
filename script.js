// =================================
// PRELOADER
// =================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercent = document.querySelector('.loading-percent');
    
    let percent = 0;
    const interval = setInterval(() => {
        percent += Math.random() * 10;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingPercent.textContent = Math.floor(percent) + '%';
    }, 100);
});

// =================================
// CUSTOM CURSOR
// =================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#FF6584';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#6C63FF';
    });
});

// =================================
// SCROLL PROGRESS BAR
// =================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// =================================
// PARTICLE CANVAS
// =================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(108, 99, 255, 0.5)';
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        particles.forEach((particle2, j) => {
            if (i === j) return;
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 * (1 - distance / 100)})`;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =================================
// NAVIGATION
// =================================
const nav = document.getElementById('mainNav');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// =================================
// THEME TOGGLE
// =================================
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-mode');
    
    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// =================================
// TYPED NAME EFFECT
// =================================
const nameElement = document.getElementById('typedName');
const fullName = 'Joshua Esharive';
let nameIndex = 0;

function typeName() {
    if (nameIndex < fullName.length) {
        nameElement.textContent += fullName.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeName, 100);
    }
}

setTimeout(typeName, 1000);

// =================================
// ROTATING ROLE
// =================================
const roleElement = document.getElementById('rotatingRole');
const roles = [
    'Full-Stack Developer',
    'Frontend Specialist',
    'Backend Engineer',
    
    'Problem Solver',
    'Creative Coder'
];
let currentRoleIndex = 0;

function rotateRole() {
    roleElement.style.opacity = '0';
    setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleElement.textContent = roles[currentRoleIndex];
        roleElement.style.opacity = '1';
    }, 300);
}

roleElement.textContent = roles[0];
setInterval(rotateRole, 3000);

// =================================
// COUNTER ANIMATION
// =================================
function animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 20);
}

// Trigger counters on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// =================================
// SKILL BARS ANIMATION
// =================================
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsProficiency = document.querySelector('.skills-proficiency');
if (skillsProficiency) {
    skillBarObserver.observe(skillsProficiency);
}

// =================================
// PROJECT FILTERING
// =================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// =================================
// TESTIMONIAL SLIDER
// =================================
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const dotsContainer = document.getElementById('testimonialDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentSlide = 0;
const slidesToShow = window.innerWidth > 768 ? 2 : 1;
const totalSlides = Math.ceil(testimonialCards.length / slidesToShow);

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('button');

function updateSlider() {
    const cardWidth = testimonialCards[0].offsetWidth + 30;
    const offset = -currentSlide * cardWidth * slidesToShow;
    testimonialTrack.style.transform = `translateX(${offset}px)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
let autoSlide = setInterval(nextSlide, 5000);

testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

testimonialTrack.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Update on resize
window.addEventListener('resize', () => {
    const newSlidesToShow = window.innerWidth > 768 ? 2 : 1;
    if (newSlidesToShow !== slidesToShow) {
        location.reload();
    }
});

// =================================
// CONTACT FORM
// =================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Show toast notification
        showToast('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
        
        // Reset after 5 seconds
        setTimeout(() => {
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    }, 2000);
});

// =================================
// BACK TO TOP
// =================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =================================
// AOS INITIALIZATION
// =================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// =================================
// FOOTER YEAR
// =================================
document.getElementById('year').textContent = new Date().getFullYear();

// =================================
// NEWSLETTER FORM
// =================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        showToast('Thanks for subscribing!');
        newsletterForm.reset();
    });
}

// =================================
// PARALLAX EFFECT
// =================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.floating-tech, .glowing-orb');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// =================================
// SMOOTH REVEAL ON SCROLL
// =================================
const revealElements = document.querySelectorAll('.about-content, .skill-category-card, .project-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// =================================
// 3D TILT EFFECT ON CARDS
// =================================
const cards = document.querySelectorAll('.project-card, .skill-category-card, .testimonial-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// =================================
// KEYBOARD NAVIGATION
// =================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// =================================
// LAZY LOADING IMAGES
// =================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// =================================
// TIMELINE ANIMATION
// =================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
});

// =================================
// CONSOLE MESSAGE
// =================================
console.log('%c👋 Welcome to My Portfolio!', 'color: #6C63FF; font-size: 24px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #FF6584; font-size: 16px;');
console.log('%cEmail: joshua.esharive@email.com', 'color: #00F5FF; font-size: 14px;');
