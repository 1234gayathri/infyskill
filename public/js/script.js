(function() {
const TOKEN_KEY = 'infyskill_token';
const USER_KEY = 'infyskill_user';

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem(TOKEN_KEY);
    const navbarMenu = document.querySelector('.navbar-menu');
    const currentPath = window.location.pathname;

    if (navbarMenu) {
        let authItem = document.getElementById('authNavItem');
        if (!authItem) {
            authItem = document.createElement('li');
            authItem.id = 'authNavItem';
            navbarMenu.appendChild(authItem);
        }

        let authLink = authItem.querySelector('a');
        if (!authLink) {
            authLink = document.createElement('a');
            authLink.className = 'nav-auth-link';
            authItem.appendChild(authLink);
        }

        if (token) {
            authLink.textContent = 'Dashboard';
            authLink.href = 'dashboard.html';
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }

    const handleProtectedPage = async () => {
        if (currentPath.endsWith('create-resume.html')) {
            if (!token) {
                window.location.href = 'login.html';
                return;
            }

            try {
                const response = await fetch('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
                window.location.href = 'login.html';
            }
        }
    };

    handleProtectedPage();

    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navbarMenuElement = document.querySelector('.navbar-menu');

    if (mobileMenuBtn && navbarMenuElement) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navbarMenuElement.classList.toggle('active');
        });
    }

    document.querySelectorAll('.navbar-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn && navbarMenuElement) {
                mobileMenuBtn.classList.remove('active');
                navbarMenuElement.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('.dropdown > a').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.getAttribute('data-suffix') || '';
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.floor(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + suffix;
                }
            };

            updateCount();

        });
    };

    const gsapInstance = window.gsap || null;
    const scrollTrigger = window.ScrollTrigger || null;

    if (gsapInstance) {
        if (scrollTrigger) {
            gsapInstance.registerPlugin(scrollTrigger);
        }

        gsapInstance.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsapInstance.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        gsapInstance.from('.hero-buttons', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.6
        });

        gsapInstance.from('.hero-image', {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.9
        });

        gsapInstance.utils.toArray('section').forEach(section => {
            gsapInstance.from(section, {
                scrollTrigger: scrollTrigger
                    ? {
                          trigger: section,
                          start: 'top 80%',
                          toggleActions: 'play none none none'
                      }
                    : undefined,
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        gsapInstance.utils.toArray('.course-card, .testimonial-card, .student-card, .cert-card, .gallery-item, .team-card, .workshop-card, .past-workshop-card, .webinar-card, .past-webinar-card, .project-card, .reason-card, .position-card, .info-card').forEach(card => {
            gsapInstance.from(card, {
                scrollTrigger: scrollTrigger
                    ? {
                          trigger: card,
                          start: 'top 80%',
                          toggleActions: 'play none none none'
                      }
                    : undefined,
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    const filterButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    gsap.from(card, {
                        y: 30,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const certificateForm = document.getElementById('certificateForm');
    const verificationResult = document.getElementById('verificationResult');
    const invalidResult = document.getElementById('invalidResult');

    if (certificateForm) {
        certificateForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const certificateId = document.getElementById('certificateId').value;

            if (certificateId.trim() !== '' && certificateId.length >= 5) {
                document.getElementById('resultId').textContent = 'INFY-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
                document.getElementById('resultName').textContent = '';
                document.getElementById('resultCourse').textContent = '';
                document.getElementById('resultDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                verificationResult.style.display = 'block';
                invalidResult.style.display = 'none';

                verificationResult.scrollIntoView({ behavior: 'smooth' });
            } else {
                verificationResult.style.display = 'none';
                invalidResult.style.display = 'block';

                invalidResult.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const careerForm = document.getElementById('careerForm');
    const applicationSuccess = document.getElementById('applicationSuccess');

    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            careerForm.style.display = 'none';
            applicationSuccess.style.display = 'block';
        });
    }

    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
        });
    }

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });

            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 80%',
            onEnter: animateCounters
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
})();

