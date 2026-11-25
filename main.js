
/* =========================================
   LEAGUEDOM.
   Main JavaScript
========================================= */

"use strict";


/* =========================================
   1. AUTOMATIC COPYRIGHT YEAR
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   2. SMOOTH NAVIGATION
========================================= */

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"], .logo[href^="#"], .footer-logo[href^="#"]'
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        let targetSection;

        try {
            targetSection = document.querySelector(targetId);
        } catch (error) {
            return;
        }

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: reducedMotion.matches ? "auto" : "smooth",
                block: "start"
            });
        }

    });

});


/* =========================================
   3. HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".site-header");

if (header) {

    const updateHeader = () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

}


/* =========================================
   4. PILLAR CARD INTERACTIONS
========================================= */

const pillarCards = document.querySelectorAll(".pillar-card");

pillarCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("active");
    });

});


/* =========================================
   5. SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .philosophy-content, .pillar-card, .closing-content"
);

if (reducedMotion.matches) {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

} else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================
   6. ACCESSIBILITY: REDUCED MOTION
========================================= */

if (reducedMotion.matches) {

    document.documentElement.classList.add("reduced-motion");

}


/* =========================================
   7. INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.info("LEAGUEDOM. successfully initialized.");

});
