// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth < 992) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Touch-friendly smooth scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth < 992) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            }
            
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create form message element if it doesn't exist
        let formMessage = document.getElementById('formMessage');
        if (!formMessage) {
            formMessage = document.createElement('div');
            formMessage.id = 'formMessage';
            formMessage.className = 'form-message success';
            this.appendChild(formMessage);
        }
        
        // Show success message
        formMessage.textContent = `Thank you, ${name}! Your message has been received. I'll contact you at ${email} soon.`;
        formMessage.className = 'form-message success';
        
        // Reset form
        this.reset();
        
        // Scroll to message for mobile users
        if (window.innerWidth < 768) {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
}

// Touch-friendly hover effects for mobile
document.querySelectorAll('.skill-category, .project-card').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-5px)';
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
        this.style.transform = 'translateY(0)';
    }, { passive: true });
});

// Prevent horizontal scroll on mobile
document.body.addEventListener('touchmove', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }
    
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (touch.clientX <= 10 || touch.clientX >= window.innerWidth - 10) {
            e.preventDefault();
        }
    }
}, { passive: false });

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for scroll animations
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Observe timeline items for scroll animations
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-10px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Observe skill categories for scroll animations
document.querySelectorAll('.skill-category').forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(category);
});

// Fix for iOS viewport height issue
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Prevent zoom on double-tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add CSS variable for viewport height
const style = document.createElement('style');
style.textContent = `
    .hero {
        min-height: calc(var(--vh, 1vh) * 100 - 70px);
    }
`;
document.head.appendChild(style);
