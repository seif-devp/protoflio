// ==========================================
// SEIF AMR - PORTFOLIO INTERACTION LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. THEME TOGGLE FUNCTIONALITY
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";
    html.setAttribute("data-theme", savedTheme);

    function updateThemeIcon() {
        const currentTheme = html.getAttribute("data-theme");
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

        if (themeToggle) {
            themeToggle.innerHTML = currentTheme === "dark" ? sunIcon : moonIcon;
        }
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon();
        });
    }

    // 2. HERO TYPING ANIMATION
    const typingText = document.getElementById("typingText");
    if (typingText) {
        const words = [
            "Flutter Mobile Apps",
            "Clean Architecture Systems",
            "AI & NLP Integrations",
            "Offline-First Mobile Apps"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 3. MOBILE NAVIGATION TOGGLE
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav__link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // 4. NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL
    const sections = document.querySelectorAll("section[id]");
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute("id");
            const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    }
    window.addEventListener("scroll", highlightNavOnScroll);

    // 5. SKILLS FILTERING
    const skillFilterBtns = document.querySelectorAll(".skills-filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    skillFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            skillFilterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            skillCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 6. PROJECTS FILTERING
    const projectFilterBtns = document.querySelectorAll(".project-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    projectFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            projectFilterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 7. COPY TO CLIPBOARD & TOAST NOTIFICATION
    const toast = document.getElementById("toast");
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    const copyPhoneBtn = document.getElementById("copyPhoneBtn");
    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("+201017963464").then(() => {
                showToast("📋 Phone number copied (+201017963464)");
            }).catch(() => {
                showToast("Failed to copy phone number");
            });
        });
    }

    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("seif389amr@gmail.com").then(() => {
                showToast("📧 Email address copied (seif389amr@gmail.com)");
            }).catch(() => {
                showToast("Failed to copy email");
            });
        });
    }

    // 8. CONTACT FORM VALIDATION & SUBMISSION
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const formStatus = document.getElementById("formStatus");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateInput(input, errorEl, checkFn) {
        if (!input || !errorEl) return false;
        const val = input.value.trim();
        const isValid = checkFn(val);
        if (!isValid) {
            errorEl.classList.add("active");
            input.style.borderColor = "#EF4444";
            return false;
        } else {
            errorEl.classList.remove("active");
            input.style.borderColor = "";
            return true;
        }
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const isNameValid = validateInput(nameInput, document.getElementById("nameError"), (v) => v.length > 0);
            const isEmailValid = validateInput(emailInput, document.getElementById("emailError"), (v) => emailRegex.test(v));
            const isSubjectValid = validateInput(subjectInput, document.getElementById("subjectError"), (v) => v.length > 0);
            const isMessageValid = validateInput(messageInput, document.getElementById("messageError"), (v) => v.length >= 10);

            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                const submitBtn = document.getElementById("submitBtn");
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
                    
                    formStatus.className = "form-status success";
                    formStatus.textContent = "Thank you! Your message has been sent successfully. Seif will contact you soon.";
                    contactForm.reset();

                    showToast("✉️ Message sent successfully!");
                }, 1200);
            } else {
                formStatus.className = "form-status error";
                formStatus.textContent = "Please fix the highlighted fields above.";
            }
        });
    }
});
