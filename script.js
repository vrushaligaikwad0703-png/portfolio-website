document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initThemeToggle();
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initSkillBars();
    initTabs();
    initProjectFilter();
    initContactForm();
    initParticles();
    initChart();
    initAnimations();
});

// 1. Loader
function initLoader() {
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// 2. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// 3. Navigation
function initNavigation() {
    const nav = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// 4. Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 5. Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 6. Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile menu active link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 7. Back to Top
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 9. Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 10. Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
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
}

// 11. Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', { name, email, subject, message });
        }, 1000);
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(text, type) {
        const icon = notification.querySelector('i');
        const textSpan = notification.querySelector('span');
        
        textSpan.textContent = text;
        
        if (type === 'error') {
            notification.style.background = 'var(--danger-color)';
            icon.className = 'fas fa-exclamation-circle';
        } else {
            notification.style.background = 'var(--success-color)';
            icon.className = 'fas fa-check-circle';
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// 12. Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            filter: blur(${size / 3}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(90deg); }
            50% { transform: translate(0, -40px) rotate(180deg); }
            75% { transform: translate(-20px, -20px) rotate(270deg); }
        }
    `;
    document.head.appendChild(style);
}

// 13. Chart.js Implementation
function initChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'React', 'Node.js', 'UI/UX', 'Python', 'Database'],
            datasets: [{
                label: 'Skill Level',
                data: [95, 90, 85, 90, 80, 85],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgb(99, 102, 241)',
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 102, 241)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(99, 102, 241, 0.1)'
                    },
                    grid: {
                        color: 'rgba(99, 102, 241, 0.1)'
                    },
                    pointLabels: {
                        color: 'var(--dark-color)',
                        font: {
                            family: 'Poppins',
                            size: 14
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'var(--gray-color)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'var(--dark-color)',
                        font: {
                            family: 'Poppins',
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// 14. Additional Animations
function initAnimations() {
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-text');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for home section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home-section');
        const homeImage = document.querySelector('.home-image');
        
        if (homeImage) {
            homeImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        if (homeSection) {
            homeSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });
    
    // Typing effect for subtitle
    const subtitle = document.querySelector('.home-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// 15. Hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card, .project-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
// Add this function to verify and handle CV download
function initCVDownload() {
    const cvButtons = document.querySelectorAll('[href*="resume.pdf"], [download*="Resume"], .btn-download-cv');
    
    cvButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For external links, don't intercept
            if (this.href.includes('drive.google.com') || 
                this.href.includes('dropbox.com') || 
                this.href.includes('onedrive.com')) {
                return true;
            }
            
            // For local resume file
            const resumePath = 'assets/icons/resume.pdf';
            
            // Check if file exists
            fetch(resumePath, { method: 'HEAD' })
                .then(response => {
                    if (!response.ok) {
                        e.preventDefault();
                        showCVNotFoundError();
                    }
                    // If file exists, let the download proceed normally
                })
                .catch(error => {
                    e.preventDefault();
                    showCVNotFoundError();
                });
        });
    });
    
    // Add a check on page load
    checkResumeExists();
}

function checkResumeExists() {
    const resumePath = 'assets/icons/resume.pdf';
    
    fetch(resumePath, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                console.warn('Resume file not found at:', resumePath);
                showResumeHelpMessage();
            } else {
                console.log('Resume file found and ready for download');
            }
        })
        .catch(error => {
            console.error('Error checking resume:', error);
        });
}

function showCVNotFoundError() {
    const notification = document.createElement('div');
    notification.className = 'cv-error-notification';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 500px;
        width: 90%;
        text-align: center;
    `;
    
    notification.innerHTML = `
        <h3 style="color: #6366f1; margin-bottom: 15px;">Resume Not Found</h3>
        <p>Your resume file is not found at: <code>assets/icons/resume.pdf</code></p>
        <p>Please make sure:</p>
        <ul style="text-align: left; margin: 15px 0;">
            <li>The file exists at the correct location</li>
            <li>The file is named exactly: <strong>resume.pdf</strong></li>
            <li>File permissions allow access</li>
        </ul>
        <div style="margin-top: 20px;">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                OK
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    overlay.onclick = function() {
        document.body.removeChild(notification);
        document.body.removeChild(overlay);
    };
    
    document.body.appendChild(overlay);
}

function showResumeHelpMessage() {
    // Only show once per session
    if (sessionStorage.getItem('resumeHelpShown')) return;
    
    setTimeout(() => {
        const helpMessage = document.createElement('div');
        helpMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9998;
            max-width: 300px;
            animation: slideIn 0.5s ease;
        `;
        
        helpMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <i class="fas fa-info-circle" style="font-size: 20px;"></i>
                <strong>Resume Setup</strong>
            </div>
            <p style="margin: 0; font-size: 14px;">
                Place your resume as <code>resume.pdf</code> in <code>assets/icons/</code> folder
            </p>
            <button onclick="this.parentElement.remove()" 
                    style="background: transparent; border: 1px solid white; color: white; padding: 5px 10px; border-radius: 4px; margin-top: 10px; cursor: pointer; font-size: 12px;">
                Got it
            </button>
        `;
        
        document.body.appendChild(helpMessage);
        sessionStorage.setItem('resumeHelpShown', 'true');
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (helpMessage.parentElement) {
                helpMessage.remove();
            }
        }, 10000);
    }, 3000);
}

// Add this CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Update your main init function to include CV download
function init() {
    initLoader();
    initThemeToggle();
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initSkillBars();
    initTabs();
    initProjectFilter();
    initContactForm();
    initParticles();
    initChart();
    initAnimations();
    initCVDownload(); // Add this line
}