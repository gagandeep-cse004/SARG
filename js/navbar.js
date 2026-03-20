// DOM Elements
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');
const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const regularNavLinks = document.querySelectorAll('.nav-item:not(.has-dropdown) > .nav-link:not(.nav-cta)');
const ctaButton = document.querySelector('.nav-cta');

// Navbar scroll effect
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//         scrollTopBtn.classList.add('visible');
//     } else {
//         navbar.classList.remove('scrolled');
//         scrollTopBtn.classList.remove('visible');
//     }
// });

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Close all dropdowns
    document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
        item.classList.remove('dropdown-open');
    });
}

mobileToggle.addEventListener('click', toggleMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

// Handle dropdown toggles on mobile
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Check if mobile view
        if (window.innerWidth <= 992) {
            e.preventDefault();
            e.stopPropagation();

            const parentItem = toggle.parentElement;
            const isOpen = parentItem.classList.contains('dropdown-open');

            // Close all other dropdowns
            document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('dropdown-open');
                }
            });

            // Toggle current dropdown
            parentItem.classList.toggle('dropdown-open');
        }
    });
});

// Handle dropdown item clicks - close menu after navigation
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            // Small delay to allow navigation
            setTimeout(closeMobileMenu, 100);
        }
    });
});

// Handle regular nav links (non-dropdown) - close menu immediately
regularNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeMobileMenu();
        }
    });
});

// Handle CTA button click
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeMobileMenu();
        }
    });
}

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                closeMobileMenu();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        closeMobileMenu();
    }
});

// Add animation on scroll
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

// Observe all cards and sections
document.querySelectorAll('.service-card, .program-card, .vm-card, .about-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});