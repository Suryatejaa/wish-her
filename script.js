const mobileApp = document.getElementById("mobile-app");
const desktopBlocker = document.getElementById("desktop-blocker");
const bgVideo = document.getElementById("bg-video");
const wishPanel = document.getElementById("wish-panel");
const confessionPanel = document.getElementById("confession-panel");
const heartButton = document.getElementById("heart-button");
const holdRing = document.getElementById("hold-ring");
const holdText = document.getElementById("hold-text");
const wishText = document.getElementById("wish-text");
const nextBtn = document.getElementById("next-btn");
const slider = document.getElementById("seal-slider");
const seal = document.getElementById("seal");
const confessionCard = document.getElementById("confession-card");

const HOLD_MS = 2000;
const VIDEO_PLAYBACK_RATE = 0.5;
let holdStart = 0;
let holdTimer = null;
let progressTimer = null;
let unlocked = false;

const birthdayLine =
  "Happy Birthday, beautiful. May your day sparkle like your eyes, and may every year bring you the joy you give the world.";

function applySlowMotionVideo() {
  if (!bgVideo) {
    return;
  }

  bgVideo.defaultPlaybackRate = VIDEO_PLAYBACK_RATE;
  bgVideo.playbackRate = VIDEO_PLAYBACK_RATE;
}

function applyMobileState() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  mobileApp.setAttribute("aria-hidden", String(!isMobile));
  desktopBlocker.style.display = isMobile ? "none" : "grid";
  mobileApp.style.display = isMobile ? "block" : "none";
}

function setRingProgress(value) {
  const pct = Math.max(0, Math.min(100, value));
  holdRing.style.setProperty("--progress", `${pct}%`);
}

function startHold() {
  if (unlocked || holdTimer) {
    return;
  }

  holdStart = Date.now();
  holdText.textContent = "Keep holding...";

  progressTimer = setInterval(() => {
    const elapsed = Date.now() - holdStart;
    const progress = (elapsed / HOLD_MS) * 100;
    setRingProgress(progress);
  }, 16);

  holdTimer = setTimeout(() => {
    unlocked = true;
    clearInterval(progressTimer);
    holdTimer = null;
    progressTimer = null;
    setRingProgress(100);
    revealWish();
  }, HOLD_MS);
}

function stopHold() {
  if (unlocked) {
    return;
  }

  clearTimeout(holdTimer);
  clearInterval(progressTimer);
  holdTimer = null;
  progressTimer = null;
  setRingProgress(0);
  holdText.textContent = "Press and hold for 2 seconds";
}

function typeWish(line) {
  let i = 0;
  const t = setInterval(() => {
    wishText.textContent = line.slice(0, i);
    i += 1;
    if (i > line.length) {
      clearInterval(t);
      nextBtn.classList.remove("hidden");
      holdText.textContent = "Your wish is open";
    }
  }, 36);
}

function popSparks() {
  const rect = heartButton.getBoundingClientRect();
  const emojis = ["✨", "💖", "🎉", "🌸", "💫"];

  for (let i = 0; i < 24; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    spark.style.left = `${rect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top + rect.height / 2}px`;
    spark.style.setProperty("--x", `${(Math.random() - 0.5) * 220}px`);
    spark.style.setProperty("--y", `${(Math.random() - 0.7) * 300}px`);
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1200);
  }
}

function revealWish() {
  popSparks();
  typeWish(birthdayLine);
}

function goConfession() {
  wishPanel.classList.remove("active");
  confessionPanel.classList.add("active");
}

heartButton.addEventListener("pointerdown", startHold);
heartButton.addEventListener("pointerup", stopHold);
heartButton.addEventListener("pointerleave", stopHold);
heartButton.addEventListener("pointercancel", stopHold);
nextBtn.addEventListener("click", goConfession);

slider.addEventListener("input", (e) => {
  const value = Number(e.target.value);
  if (value >= 85) {
    seal.textContent = "Letter unsealed";
    confessionCard.classList.add("show");
  } else {
    seal.textContent = "Slide to unseal";
    confessionCard.classList.remove("show");
  }
});

window.addEventListener("resize", applyMobileState);
bgVideo?.addEventListener("loadedmetadata", applySlowMotionVideo);
applyMobileState();
applySlowMotionVideo();
setRingProgress(0);
