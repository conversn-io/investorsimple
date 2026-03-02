/**
 * InvestorSimple - Main JavaScript
 * Interactive functionality for navigation, forms, and smooth scrolling
 */

// ========================================
// Navigation Functionality
// ========================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        
        this.init();
    }
    
    init() {
        // Scroll detection for navbar style
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Smooth scrolling for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleLinkClick(e));
        });
        
        // Mobile dropdown toggles
        if (window.innerWidth <= 768) {
            this.setupMobileDropdowns();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        this.updateActiveLink();
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = this.navMenu.classList.contains('active');
        this.navToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (this.navMenu.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
                
                // Smooth scroll to target
                const navbarHeight = this.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                this.setActiveLink(e.currentTarget);
            }
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + this.navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    setupMobileDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
    
    handleResize() {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768 && this.navMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    }
}

// ========================================
// Newsletter Form Handler
// ========================================

class NewsletterForm {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.successMessage = document.getElementById('formSuccess');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const interests = document.getElementById('interests').checked;
        
        // Basic email validation
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.subscribeUser(email, interests);
            
            // Show success message
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            
            // Optional: Track conversion
            this.trackConversion('newsletter_signup', { email });
            
        } catch (error) {
            this.showError('Something went wrong. Please try again.');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    async subscribeUser(email, interests) {
        // Simulate API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Newsletter subscription:', { email, interests });
                resolve({ success: true });
            }, 1000);
        });
        
        // Example API call (uncomment when ready):
        /*
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, interests })
        });
        return response.json();
        */
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showError(message) {
        // Create or update error message
        let errorDiv = this.form.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = 'color: #dc2626; font-size: 0.9rem; margin-top: 8px; text-align: center;';
            this.form.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    trackConversion(eventName, data) {
        // Track conversion event (integrate with analytics)
        console.log('Conversion tracked:', eventName, data);
        
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }
}

// ========================================
// Smooth Scroll Animations
// ========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.insight-card, .category-card, .tool-card, .stat-item');
        this.init();
    }
    
    init() {
        // Use Intersection Observer for performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.elements.forEach(element => observer.observe(element));
    }
}

// ========================================
// Utility Functions
// ========================================

const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Smooth scroll to element
    scrollToElement(elementId, offset = 100) {
        const element = document.getElementById(elementId);
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// ========================================
// Card Click Handlers
// ========================================

class CardInteractions {
    constructor() {
        this.insightCards = document.querySelectorAll('.insight-card');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.toolCards = document.querySelectorAll('.tool-card');
        
        this.init();
    }
    
    init() {
        // Make entire card clickable
        this.insightCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    const link = card.querySelector('.card-link');
                    if (link) link.click();
                }
            });
        });
        
        this.categoryCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    const link = card.querySelector('.btn');
                    if (link) link.click();
                }
            });
        });
        
        this.toolCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    const link = card.querySelector('.btn-text');
                    if (link) link.click();
                }
            });
        });
    }
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new NewsletterForm();
    new ScrollAnimations();
    new CardInteractions();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('InvestorSimple initialized successfully');
    
    // Expose utilities globally if needed
    window.InvestorSimple = {
        utils: Utils,
        version: '1.0.0'
    };
});

// ========================================
// Handle External Links
// ========================================

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        // Open external links in new tab
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ========================================
// Performance Monitoring
// ========================================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
        // Performance observer not supported
    }
}

// ========================================
// Accessibility Enhancements
// ========================================

// Add keyboard navigation for cards
document.querySelectorAll('.insight-card, .category-card, .tool-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Focus management for mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Focus first link when menu opens
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
}

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optional: Send error to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Optional: Send error to monitoring service
});
