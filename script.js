/* 
    Valendu Academy JavaScript
    Interactivity, Animations, and Logic
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Sticky Header ---
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // --- Scroll To Top ---
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If it's a counter, start counting
                if (entry.target.querySelector('.counter')) {
                    startCounters(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Achievement Counters ---
    function startCounters(parent) {
        const counters = parent.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (counter.classList.contains('counted')) return;

            const target = +counter.getAttribute('data-target');
            const duration = 1200; // total ms for animation
            const steps = 40;
            const stepTime = duration / steps;
            let current = 0;
            const inc = target / steps;

            const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                    counter.innerText = target;
                    counter.classList.add('counted');
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, stepTime);
        });
    }


    // --- Button Ripple Effect ---
    const rippleBtns = document.querySelectorAll('.ripple');

    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-span');
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // CSS for ripple span (inline injection or adding to style.css)
    const style = document.createElement('style');
    style.innerHTML = `
        .ripple-span {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            border-radius: 50%;
            animation: ripple-animate 0.6s linear;
        }
        @keyframes ripple-animate {
            0% { width: 0px; height: 0px; opacity: 0.5; }
            100% { width: 500px; height: 500px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);


    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            // Reset errors
            nameError.innerText = '';
            emailError.innerText = '';
            messageError.innerText = '';

            // Name validation
            if (name.value.trim() === '') {
                nameError.innerText = 'Name is required';
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.innerText = 'Enter a valid email address';
                isValid = false;
            }

            // Message validation
            if (message.value.trim() === '') {
                messageError.innerText = 'Message cannot be empty';
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.innerText;

                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you! Your message has been sent to Valendu Academy.');
                    contactForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }


    // --- Dark / Light Mode Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }


    // --- Testimonial Slider ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach(c => c.classList.remove('active'));
        currentSlide = (index + testimonialCards.length) % testimonialCards.length;
        testimonialCards[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        // Auto slide every 5 seconds
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }


    // --- Motivational Quotes Slider ---
    const quotes = [
        "\"Champions Train When Others Rest.\"",
        "\"Discipline Creates Victory.\"",
        "\"Train Hard. Win Easy.\"",
        "\"Pressure Builds Legends.\""
    ];
    const quoteText = document.getElementById('quoteText');
    const quoteDots = document.getElementById('quoteDots');
    let currentQuote = 0;

    if (quoteText && quoteDots) {
        // Create dots
        quotes.forEach((_, i) => {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { currentQuote = i; showQuote(i); });
            quoteDots.appendChild(dot);
        });

        function showQuote(index) {
            quoteText.style.opacity = 0;
            setTimeout(() => {
                quoteText.innerText = quotes[index];
                quoteText.style.opacity = 1;
                quoteDots.querySelectorAll('span').forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }, 300);
        }

        setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }, 4000);
    }


    // --- Progress Bar Animation ---
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));


    // --- Player Registration Form Validation ---
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            const fields = [
                { id: 'regName', err: 'regNameError', msg: 'Full name is required' },
                { id: 'regAge', err: 'regAgeError', msg: 'Enter a valid age (5-40)' },
                { id: 'regPosition', err: 'regPositionError', msg: 'Position is required' },
                { id: 'regExperience', err: 'regExperienceError', msg: 'Select experience level' },
                { id: 'regPhone', err: 'regPhoneError', msg: 'Enter a valid phone number' },
                { id: 'regEmail', err: 'regEmailError', msg: 'Enter a valid email' },
            ];

            // Reset errors
            fields.forEach(f => document.getElementById(f.err).innerText = '');

            // Validate each field
            fields.forEach(f => {
                const el = document.getElementById(f.id);
                const val = el.value.trim();
                if (!val) {
                    document.getElementById(f.err).innerText = f.msg;
                    valid = false;
                }
            });

            // Age range check
            const age = +document.getElementById('regAge').value;
            if (age < 5 || age > 40) {
                document.getElementById('regAgeError').innerText = 'Age must be 5-40';
                valid = false;
            }

            // Email format
            const emailVal = document.getElementById('regEmail').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                document.getElementById('regEmailError').innerText = 'Enter a valid email';
                valid = false;
            }

            // Phone format
            const phone = document.getElementById('regPhone').value;
            if (!/^\d{10,15}$/.test(phone.replace(/[\s\-+]/g, ''))) {
                document.getElementById('regPhoneError').innerText = 'Enter a valid phone number';
                valid = false;
            }

            if (valid) {
                const btn = regForm.querySelector('button');
                btn.innerText = 'Registering...';
                btn.disabled = true;
                setTimeout(() => {
                    document.getElementById('regSuccess').style.display = 'block';
                    regForm.reset();
                    btn.innerText = 'Register Now';
                    btn.disabled = false;
                    setTimeout(() => {
                        document.getElementById('regSuccess').style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

});
