"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//Anim titres
if (document.querySelector('.title--big')) {
    gsap.from(".title--big", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
    });
}

if (document.querySelector('.p--center__big')) {
    gsap.from(".p--center__big", {
        delay: 0.3,
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
    });
}

if (document.querySelector('.ligne-haut')) {
    gsap.from(".ligne-haut", {
        scrollTrigger: {
            trigger: ".ligne-haut",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 1,
        xPercent: 100,
        opacity: 0,
        ease: "power3.out",
    });
}

if (document.querySelector('.ligne-bas')) {
    gsap.from(".ligne-bas", {
        scrollTrigger: {
            trigger: ".ligne-bas",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 1,
        xPercent: -100,
        opacity: 0,
        ease: "power3.out",
    });
}

//Anim Invit scroll
const scrollDown = document.querySelector('.scroll-down');

if (scrollDown) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            scrollDown.classList.add('hidden');
        } else {
            scrollDown.classList.remove('hidden');
        }
    });

    scrollDown.addEventListener('click', () => {
        const targetSection = document.querySelector('section');
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

//Menu
const menuBtn = document.querySelector(".menu__btn");
const links = document.querySelectorAll(".menu__link");
const menuElements = document.querySelectorAll(".menu--li");
const menu = document.querySelector(".menu");

function toggleMenu() {
    body.classList.toggle("menu--open");
    if (window.innerWidth < 980) {
        body.classList.toggle("no-scroll");
    }
}

if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu);
}

if (menuElements.length > 0) {
    menuElements.forEach((element) => {
        element.addEventListener("click", toggleMenu);
    });
}

if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener("click", toggleMenu);
    });
}

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const fileName = window.location.pathname.split("/").pop();
    if (fileName !== "designFiction.html" && fileName !== "pageTemoin.html") {
        if (!body.classList.contains("menu--open")) {
            if (scrollTop > lastScrollTop && scrollTop > 50) {
            menu.classList.add("menu--hidden");
            } else {
            menu.classList.remove("menu--hidden");
            }
        }
        lastScrollTop = Math.max(0, scrollTop);
    }
});

//Back to top
const backToTopButton = document.querySelector('.backToTop__cs');

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

var lastScrollTop = 0;
const body = document.body;

// Détection du nom de fichier (aide de ChatGPT pour éviter erreur console sur les autres pages)
const fileName = window.location.pathname.split("/").pop();

if (fileName !== "designFiction.html" && fileName !== "pageTemoin.html") {
    var isMenuOpen = function () {
        return body.classList.contains("menu--open");
    };

    window.addEventListener("scroll", function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!isMenuOpen()) {
            if (scrollTop > lastScrollTop) {
                body.classList.add("menu-hidden");
            } else {
                body.classList.remove("menu-hidden");
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

//Nav verticale
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-vertical a");

if (sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                document.querySelectorAll(`.nav-vertical a[href="#${entry.target.id}"]`).forEach(link => link.classList.add("active"));
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

//Force refresh ScrollTrigger après load (Aide ChatGPT)
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});


//Anim textes df - page témoin df
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.animate').forEach(elem => {
  gsap.from(elem, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});