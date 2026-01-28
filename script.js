// script.js

document.addEventListener("DOMContentLoaded", () => {
  initSpaceBackground();
  setActiveNav();
  updateFooterYear();
  initPage();
});

/* ===== NAV + FOOTER ===== */

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}

function updateFooterYear() {
  const span = document.getElementById("footer-year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

/* ===== ROUTE: PER PAGINA ===== */

function initPage() {
  const page = document.body.dataset.page;

  switch (page) {
    case "home":
      initHome();
      break;
    case "vluchtinfo":
      initVluchtinfo();
      break;
    case "media":
      initMedia();
      break;
    case "games":
      initGames();
      break;
    case "team":
      initTeam();
      break;
    case "camera":
      initCamera();
      break;
    case "holodeck":
      initHolodeck();
      break;
    case "menu":
      initMenu();
      break;
    case "muziek-eboeken":
      initMuziekEboeken();
      break;
    case "schip":
      initSchip();
      break;
    case "wellness":
      initWellness();
      break;
    default:
      break;
  }
}

/* ===== HOME ===== */

function initHome() {
  const greetEl = document.getElementById("home-greeting");
  const clockEl = document.getElementById("home-clock");
  const progressEl = document.getElementById("home-progress");

  function updateGreeting() {
    if (!greetEl) return;
    const h = new Date().getHours();
    let text = "Welkom aan boord";
    if (h >= 5 && h < 12) text = "Goedemorgen astronaut";
    else if (h >= 12 && h < 18) text = "Goedemiddag astronaut";
    else text = "Goedenavond astronaut";
    greetEl.textContent = text;
  }

  function updateClock() {
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  let progress = 20;
  function updateProgress() {
    if (!progressEl) return;
    progress = Math.min(100, progress + 0.04);
    progressEl.style.width = progress + "%";
  }

  updateGreeting();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateGreeting, 5 * 60 * 1000);
  setInterval(updateProgress, 500);
}

/* ===== VLUCHTINFO ===== */

let flightSeconds = 3 * 60 * 60 + 14 * 60 + 26;
const routeSteps = [
  "Net buiten de baan van de aarde",
  "Zwaartekracht-slingshot langs de maan",
  "Halverwege naar Mars",
  "Dicht bij Mars' baan",
  "Naderen van Mars-orbit"
];

function initVluchtinfo() {
  const countdownEl = document.getElementById("flight-time-left");
  const speedEl = document.getElementById("flight-speed");
  const locationEl = document.getElementById("flight-location");
  const refreshBtn = document.getElementById("flight-refresh");

  if (countdownEl) {
    updateCountdown(countdownEl);
    setInterval(() => {
      flightSeconds = Math.max(0, flightSeconds - 1);
      updateCountdown(countdownEl);
    }, 1000);
  }

  if (speedEl) {
    setInterval(() => {
      const base = 28000;
      const variation = Math.floor(Math.random() * 800) - 400;
      speedEl.textContent =
        (base + variation).toLocaleString("nl-NL") + " km/u";
    }, 3000);
  }

  if (locationEl) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % routeSteps.length;
      locationEl.textContent = routeSteps[index];
    }, 10000);
  }

  if (refreshBtn && countdownEl) {
    refreshBtn.addEventListener("click", () => {
      flightSeconds = Math.max(0, flightSeconds - 60);
      updateCountdown(countdownEl);
    });
  }
}

