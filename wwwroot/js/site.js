// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Loading screen
window.addEventListener('load', function () {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 500);
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navbarNav = document.getElementById('navbar-nav');

mobileMenuToggle.addEventListener('click', function () {
    navbarNav.classList.toggle('active');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const currentPath = window.location.pathname;

        // Check if the link is an internal anchor on the current page
        if (href.startsWith('#') && currentPath.endsWith('Privacy.cshtml')) {
            e.preventDefault();
            // Redirect to Index.cshtml with the hash, browser will handle scrolling
            window.location.href = '/Index' + href;
        } else if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Active nav link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Theme toggle (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'light-mode') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Default to light mode if user's system prefers it and no saved preference
    body.classList.add('light-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    
    // Update icon
    if (isLightMode) {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // Save preference
    localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
});

// Form submission
document.querySelector('.request-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;

    const formData = new FormData(this);

    try {
        const response = await fetch(this.action, {
            method: this.method,
            body: formData
        });

        if (response.ok) {
            // Assuming successful submission redirects or returns a success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi thành công!';
            submitBtn.style.background = 'var(--success-color)';
            this.reset();
        } else {
            // Handle validation errors or other server-side errors
            const errorText = await response.text();
            console.error('Form submission failed:', errorText);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Gửi thất bại!';
            submitBtn.style.background = 'var(--danger-color)';
            alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
        }
    } catch (error) {
        console.error('Network error:', error);
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Gửi thất bại!';
        submitBtn.style.background = 'var(--danger-color)';
        alert('Có lỗi kết nối. Vui lòng thử lại.');
    } finally {
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
    }
});