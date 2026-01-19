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

// Project Details Data
const projectDetails = {
    "securechain": {
        title: "SecureChain Wallet",
        subtitle: "Secure Cryptocurrency Wallet",
        badges: ["Blockchain", "Flutter", "React"],
        description: "A secure, multi-chain cryptocurrency wallet application that supports Ethereum, Binance Smart Chain, and Polygon networks. Built with Flutter for mobile and React for web interface.",
        longDescription: "SecureChain Wallet is a comprehensive cryptocurrency management solution that provides users with secure storage, easy transactions, and portfolio tracking across multiple blockchain networks. The application implements industry-standard security practices including biometric authentication, hardware wallet integration, and encrypted local storage.",
        features: [
            "Multi-chain support (Ethereum, BSC, Polygon)",
            "Biometric authentication (Face ID, Fingerprint)",
            "Hardware wallet integration (Ledger, Trezor)",
            "Real-time portfolio tracking",
            "Secure transaction signing",
            "Token swapping via DEX integration",
            "Transaction history with export",
            "Push notifications for transactions"
        ],
        technologies: ["Flutter", "Dart", "Solidity", "Web3.js", "React", "Node.js", "Firebase", "AWS"],
        challenges: "Implementing secure key management across multiple platforms while maintaining user-friendly experience.",
        solutions: "Used Flutter's secure storage with platform-specific encryption and implemented a hierarchical deterministic wallet system.",
        links: [
            { type: "github", url: "#", text: "View Code" },
            { type: "demo", url: "#", text: "Live Demo" }
        ]
    },
    "propertychain": {
        title: "PropertyChain",
        subtitle: "Blockchain Real Estate Platform",
        badges: ["Blockchain", "Web"],
        description: "Blockchain-based platform for transparent and secure real estate transactions, reducing fraud and increasing trust in property transfers.",
        longDescription: "PropertyChain revolutionizes real estate transactions by leveraging blockchain technology to create immutable records of property ownership, transaction history, and legal documents. The platform eliminates the need for intermediaries while ensuring transparency and security.",
        features: [
            "Smart contract-based property transfers",
            "Digital property deeds as NFTs",
            "Escrow services with automated release",
            "Property history tracking",
            "Legal document verification",
            "Multi-signature transaction approval",
            "Integration with government land registries",
            "Mobile app for property viewing"
        ],
        technologies: ["Ethereum", "Solidity", "React", "Node.js", "IPFS", "MongoDB", "AWS"],
        challenges: "Integrating with existing government land registry systems and ensuring legal compliance.",
        solutions: "Developed a hybrid approach combining blockchain records with traditional databases for regulatory compliance.",
        links: [
            { type: "github", url: "#", text: "View Code" },
            { type: "demo", url: "#", text: "Case Study" }
        ]
    },
    "maliyetu": {
        title: "Mali Yetu Payment House",
        subtitle: "Fintech Payment Platform",
        badges: ["Flutter", "Mobile"],
        description: "Comprehensive payment platform built with Flutter for Android and iOS, enabling secure mobile transactions, bill payments, and money transfers.",
        longDescription: "Mali Yetu (Our Wealth) is a fintech solution designed for the African market, providing seamless payment experiences across mobile devices. The app supports multiple payment methods including mobile money, bank transfers, and card payments.",
        features: [
            "Mobile money integration (M-Pesa, Airtel Money)",
            "Bill payments (utilities, TV, internet)",
            "Peer-to-peer money transfers",
            "QR code payments",
            "Transaction scheduling",
            "Spending analytics",
            "Multi-language support",
            "Offline transaction queuing"
        ],
        technologies: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Redis", "AWS EC2", "Firebase"],
        challenges: "Handling offline transactions in areas with poor internet connectivity.",
        solutions: "Implemented a queuing system that stores transactions locally and syncs when connection is restored.",
        links: [
            { type: "playstore", url: "#", text: "Play Store" },
            { type: "appstore", url: "#", text: "App Store" }
        ]
    },
    "zipcrypto": {
        title: "Zip Crypto Payment",
        subtitle: "Crypto Payment Application",
        badges: ["Flutter", "Blockchain"],
        description: "Cross-platform mobile payment application with cryptocurrency integration, allowing users to pay with both fiat and crypto currencies.",
        longDescription: "Zip Crypto Payment bridges traditional payment systems with cryptocurrency, enabling merchants to accept both fiat and crypto payments through a single interface. The app includes features for instant conversion between currencies.",
        features: [
            "Multi-currency wallet (fiat & crypto)",
            "Instant currency conversion",
            "Merchant payment integration",
            "Recurring payments",
            "Payment request system",
            "Tax calculation and reporting",
            "Multi-signature security",
            "Real-time exchange rates"
        ],
        technologies: ["Flutter", "Web3.js", "Firebase", "Node.js", "Stripe API", "Coinbase API", "AWS Lambda"],
        challenges: "Ensuring fast transaction confirmation times while maintaining security.",
        solutions: "Implemented layer-2 solutions and optimized gas fee calculations for different network conditions.",
        links: [
            { type: "github", url: "#", text: "View Code" },
            { type: "demo", url: "#", text: "Try Demo" }
        ]
    },
    "livepayment": {
        title: "LivePayment Platform",
        subtitle: "Web Payment Processing System",
        badges: ["Web", "Full Stack"],
        description: "Enterprise-grade payment processing platform with real-time transaction monitoring, fraud detection, and comprehensive analytics dashboard.",
        longDescription: "LivePayment Platform is a SaaS solution for businesses to manage online payments, subscriptions, and financial operations. The platform includes advanced features for fraud prevention, compliance, and business intelligence.",
        features: [
            "Real-time transaction monitoring",
            "AI-powered fraud detection",
            "Subscription management",
            "Automated invoicing",
            "Multi-currency settlement",
            "PCI DSS compliance",
            "Comprehensive reporting",
            "API for third-party integration"
        ],
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Stripe SDK"],
        challenges: "Scaling to handle high-volume transaction processing during peak periods.",
        solutions: "Implemented microservices architecture with auto-scaling on AWS and optimized database queries.",
        links: [
            { type: "github", url: "#", text: "Backend Code" },
            { type: "demo", url: "#", text: "Admin Demo" }
        ]
    },
    "decentralizedhrm": {
        title: "Decentralized HRM",
        subtitle: "Blockchain HR Management",
        badges: ["Web", "Blockchain"],
        description: "HR management system leveraging blockchain for secure employee records, transparent payroll, and verifiable credentials.",
        longDescription: "Decentralized HRM transforms traditional human resource management by using blockchain for immutable record-keeping, smart contracts for payroll automation, and decentralized identity for credential verification.",
        features: [
            "Smart contract-based payroll",
            "Immutable employee records",
            "Verifiable credentials (education, experience)",
            "Automated compliance reporting",
            "Token-based incentive programs",
            "Decentralized performance reviews",
            "Secure document storage on IPFS",
            "Multi-organization management"
        ],
        technologies: ["Vue.js", "Solidity", "IPFS", "Node.js", "MySQL", "Docker", "AWS"],
        challenges: "Balancing transparency with employee privacy requirements.",
        solutions: "Implemented zero-knowledge proofs for sensitive data and role-based access control.",
        links: [
            { type: "github", url: "#", text: "Smart Contracts" },
            { type: "demo", url: "#", text: "HR Portal" }
        ]
    }
};