function updateCountdown(el) {
  const h = String(Math.floor(flightSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((flightSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(flightSeconds % 60).padStart(2, "0");
  el.textContent = `${h}:${m}:${s}`;
}

/* ===== MEDIA ===== */

const mediaData = [
  { title: "Journey to Mars", type: "Film", genre: "scifi", length: "1u 45m" },
  { title: "Orbit Life – S1", type: "Serie", genre: "drama", length: "8 afl." },
  { title: "Stars for Kids", type: "Serie", genre: "kids", length: "12 afl." },
  {
    title: "Inside the Spaceship",
    type: "Docu",
    genre: "docu",
    length: "52 min"
  },
  { title: "Galaxy Battles", type: "Film", genre: "scifi", length: "2u 10m" }
];

function initMedia() {
  const list = document.getElementById("media-list");
  const select = document.getElementById("media-filter");

  if (!list) return;

  function render(genre = "all") {
    list.innerHTML = "";
    const items =
      genre === "all"
        ? mediaData
        : mediaData.filter((m) => m.genre === genre);

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.type} • ${item.length}</p>
        <p>${labelGenre(item.genre)}</p>
        <button class="btn media-play">Afspelen</button>
      `;
      list.appendChild(card);
    });

    list.querySelectorAll(".media-play").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const item =
          genre === "all" ? mediaData[index] : mediaData.filter((m) => m.genre === genre)[index];
        alert(`"${item.title}" start op jouw scherm.`);
      });
    });
  }

  function labelGenre(g) {
    switch (g) {
      case "scifi":
        return "Sciencefiction";
      case "drama":
        return "Drama";
      case "kids":
        return "Kids";
      case "docu":
        return "Documentaire";
      default:
        return g;
    }
  }

  render();

  if (select) {
    select.addEventListener("change", () => render(select.value));
  }
}

/* ===== GAMES (quiz) ===== */

const quizQuestions = [
  {
    q: "Hoe lang duurt een gemiddelde vlucht naar Mars?",
    opt: ["7–9 maanden", "3 dagen", "2 jaar"],
    correct: 0
  },
  {
    q: "Wat heb je nodig om in de ruimte te ademen?",
    opt: ["Niks, alleen een helm", "Ruimtepak of capsule", "Alleen zuurstofmasker"],
    correct: 1
  },
  {
    q: "Hoe heet onze thuisplaneet?",
    opt: ["Mars", "Aarde", "Jupiter"],
    correct: 1
  }
];

function initGames() {
  const container = document.getElementById("quiz");
  const btnStart = document.getElementById("quiz-start");
  const result = document.getElementById("quiz-result");

  if (!container || !btnStart || !result) return;

  btnStart.addEventListener("click", () => {
    container.innerHTML = "";
    result.textContent = "";

    quizQuestions.forEach((q, i) => {
      const block = document.createElement("div");
      block.className = "quiz-question";
      block.innerHTML = `<p>${i + 1}. ${q.q}</p>`;
      q.opt.forEach((option, idx) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        label.innerHTML = `
          <input type="radio" name="q${i}" value="${idx}"> ${option}
        `;
        block.appendChild(label);
      });
      container.appendChild(block);
    });

    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Controleer antwoorden";
    checkBtn.className = "btn";
    checkBtn.addEventListener("click", () => {
      let score = 0;
      quizQuestions.forEach((q, i) => {
        const chosen = container.querySelector(
          `input[name="q${i}"]:checked`
        );
        if (chosen && Number(chosen.value) === q.correct) score++;
      });
      result.textContent = `Je hebt ${score} van de ${quizQuestions.length} vragen goed.`;
    });
    container.appendChild(checkBtn);
  });
  initArcadeGame();
}

/* ===== TEAM ===== */

const teamMembers = [
  {
    name: "Robert",
    role: "UI & Interaction",
    info: "Maakt de schermopbouw en navigatie duidelijk en gebruiksvriendelijk."
  },
  {
    name: "Raman",
    role: "Development",
    info: "Bouwt de structuur van de app en koppelt de pagina's aan elkaar."
  },
  {
    name: "Jesaja",
    role: "Visual design",
    info: "Zorgt voor stijl, kleuren en een consistente look & feel."
  }
];

function initTeam() {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  teamMembers.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card team-card";
    card.innerHTML = `
      <h3>${m.name}</h3>
      <div class="team-role">${m.role}</div>
      <p class="team-extra">${m.info}</p>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("click", () => {
      const extra = card.querySelector(".team-extra");
      extra.style.display = extra.style.display === "block" ? "none" : "block";
    });
  });
}

/* ===== CAMERA ===== */

function initCamera() {
  const view = document.getElementById("camera-view");
  const insideBtn = document.getElementById("camera-inside");
  const outsideBtn = document.getElementById("camera-outside");

  if (!view) return;

  function setView(type) {
    if (type === "inside") {
      view.textContent = "Live feed: Interieur – passagiersdek en lounge.";
    } else {
      view.textContent = "Live feed: Exterieur – zicht op sterren en Mars-route.";
    }
  }

  setView("inside");

  if (insideBtn) insideBtn.addEventListener("click", () => setView("inside"));
  if (outsideBtn) outsideBtn.addEventListener("click", () => setView("outside"));
}

/* ===== HOLODECK ===== */

function initHolodeck() {
  const cards = document.querySelectorAll("[data-scenario]");
  const detail = document.getElementById("holodeck-detail");
  if (!cards.length || !detail) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.scenario;
      detail.textContent = `Scenario "${name}" wordt voorbereid. Zet je VR-headset op en volg de instructies op het scherm.`;
    });
  });
}

