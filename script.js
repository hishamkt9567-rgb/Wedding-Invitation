"use strict";

const opening = document.getElementById("opening");
const website = document.getElementById("website");
const openButton = document.getElementById("openButton");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const petalsContainer = document.getElementById("petalsContainer");

// Left Side Navigation Elements
const menuToggle = document.getElementById("menuToggle");
const sideNav = document.getElementById("sideNav");
const menuClose = document.getElementById("menuClose");
const navBackdrop = document.getElementById("navBackdrop");
const navLinks = document.querySelectorAll(".nav-link");

let opened = false;
music.volume = 0.65;

/* Side Navigation Controller */
function openNav() {
  sideNav.classList.add("active");
  navBackdrop.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeNav() {
  sideNav.classList.remove("active");
  navBackdrop.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", openNav);
menuClose.addEventListener("click", closeNav);
navBackdrop.addEventListener("click", closeNav);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

/* Floating Petals Generator */
function createPetals() {
  const count = 16;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      if (!opened) return;
      const petal = document.createElement("div");
      petal.className = "petal";
      
      const size = Math.random() * 10 + 10;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${Math.random() * 4 + 5}s`;
      petal.style.animationDelay = `${Math.random() * 2}s`;
      
      petalsContainer.appendChild(petal);

      // Continuously regenerate
      petal.addEventListener("animationend", () => {
        petal.remove();
        if (opened) createSinglePetal();
      });
    }, i * 350);
  }
}

function createSinglePetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  const size = Math.random() * 10 + 10;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.animationDuration = `${Math.random() * 4 + 6}s`;
  
  petalsContainer.appendChild(petal);
  petal.addEventListener("animationend", () => {
    petal.remove();
    if (opened) createSinglePetal();
  });
}

/* Background Music Controls */
function updateMusicButton() {
  const playing = !music.paused;
  musicButton.textContent = playing ? "♫" : "♪";
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}

function playMusic() {
  music.play()
    .then(updateMusicButton)
    .catch(error => {
      console.warn("Autoplay audio blocked or unavailable:", error);
      updateMusicButton();
    });
}

/* Opening Animation */
openButton.addEventListener("click", () => {
  if (opened) return;

  opened = true;
  openButton.disabled = true;
  website.hidden = false;
  window.scrollTo(0, 0);

  musicButton.hidden = false;
  playMusic();

  opening.classList.add("open");
  createPetals();

  setTimeout(() => {
    opening.hidden = true;
    menuToggle.hidden = false; // Reveal left menu toggle button once opened
    setupReveal();
    setupScratch();
  }, 1900);
});

musicButton.addEventListener("click", () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    updateMusicButton();
  }
});

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
music.addEventListener("error", () => {
  console.warn("Check that music.mp3 is uploaded beside index.html");
});

/* Countdown Timer */
const weddingTime = new Date("2026-12-27T16:00:00+05:30").getTime();

function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());

  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60
  };

  for (const [id, value] of Object.entries(values)) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, "0");
  }

  if (remaining === 0) {
    const countdownEl = document.getElementById("countdownText");
    if (countdownEl) countdownEl.textContent = "Our wedding day has arrived!";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Intersection Observer Scroll Reveal */
function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
}

/* Scratch Card Canvas */
let scratchReady = false;

function setupScratch() {
  if (scratchReady) return;
  scratchReady = true;

  const canvas = document.getElementById("scratchCanvas");
  const revealButton = document.getElementById("revealButton");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    canvas.hidden = true;
    revealButton.hidden = true;
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.scale(ratio, ratio);

  // Background scratch cover
  ctx.fillStyle = "#9dae94";
  ctx.fillRect(0, 0, width, height);

  // Ornamental inner badge shape on canvas
  ctx.fillStyle = "#dce3d5";
  ctx.beginPath();
  ctx.moveTo(width / 2, height * 0.78);
  ctx.bezierCurveTo(width * 0.05, height * 0.48, width * 0.17, height * 0.12, width / 2, height * 0.33);
  ctx.bezierCurveTo(width * 0.83, height * 0.12, width * 0.95, height * 0.48, width / 2, height * 0.78);
  ctx.fill();

  ctx.fillStyle = "#3f5037";
  ctx.textAlign = "center";
  ctx.font = "bold 16px Georgia, serif";
  ctx.fillText("SCRATCH HERE", width / 2, height * 0.52);

  let drawing = false;
  let previous = null;
  let strokes = 0;
  let revealed = false;

  function point(event) {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  }

  function scratch(p) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    if (previous) {
      ctx.moveTo(previous.x, previous.y);
    } else {
      ctx.moveTo(p.x, p.y);
    }

    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    previous = p;
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    canvas.style.transition = "opacity .7s ease";
    canvas.style.opacity = "0";
    canvas.style.pointerEvents = "none";
    revealButton.hidden = true;
  }

  function check() {
    if (revealed) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 80) {
      total++;
      if (pixels[i] < 128) cleared++;
    }

    if (total && cleared / total > 0.4) {
      reveal();
    }
  }

  canvas.addEventListener("pointerdown", event => {
    if (revealed) return;
    drawing = true;
    previous = null;
    canvas.setPointerCapture(event.pointerId);
    scratch(point(event));
  });

  canvas.addEventListener("pointermove", event => {
    if (!drawing || revealed) return;
    scratch(point(event));
    if (++strokes % 10 === 0) check();
  });

  function finish() {
    if (!drawing) return;
    drawing = false;
    previous = null;
    check();
  }

  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);
  revealButton.addEventListener("click", reveal);
}

/* Add to Calendar (.ics download) */
document.getElementById("calendarButton").addEventListener("click", () => {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:hisham-aneena-20261227@example.invalid",
    "DTSTAMP:20261018T000000Z",
    "DTSTART:20261227T103000Z",
    "DTEND:20261227T143000Z",
    "SUMMARY:Muhammed Hisham and Aneena Jubin Wedding",
    "LOCATION:BUM Hall, Pookkottur, Malappuram, Kerala",
    "DESCRIPTION:Wedding celebration of Muhammed Hisham and Aneena Jubin",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([event], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Hisham-Aneena-Wedding.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

/* Share Invitation via Web Share or WhatsApp */
document.getElementById("shareButton").addEventListener("click", async () => {
  const text =
    "You're invited to the wedding celebration of " +
    "Muhammed Hisham & Aneena Jubin! " +
    "Sunday, 27 December 2026, " +
    "4:00 PM – 8:00 PM at BUM Hall, Pookkottur.";

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Muhammed Hisham & Aneena Jubin Wedding",
        text,
        url: window.location.href
      });
    } catch (error) {
      // User cancelled share
    }
  } else {
    window.open(
      "https://wa.me/?text=" +
      encodeURIComponent(text + "\n" + window.location.href),
      "_blank",
      "noopener"
    );
  }
});