// Modal Elements
const projectModal = document.getElementById('projectModal');
const modalBody = projectModal.querySelector('.modal-body');
const modalClose = projectModal.querySelector('.modal-close');

// Open Modal Function
function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    
    if (!project) return;
    
    // Create modal content
    const modalContent = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
            <div class="modal-badges">
                ${project.badges.map(badge => `<span class="project-badge ${badge.toLowerCase()}">${badge}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-info-circle"></i> Overview</h3>
            <p>${project.description}</p>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section modal-features">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-tools"></i> Technologies Used</h3>
            <div class="modal-tech-stack">
                ${project.technologies.map(tech => `<span class="modal-tech-item">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-lightbulb"></i> Challenges & Solutions</h3>
            <p><strong>Challenge:</strong> ${project.challenges}</p>
            <p><strong>Solution:</strong> ${project.solutions}</p>
        </div>
        
        ${project.links.length > 0 ? `
        <div class="modal-section">
            <h3><i class="fas fa-external-link-alt"></i> Links</h3>
            <div class="modal-links">
                ${project.links.map(link => `
                    <a href="${link.url}" class="modal-link ${link.type === 'github' ? 'secondary' : ''}" target="_blank">
                        <i class="fas fa-${getLinkIcon(link.type)}"></i>
                        ${link.text}
                    </a>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    // Insert content
    modalBody.innerHTML = modalContent;
    
    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus for accessibility
    setTimeout(() => {
        modalClose.focus();
    }, 100);
}

// Helper function for link icons
function getLinkIcon(type) {
    const icons = {
        'github': 'code-branch',
        'demo': 'play-circle',
        'playstore': 'google-play',
        'appstore': 'apple',
        'external': 'external-link-alt'
    };
    return icons[type] || 'external-link-alt';
}

// Close Modal Function
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for View Details buttons
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close modal when clicking close button
modalClose.addEventListener('click', closeProjectModal);

// Close modal when clicking outside content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Prevent scrolling of background when modal is open
projectModal.addEventListener('touchmove', (e) => {
    if (projectModal.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Mobile-friendly modal close on swipe (optional)
let touchStartY = 0;
let touchEndY = 0;

modalBody.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

modalBody.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    
    // Swipe down to close on mobile
    if (touchEndY - touchStartY > 100 && window.innerWidth < 768) {
        closeProjectModal();
    }
});

// Add this to your existing script.js (after existing code)
// Update the existing project link buttons to have view-details class

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