/* ===== MENU ===== */

function initMenu() {
  const breakfast = document.getElementById("menu-breakfast");
  const lunch = document.getElementById("menu-lunch");
  const dinner = document.getElementById("menu-dinner");

  const hour = new Date().getHours();
  let active;
  if (hour < 11) active = breakfast;
  else if (hour < 17) active = lunch;
  else active = dinner;

  if (active) active.style.borderColor = "var(--accent)";
}

/* ===== MUZIEK / E-BOOKEN ===== */

function initMuziekEboeken() {
  const tabMusic = document.getElementById("tab-music");
  const tabBooks = document.getElementById("tab-books");
  const paneMusic = document.getElementById("pane-music");
  const paneBooks = document.getElementById("pane-books");

  if (!tabMusic || !tabBooks || !paneMusic || !paneBooks) return;

  function show(which) {
    if (which === "music") {
      paneMusic.style.display = "block";
      paneBooks.style.display = "none";
      tabMusic.classList.add("active");
      tabBooks.classList.remove("active");
    } else {
      paneMusic.style.display = "none";
      paneBooks.style.display = "block";
      tabMusic.classList.remove("active");
      tabBooks.classList.add("active");
    }
  }

  tabMusic.addEventListener("click", () => show("music"));
  tabBooks.addEventListener("click", () => show("books"));

  show("music");
}

/* ===== SCHIP ===== */

function initSchip() {
  const toggles = document.querySelectorAll(".deck-toggle");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const panel = document.getElementById(targetId);
      if (!panel) return;
      const visible = panel.style.display === "block";
      panel.style.display = visible ? "none" : "block";
    });
  });
}

/* ===== WELLNESS ===== */

function initWellness() {
  const list = document.querySelectorAll("[data-activity]");
  const detail = document.getElementById("wellness-detail");
  if (!list.length || !detail) return;

  list.forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.activity;
      detail.textContent = `Je hebt "${name}" geselecteerd. Je reservering wordt aangemaakt. Meld je 5 minuten van tevoren bij de wellnessbalie.`;
    });
  });
}


/* ===== LIVE SPACE BACKGROUND (canvas) ===== */


