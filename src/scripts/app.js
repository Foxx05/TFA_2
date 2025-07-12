"use strict";
//Curseur
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("mouseover", (e) => {
  if (e.target.closest("a, button, input, textarea, select, [role='button']")) {
    cursor.classList.add("cursor-hover");
  } else {
    cursor.classList.remove("cursor-hover");
  }
});


//Anim fond
const canvas = document.getElementById("particules_bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particules
let particles = [];
const numParticles = 100;
const maxDistance = 100;

// Coordonnées curseur
const mouse = { x: null, y: null };

// Met à jour la position du curseur lorsqu'il bouge
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Responsive
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particule
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;         // Position X aléatoire
    this.y = Math.random() * canvas.height;        // Position Y aléatoire
    this.vx = (Math.random() - 0.5) * 0.8;          // Vitesse X aléatoire
    this.vy = (Math.random() - 0.5) * 0.8;          // Vitesse Y aléatoire
    this.radius = 3.5;                              // Rayon du point
    this.color = "#ffab40";                         // Couleur du point
  }

  // MAJ position particule
  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Changer direction si contact avec bord
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  // Affichage particule
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Connecte 2 particules si proches
function connectParticles(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < maxDistance) {
    const opacity = 1 - dist / maxDistance;
    ctx.strokeStyle = hexToRgba(p1.color, opacity); // Même couleur que la particule
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

// Connection partiucules - curseur
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

// Convertit un code hexadécimal en rgba avec opacité
function hexToRgba(hex, opacity) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Boucle d'animation principale
function animate() {
  // Efface l'écran à chaque frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Met à jour et dessine chaque particule
  for (let p of particles) {
    p.move();
    p.draw();
  }

  // Connecte toutes les particules si proches
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      connectParticles(particles[i], particles[j]);
    }
  }

  // Connecte les particules proches du curseur
  if (mouse.x && mouse.y) {
    for (let p of particles) {
      connectToMouse(p);
    }
  }

  // Redemande une nouvelle frame
  requestAnimationFrame(animate);
}

// Création des particules initiales
for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

// Lancement de l'animation
animate();

//Anim page acceuil
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