// --- 1. Setup and Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Lucide icons
    lucide.createIcons();

    // Setup event listeners
    setupMobileMenu();
    setupFormHandlers();
    setupIntersectionObserver();
});

// --- 2. Mobile Menu Toggle ---
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- 3. Animated Counters ---
function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Use Math.ceil or Math.floor based on desired look, floor is cleaner here
        const currentValue = Math.floor(progress * target); 
        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    requestAnimationFrame(updateCount);
}

function setupIntersectionObserver() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetValue = parseInt(targetElement.getAttribute('data-counter-target'), 10);
                animateCounter(targetElement, targetValue);
                observer.unobserve(targetElement); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    counterElements.forEach(el => observer.observe(el));
}


// --- 4. Form Handlers ---
function setupFormHandlers() {
    // Report Issue Form
    document.getElementById('issue-form').addEventListener('submit', function (e) {
        e.preventDefault();
        this.reset();
        const confirmation = document.getElementById('report-confirmation');
        confirmation.classList.remove('hidden');
        setTimeout(() => confirmation.classList.add('hidden'), 5000);
    });

    // Volunteer Form
    document.getElementById('volunteer-form').addEventListener('submit', function (e) {
        e.preventDefault();
        this.reset();
        const confirmation = document.getElementById('volunteer-confirmation');
        confirmation.classList.remove('hidden');
        setTimeout(() => confirmation.classList.add('hidden'), 5000);
    });

    // Contact Form (Basic confirmation)
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Newsletter Form (Basic confirmation)
    document.getElementById('newsletter-form').addEventListener('submit', function (e) {
        e.preventDefault();
        this.reset();
        const confirmation = document.getElementById('newsletter-confirmation');
        confirmation.classList.remove('hidden');
        setTimeout(() => confirmation.classList.add('hidden'), 3000);
    });
}