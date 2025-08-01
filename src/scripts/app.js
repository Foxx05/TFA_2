"use strict";

//Anim page acceuil
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Définition anticipée du body (utilisé plus bas)
const body = document.body;

// Curseur
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("mouseover", (e) => {
  const isInteractive = e.target.closest("a, button, input, textarea, select, [role='button']");
  const isScrollDown = e.target.closest(".scroll-down");

  if (isInteractive || isScrollDown) {
    cursor.classList.add("cursor-hover");
  } else {
    cursor.classList.remove("cursor-hover");
  }
});

//Anim fond -- aide chatGPT
const canvas = document.getElementById("particules_bg");

if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 100;
  const maxDistance = 100;
  const mouse = { x: null, y: null };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = 3.5;
      this.color = "#ffab40";
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function connectParticles(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxDistance) {
      const opacity = 1 - dist / maxDistance;
      ctx.strokeStyle = hexToRgba(p1.color, opacity);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }

  function connectToMouse(p) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxDistance) {
      const opacity = 1 - dist / maxDistance;
      ctx.strokeStyle = hexToRgba(p.color, opacity);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }

  function hexToRgba(hex, opacity) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.move();
      p.draw();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connectParticles(particles[i], particles[j]);
      }
    }

    if (mouse.x !== null && mouse.y !== null) {
      for (let p of particles) {
        connectToMouse(p);
      }
    }

    requestAnimationFrame(animate);
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  animate();
}

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

//Anim pres projets
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
    scrollDown.classList.toggle('hidden', window.scrollY > 150);
  });

  scrollDown.addEventListener('click', () => {
    const targetSection = document.querySelector('section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
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

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
menuElements.forEach(el => el.addEventListener("click", toggleMenu));
links.forEach(link => link.addEventListener("click", toggleMenu));

// Détection du nom de fichier (aide de ChatGPT pour éviter erreur console sur les autres pages)
const fileName = window.location.pathname.split("/").pop();
let lastScrollTop = 0;

if (fileName !== "designFiction.html" && fileName !== "pageTemoin.html") {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!body.classList.contains("menu--open")) {
      menu.classList.toggle("menu--hidden", scrollTop > lastScrollTop && scrollTop > 50);
    }
    lastScrollTop = Math.max(0, scrollTop);
  });
}

//Back to top
const backToTopButton = document.querySelector('.backToTop__cs');
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

//Carousel img df
const images = document.querySelectorAll('.carousel-img');
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (images.length !== 0 && dots.length !== 0 && prevBtn && nextBtn) {
  let index = 0;

  function updateView() {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateView();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateView();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateView();
    });
  });

  updateView();
}

document.querySelectorAll('.point').forEach(point => {
  point.addEventListener('click', () => {
    const popup = point.nextElementSibling;
    popup.classList.toggle('active');
  });
});
