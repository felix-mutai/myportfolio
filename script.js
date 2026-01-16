// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you for your message, ${name}! I'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    this.reset();
});

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Project filtering (for future enhancement)
// This could be extended to filter projects by technology or type
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filter === 'all' || card.querySelector('.project-badge').classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add some interactive animations to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
});

// Add animation to project cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Add some delay to timeline items for staggered animation
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});
// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

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
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});