function initSpaceBackground() {
  // Prevent double init
  if (document.getElementById("space-bg")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "space-bg";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  let w = 0;
  let h = 0;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const starsNear = [];
  const starsFar = [];
  const dust = [];

  // Gentle camera drift (makes it feel alive)
  const cam = { x: 0, y: 0, tx: 0, ty: 0 };

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildStars();
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function buildStars() {
    starsNear.length = 0;
    starsFar.length = 0;
    dust.length = 0;

    const area = w * h;
    const farCount = Math.round(area / 9000);
    const nearCount = Math.round(area / 22000);
    const dustCount = Math.round(area / 14000);

    for (let i = 0; i < farCount; i++) {
      starsFar.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.6, 1.4),
        a: rand(0.25, 0.9),
        tw: rand(0.002, 0.01),
        p: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < nearCount; i++) {
      starsNear.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(1.2, 2.6),
        a: rand(0.4, 1),
        tw: rand(0.004, 0.02),
        p: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(10, 90),
        a: rand(0.02, 0.07),
        p: rand(0, Math.PI * 2),
        sp: rand(0.0006, 0.002)
      });
    }
  }

  function drawNebula() {
    // Soft colored fog (no harsh gradients)
    // Looks different on every screen size, which feels organic.
    for (const d of dust) {
      d.p += d.sp;
      const ox = Math.cos(d.p) * 18;
      const oy = Math.sin(d.p) * 18;

      const gx = d.x + ox + cam.x * 0.2;
      const gy = d.y + oy + cam.y * 0.2;

      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, d.r);
      grad.addColorStop(0, `rgba(56,189,248,${d.a})`);
      grad.addColorStop(0.55, `rgba(139,92,246,${d.a * 0.65})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(gx, gy, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStars(list, parallax) {
    for (const s of list) {
      s.p += s.tw;
      const twinkle = (Math.sin(s.p) + 1) * 0.5; // 0..1
      const a = Math.min(1, Math.max(0, s.a * (0.6 + twinkle * 0.7)));

      const x = (s.x + cam.x * parallax + w) % w;
      const y = (s.y + cam.y * parallax + h) % h;

      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame() {
    // Smooth drift target (subtle, not annoying)
    cam.x += (cam.tx - cam.x) * 0.02;
    cam.y += (cam.ty - cam.y) * 0.02;

    ctx.clearRect(0, 0, w, h);

    // Deep space base
    const base = ctx.createRadialGradient(w * 0.5, h * 0.1, 0, w * 0.5, h * 0.1, Math.max(w, h));
    base.addColorStop(0, "rgba(17,24,39,0.85)");
    base.addColorStop(0.45, "rgba(2,6,23,0.9)");
    base.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    drawNebula();
    drawStars(starsFar, 0.08);
    drawStars(starsNear, 0.18);

    requestAnimationFrame(frame);
  }

  // Slight parallax on pointer move
  window.addEventListener("pointermove", (e) => {
    const nx = (e.clientX / Math.max(1, w)) - 0.5;
    const ny = (e.clientY / Math.max(1, h)) - 0.5;
    cam.tx = nx * 60;
    cam.ty = ny * 60;
  }, { passive: true });

  window.addEventListener("resize", resize, { passive: true });

  resize();
  frame();
}


/* ===== ARCADE GAME: ASTEROID DODGE ===== */


function initArcadeGame() {
  const canvas = document.getElementById("arcade");
  const btnStart = document.getElementById("ad-start");
  const btnLeft = document.getElementById("ad-left");
  const btnRight = document.getElementById("ad-right");

  const elScore = document.getElementById("ad-score");
  const elBest = document.getElementById("ad-best");
  const elLives = document.getElementById("ad-lives");
  const elLevel = document.getElementById("ad-level");
  const elStatus = document.getElementById("ad-status");

  if (!canvas || !btnStart || !btnLeft || !btnRight) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  // Fit canvas to container width but keep aspect
  function fitCanvas() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const targetW = Math.min(980, Math.max(320, Math.floor(rect.width)));
    const targetH = Math.floor(targetW * (500 / 900));

    canvas.style.width = targetW + "px";
    canvas.style.height = targetH + "px";
    canvas.width = Math.floor(targetW * dpr);
    canvas.height = Math.floor(targetH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  fitCanvas();
  window.addEventListener("resize", fitCanvas, { passive: true });

  // State
  const state = {
    running: false,
    t: 0,
    score: 0,
    best: Number(localStorage.getItem("ad_best") || 0),
    lives: 3,
    level: 1,
    vx: 0, // player velocity
    input: 0 // -1..1
  };

  if (elBest) elBest.textContent = state.best;

  // Player
  const player = {
    x: 0.5,
    y: 0.82,
    r: 14
  };

  const asteroids = [];
  const stars = [];
  const sparks = [];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function w() { return canvas.clientWidth; }
  function h() { return canvas.clientHeight; }

  function reset() {
    state.t = 0;
    state.score = 0;
    state.lives = 3;
    state.level = 1;
    state.vx = 0;
    state.input = 0;
    player.x = 0.5;
    asteroids.length = 0;
    stars.length = 0;
    sparks.length = 0;
    syncUI();
    setStatus("Klaar!");
  }

  function syncUI() {
    if (elScore) elScore.textContent = Math.floor(state.score);
    if (elLives) elLives.textContent = state.lives;
    if (elLevel) elLevel.textContent = state.level;
    if (elBest) elBest.textContent = state.best;
  }

  function setStatus(text) {
    if (elStatus) elStatus.textContent = text;
  }

  function spawnAsteroid() {
    const size = rand(10, 30) + state.level * 1.4;
    asteroids.push({
      x: rand(0.06, 0.94),
      y: -0.1,
      r: size,
      vy: rand(0.18, 0.32) + state.level * 0.02,
      spin: rand(-0.04, 0.04),
      a: rand(0, Math.PI * 2)
    });
  }

  function spawnStar() {
    stars.push({
      x: rand(0.08, 0.92),
      y: -0.08,
      r: rand(8, 14),
      vy: rand(0.12, 0.22),
      glow: rand(0.6, 1)
    });
  }

  function explode(px, py, intensity = 20) {
    for (let i = 0; i < intensity; i++) {
      sparks.push({
        x: px,
        y: py,
        vx: rand(-2.4, 2.4),
        vy: rand(-2.4, 2.4),
        life: rand(18, 40)
      });
    }
  }

  function circleHit(ax, ay, ar, bx, by, br) {
    const dx = ax - bx;
    const dy = ay - by;
    const rr = ar + br;
    return dx * dx + dy * dy <= rr * rr;
  }

  // Input (keys)
  const keys = { left: false, right: false };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === " " && !state.running) start();
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
  });

  // Buttons (touch friendly)
  function bindHold(btn, dir) {
    let holding = false;

    const down = (e) => {
      e.preventDefault();
      holding = true;
      state.input = dir;
      btn.classList.add("is-down");
    };

    const up = () => {
      holding = false;
      btn.classList.remove("is-down");
      // only reset if no other input is active
      state.input = 0;
    };

    btn.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", up);
  }

  bindHold(btnLeft, -1);
  bindHold(btnRight, 1);

  // Drag on canvas
  let dragging = false;
  let lastX = 0;

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    // Convert pixels to normalized input
    const sens = 0.005;
    state.input = Math.max(-1, Math.min(1, dx * sens));
  });

  const stopDrag = () => { dragging = false; state.input = 0; };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);

  // Game loop
  let raf = 0;

  function start() {
    if (state.running) return;
    state.running = true;
    btnStart.textContent = "Restart";
    setStatus("GO!");
    reset();
    state.running = true;
    loop();
  }

  btnStart.addEventListener("click", start);

  function loop() {
    if (!state.running) return;
    raf = requestAnimationFrame(loop);
    step();
    draw();
  }

  function step() {
    state.t++;

    // Difficulty progression
    if (state.score > 0 && Math.floor(state.score) % 250 === 0) {
      state.level = Math.min(12, 1 + Math.floor(state.score / 250));
    }

    // Input combine
    let input = state.input;
    if (keys.left) input -= 1;
    if (keys.right) input += 1;
    input = Math.max(-1, Math.min(1, input));

    // Movement physics (smooth)
    state.vx += input * 0.06;
    state.vx *= 0.92;
    player.x += state.vx * 0.01;
    player.x = Math.max(0.05, Math.min(0.95, player.x));

    // Spawns
    const asteroidRate = Math.max(10, 42 - state.level * 2); // frames
    const starRate = 85;

    if (state.t % asteroidRate === 0) spawnAsteroid();
    if (state.t % starRate === 0) spawnStar();

    // Move asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      a.y += a.vy;
      a.a += a.spin;

      if (a.y > 1.2) asteroids.splice(i, 1);
    }

    // Move stars
    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      s.y += s.vy;
      if (s.y > 1.2) stars.splice(i, 1);
    }

    // Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life -= 1;
      if (p.life <= 0) sparks.splice(i, 1);
    }

    // Collisions
    const px = player.x * w();
    const py = player.y * h();

    for (let i = asteroids.length - 1; i >= 0; i--) {
      const a = asteroids[i];
      const ax = a.x * w();
      const ay = a.y * h();

      if (circleHit(px, py, player.r, ax, ay, a.r)) {
        asteroids.splice(i, 1);
        explode(ax, ay, 28);
        state.lives -= 1;
        setStatus("Oeps! 💥");

        if (state.lives <= 0) {
          gameOver();
          return;
        }
      }
    }

    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      const sx = s.x * w();
      const sy = s.y * h();
      if (circleHit(px, py, player.r + 2, sx, sy, s.r)) {
        stars.splice(i, 1);
        explode(sx, sy, 18);
        state.score += 80;
        setStatus("Nice! ⭐");
      }
    }

    // Score ticks
    state.score += 1.2 + state.level * 0.08;
    syncUI();
  }

  function gameOver() {
    state.running = false;
    cancelAnimationFrame(raf);

    state.best = Math.max(state.best, Math.floor(state.score));
    localStorage.setItem("ad_best", String(state.best));
    syncUI();
    setStatus("Game over – probeer opnieuw");
  }

  function draw() {
    const W = w();
    const H = h();

    // Background
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W * 0.5, H * 0.2, 10, W * 0.5, H * 0.2, Math.max(W, H));
    g.addColorStop(0, "rgba(2,6,23,0.3)");
    g.addColorStop(1, "rgba(0,0,0,0.85)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid lines
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "rgba(56,189,248,1)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Stars (collectables)
    for (const s of stars) {
      const x = s.x * W;
      const y = s.y * H;
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.shadowColor = "rgba(56,189,248,1)";
      ctx.shadowBlur = 18 * s.glow;
      drawStar(ctx, 0, 0, 5, s.r, s.r * 0.5);
      ctx.fill();
      ctx.restore();
    }

    // Asteroids
    for (const a of asteroids) {
      const x = a.x * W;
      const y = a.y * H;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a.a);

      ctx.fillStyle = "rgba(148,163,184,0.25)";
      ctx.strokeStyle = "rgba(148,163,184,0.65)";
      ctx.lineWidth = 2;

      ctx.shadowColor = "rgba(0,0,0,1)";
      ctx.shadowBlur = 12;

      // rocky shape
      ctx.beginPath();
      const points = 10;
      for (let i = 0; i < points; i++) {
        const ang = (i / points) * Math.PI * 2;
        const wobble = 0.75 + Math.sin(a.a * 0.8 + i) * 0.18 + rand(-0.05, 0.05);
        const rr = a.r * wobble;
        const px = Math.cos(ang) * rr;
        const py = Math.sin(ang) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    // Player ship
    const px = player.x * W;
    const py = player.y * H;
    ctx.save();
    ctx.translate(px, py);

    // Glow
    ctx.shadowColor = "rgba(56,189,248,1)";
    ctx.shadowBlur = 18;

    // Ship body
    ctx.fillStyle = "rgba(224,242,254,0.95)";
    ctx.beginPath();
    ctx.moveTo(0, -player.r - 6);
    ctx.lineTo(player.r + 6, player.r + 8);
    ctx.lineTo(0, player.r - 2);
    ctx.lineTo(-player.r - 6, player.r + 8);
    ctx.closePath();
    ctx.fill();

    // cockpit
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(56,189,248,0.85)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Sparks
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "rgba(56,189,248,1)";
    for (const p of sparks) {
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Overlay when not running
    if (!state.running && state.lives <= 0) {
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "700 24px system-ui, -apple-system, Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game over", W / 2, H / 2 - 10);
      ctx.font = "400 14px system-ui, -apple-system, Segoe UI, sans-serif";
      ctx.fillStyle = "rgba(229,231,235,0.85)";
      ctx.fillText("Klik Start om opnieuw te spelen", W / 2, H / 2 + 18);
      ctx.restore();
    }
  }

  function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let cx = x;
    let cy = y;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
      rot += step;

      ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
}
