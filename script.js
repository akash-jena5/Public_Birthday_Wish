/* Personalize the content in this object. */
const CONFIG = {
  name: "Rasmita",
  age: 26,
  sender: "Akash",
  reasons: [
    "You make ordinary days feel special ✨",
    "You believed in me when I didn't 💗",
    "Your smile can turn my whole day around 😊",
    "You make even the smallest moments memorable 🌷",
    "Life feels warmer and brighter with you in it 💖"
  ],
  memories: [
    { caption: "First family meet", image: "memory-1.jpg" },
    { caption: "One of my favourite days", image: "memory-2.jpg" },
    { caption: "A memory I keep close", image: "memory-3.jpg" },
    { caption: "Us, being us 💗", image: "memory-4.jpg" },
    { caption: "More memories to come…", image: "memory-5.jpg" }
  ],
  letter: "Every year I try to find the perfect words and every year I fall short, so here is the honest version. You make my most ordinary days feel worth remembering. Thank you for being you, for your smile, your kindness, and all the little things that make life brighter. I hope this year gives you as much happiness as you bring into my life. Happy birthday, my favourite person… 🎂"
};

const scenes = [...document.querySelectorAll(".scene")];
let currentScene = 0;
let popped = new Set();
let memoryIndex = 0;
let audioContext = null;
let musicTimer = null;
let musicOn = false;
let heartLeafTimer = null;

function setScene(index) {
  currentScene = Math.max(0, Math.min(scenes.length - 1, index));
  scenes.forEach((scene, i) => scene.classList.toggle("active", i === currentScene));
  document.getElementById("backBtn").style.visibility = currentScene === 0 ? "hidden" : "visible";
  if (currentScene === 1) createHeartTree();
  if (currentScene === 2) resetCake();
  if (currentScene === 3) renderBalloons();
  if (currentScene === 4) renderMemory();
  if (currentScene === 6) typeLetter();
  if (currentScene === 7) playKittenVideo();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function goNext() { setScene(currentScene + 1); }
document.querySelectorAll("[data-next]").forEach(el => el.addEventListener("click", goNext));
document.getElementById("backBtn").addEventListener("click", () => setScene(currentScene - 1));

document.querySelectorAll("[data-name]").forEach(el => el.textContent = CONFIG.name);
document.querySelectorAll("[data-age]").forEach(el => el.textContent = CONFIG.age);
document.querySelectorAll("[data-sender]").forEach(el => el.textContent = CONFIG.sender);
document.querySelectorAll("[data-initial]").forEach(el => el.textContent = CONFIG.name.charAt(0).toUpperCase());
document.getElementById("letterBody").textContent = CONFIG.letter;

function addStars() {
  const ambient = document.getElementById("ambient");
  for (let i = 0; i < 55; i++) {
    const star = document.createElement("i");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;
    ambient.appendChild(star);
  }
}
addStars();

const heartBalloon = document.getElementById("heartBalloon");
const arrow = document.getElementById("arrow");
let shot = false;
function shootArrow() {
  if (shot) return;
  shot = true;
  const balloonRect = heartBalloon.getBoundingClientRect();
  const bowArea = document.querySelector(".bow-area");
  const bowRect = bowArea.getBoundingClientRect();
  const arrowRect = arrow.getBoundingClientRect();
  // Animate the arrow's centre from the bow to the centre of the visible heart.
  const startX = bowRect.left + bowRect.width * .47;
  const startY = bowRect.top + bowRect.height * .53;
  const targetX = balloonRect.left + balloonRect.width * .50;
  const targetY = balloonRect.top + balloonRect.height * .48;
  const deltaX = targetX - startX;
  const deltaY = targetY - startY;
  arrow.style.left = `${startX - bowRect.left - arrow.offsetWidth / 2}px`;
  arrow.style.top = `${startY - bowRect.top - arrow.offsetHeight / 2}px`;
  arrow.style.animation = "none";
  arrow.animate([
    { transform: "translate(0px, 0px) rotate(-48deg) scale(1)", opacity: 1 },
    { transform: `translate(${deltaX}px, ${deltaY}px) rotate(-48deg) scale(.9)`, opacity: 1, offset: .86 },
    { transform: `translate(${deltaX}px, ${deltaY}px) rotate(-48deg) scale(.75)`, opacity: 0 }
  ], { duration: 820, easing: "cubic-bezier(.18,.72,.24,1)", fill: "forwards" });
  heartBalloon.style.animation = "none";
  setTimeout(() => heartBalloon.classList.add("heart-hit"), 700);
  setTimeout(() => {
    heartBalloon.style.transform = "scale(.05) rotate(8deg)";
    heartBalloon.style.opacity = "0";
    heartBalloon.querySelector(".heart-secret").style.opacity = "1";
    confettiBurst(targetX, targetY);
  }, 850);
  setTimeout(() => setScene(1), 1700);
}
arrow.addEventListener("click", shootArrow);
heartBalloon.addEventListener("click", shootArrow);
heartBalloon.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") shootArrow(); });

function createHeartTree() {
  const tree = document.getElementById("heartTree");
  if (tree.dataset.created) return;
  tree.dataset.created = "1";
  const hearts = ["💗","💖","💕","💘","💝","🩷","💛","❤️"];
  // Plot hearts inside a mathematical heart silhouette, then let loose leaves fall.
  const points = [];
  for (let y = -1.05; y <= 1.05; y += .115) {
    for (let x = -1.15; x <= 1.15; x += .12) {
      const a = x*x + y*y - 1;
      if (a*a*a - x*x*y*y*y <= 0) points.push({x, y});
    }
  }
  points.sort(() => Math.random() - .5);
  points.slice(0, 145).forEach((point, i) => {
    const h = document.createElement("span");
    h.className = "tree-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = `${50 + point.x * 37}%`;
    h.style.top = `${42 - point.y * 34}%`;
    h.style.setProperty("--dur", `${2.4 + Math.random() * 2.8}s`);
    h.style.setProperty("--rot", `${Math.random() * 30 - 15}deg`);
    h.style.animationDelay = `${Math.random() * 2}s`;
    tree.appendChild(h);
  });
  const stem = document.createElement("div");
  stem.className = "tree-stem";
  tree.appendChild(stem);
  const dropLeaf = () => {
    if (!document.getElementById("scene1").classList.contains("active")) return;
    const leaf = document.createElement("span");
    leaf.className = "falling-heart";
    leaf.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    leaf.style.left = `${28 + Math.random() * 44}%`;
    leaf.style.setProperty("--fall-duration", `${2.8 + Math.random() * 2.5}s`);
    leaf.style.setProperty("--drift", `${(Math.random() - .5) * 180}px`);
    tree.appendChild(leaf);
    setTimeout(() => leaf.remove(), 5600);
  };
  if (!heartLeafTimer) heartLeafTimer = setInterval(dropLeaf, 360);
}

const balloonColors = ["#f6d65f","#a68aff","#ff866e","#ed75ac","#43c9c0"];
function renderBalloons() {
  const field = document.getElementById("balloonField");
  const list = document.getElementById("reasonList");
  if (!field.dataset.ready) {
    CONFIG.reasons.forEach((reason, i) => {
      const b = document.createElement("button");
      b.className = "balloon";
      b.style.setProperty("--balloon", balloonColors[i]);
      b.style.setProperty("--dur", `${2.2 + Math.random() * 1.6}s`);
      b.style.left = `${i + Math.random() * 76}%`;
      b.style.top = `${i + Math.random() * 46}%`;
      b.style.animationDelay = `${Math.random() * -2}s`;
      b.setAttribute("aria-label", `Pop balloon ${i + 1}`);
      b.addEventListener("click", () => popBalloon(i, b));
      field.appendChild(b);
      const card = document.createElement("article");
      card.className = "reason-card hidden";
      card.style.setProperty("--accent", ["#f38bb7","#3acac0","#ffc04f","#a68aff","#ff866e"][i]);
      card.innerHTML = `<span class="reason-label">REASON NO. ${i + 1} 💌</span><p></p>`;
      card.querySelector("p").textContent = reason;
      list.appendChild(card);
    });
    field.dataset.ready = "1";
  }
  updateBalloonProgress();
}
function popBalloon(i, balloon) {
  if (popped.has(i)) return;
  popped.add(i);
  balloon.classList.add("popped");
  const rect = balloon.getBoundingClientRect();
  confettiBurst(rect.left + rect.width/2, rect.top + rect.height/2);
  const card = document.querySelectorAll(".reason-card")[i];
  card.classList.remove("hidden");
  updateBalloonProgress();
}
function updateBalloonProgress() {
  document.getElementById("balloonProgress").textContent = `${popped.size} of 5 popped`;
  document.getElementById("balloonContinue").classList.toggle("hidden", popped.size !== 5);
}

function renderMemory() {
  const track = document.getElementById("memoryTrack");
  if (!track.dataset.built) {
    track.innerHTML = "";
    CONFIG.memories.forEach((memory, i) => {
      const card = document.createElement("article");
      card.className = "polaroid";
      card.style.setProperty("--hang-y", [`0px`, `18px`, `5px`, `24px`, `9px`][i % 5]);
      card.style.setProperty("--tilt", ["-2deg", "2deg", "-1deg", "2.5deg", "-2.5deg"][i % 5]);
      card.style.setProperty("--sway", `${4.1 + (i % 3) * .65}s`);
      card.style.setProperty("--delay", `${i * -.7}s`);
      const photo = document.createElement("div");
      photo.className = "photo-placeholder";
      const img = document.createElement("img");
      img.src = memory.image;
      img.alt = memory.caption;
      img.loading = "lazy";
      img.onerror = () => {
        photo.innerHTML = `<span>YOUR PHOTO ${i + 1}</span><small>Add ${memory.image} to the project folder</small>`;
      };
      photo.appendChild(img);
      const caption = document.createElement("p");
      caption.className = "photo-caption";
      caption.textContent = memory.caption;
      card.append(photo, caption);
      card.addEventListener("click", () => { memoryIndex = i; updateMemorySelection(true); });
      track.appendChild(card);
    });
    track.dataset.built = "1";
  }
  const dots = document.getElementById("memoryDots");
  dots.innerHTML = "";
  CONFIG.memories.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `dot ${i === memoryIndex ? "active" : ""}`;
    dot.setAttribute("aria-label", `Show memory ${i + 1}`);
    dot.addEventListener("click", () => { memoryIndex = i; updateMemorySelection(true); });
    dots.appendChild(dot);
  });
  updateMemorySelection(false);
}
function updateMemorySelection(shouldScroll) {
  const track = document.getElementById("memoryTrack");
  const cards = [...track.querySelectorAll(".polaroid")];
  cards.forEach((card, i) => card.classList.toggle("active-card", i === memoryIndex));
  [...document.querySelectorAll("#memoryDots .dot")].forEach((dot, i) => dot.classList.toggle("active", i === memoryIndex));
  if (shouldScroll && cards[memoryIndex]) {
    const card = cards[memoryIndex];
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  }
}
function changeMemory(direction) {
  memoryIndex = (memoryIndex + direction + CONFIG.memories.length) % CONFIG.memories.length;
  renderMemory();
}
document.getElementById("prevMemory").addEventListener("click", () => changeMemory(-1));
document.getElementById("nextMemory").addEventListener("click", () => changeMemory(1));
const memoryTrack = document.getElementById("memoryTrack");
let memoryScrollTimer = null;
memoryTrack.addEventListener("scroll", () => {
  clearTimeout(memoryScrollTimer);
  memoryScrollTimer = setTimeout(() => {
    const cards = [...memoryTrack.querySelectorAll(".polaroid")];
    if (!cards.length) return;
    const center = memoryTrack.scrollLeft + memoryTrack.clientWidth / 2;
    let nearest = 0, distance = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < distance) { distance = d; nearest = i; }
    });
    memoryIndex = nearest;
    updateMemorySelection(false);
  }, 90);
}, {passive:true});

document.getElementById("envelope").addEventListener("click", () => {
  const envelope = document.getElementById("envelope");
  envelope.classList.add("opening");
  setTimeout(() => setScene(6), 700);
});
function typeLetter() {
  const target = document.getElementById("letterBody");
  if (target.dataset.typed) return;
  target.dataset.typed = "1";
  const full = CONFIG.letter;
  target.textContent = "";
  let i = 0;
  const step = () => {
    target.textContent = full.slice(0, i);
    i += 4;
    if (i <= full.length) setTimeout(step, 14);
    else target.textContent = full;
  };
  step();
}
function resetCake() {
  const candle = document.getElementById("candle");
  const cake = document.querySelector(".cake");
  candle.classList.remove("out");
  cake.classList.remove("build-again");
  void cake.offsetWidth;
  cake.classList.add("build-again");
  document.getElementById("celebrationBurst").innerHTML = "";
  document.getElementById("blowBtn").classList.remove("hidden");
  document.getElementById("cakeContinue").classList.add("hidden");
  document.getElementById("cakeHint").textContent = "Tap the button to make a wish";
}
document.getElementById("blowBtn").addEventListener("click", () => {
  const candle = document.getElementById("candle");
  candle.classList.add("out");
  document.getElementById("blowBtn").classList.add("hidden");
  document.getElementById("cakeHint").textContent = "Wish made! May your year be full of magic ✨";
  const burst = document.getElementById("celebrationBurst");
  burst.innerHTML = "";
  // Smoke rises first; paper confetti pops just behind it.
  setTimeout(() => {
    const rect = candle.getBoundingClientRect();
    confettiBurst(rect.left + rect.width / 2, rect.top - 8);
    for (let i = 0; i < 42; i++) {
      const paper = document.createElement("i");
      paper.className = "party-paper";
      paper.style.left = `${25 + Math.random() * 50}%`;
      paper.style.top = `${12 + Math.random() * 38}%`;
      paper.style.setProperty("--dx", `${(Math.random() - .5) * 360}px`);
      paper.style.setProperty("--dy", `${80 + Math.random() * 260}px`);
      paper.style.setProperty("--spin", `${Math.random() * 900 - 450}deg`);
      paper.style.setProperty("--paper-color", ["#ff72a6", "#ffc04f", "#fff1d9", "#a78bfa", "#42d3c7", "#ff866e"][i % 6]);
      burst.appendChild(paper);
    }
    burst.classList.add("celebrate");
  }, 450);
  setTimeout(() => document.getElementById("cakeContinue").classList.remove("hidden"), 750);
});

function confettiBurst(x, y) {
  const colors = ["#ff72a6","#ffc04f","#fff1d9","#a78bfa","#42d3c7","#ff866e"];
  for (let i = 0; i < 24; i++) {
    const bit = document.createElement("span");
    bit.style.cssText = `position:fixed;z-index:99;left:${x}px;top:${y}px;width:${5+Math.random()*6}px;height:${5+Math.random()*8}px;background:${colors[i%colors.length]};border-radius:${Math.random()>.5?"50%":"2px"};pointer-events:none;`;
    document.body.appendChild(bit);
    const dx = (Math.random() - .5) * 260, dy = (Math.random() - .65) * 240;
    bit.animate([{transform:"translate(0,0) rotate(0deg)",opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*600}deg)`,opacity:0}], {duration:650+Math.random()*650,easing:"cubic-bezier(.1,.7,.2,1)"}).onfinish = () => bit.remove();
  }
}
document.getElementById("replayBtn").addEventListener("click", () => {
  popped = new Set(); memoryIndex = 0; shot = false;
  const track = document.getElementById("memoryTrack");
  if (track) track.scrollTo({ left: 0, behavior: "auto" });
  arrow.classList.remove("flying");
  arrow.getAnimations().forEach(animation => animation.cancel());
  arrow.style.left = "";
  arrow.style.top = "";
  arrow.style.transform = "";
  arrow.style.animation = "";
  heartBalloon.style.opacity = "1";
  heartBalloon.style.transform = "";
  heartBalloon.style.animation = "";
  heartBalloon.classList.remove("heart-hit");
  heartBalloon.querySelector(".heart-secret").style.opacity = "0";
  document.querySelectorAll(".reason-card").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".balloon").forEach(el => el.classList.remove("popped"));
  document.getElementById("balloonContinue").classList.add("hidden");
  document.getElementById("heartTree").innerHTML = "";
  document.getElementById("heartTree").dataset.created = "";
  document.getElementById("heartTree").dataset.falling = "";
  if (heartLeafTimer) clearInterval(heartLeafTimer);
  heartLeafTimer = null;
  document.getElementById("kittenVideo").classList.remove("video-playing");
  setScene(0);
});

function playKittenVideo() {
  const video = document.getElementById("kittenVideo");
  const caption = document.getElementById("videoCaption");
  video.classList.remove("video-playing");
  void video.offsetWidth;
  video.classList.add("video-playing");
  const lines = [
    "Psst… the birthday kittens are coming! 🐾",
    "We brought you a cake… 🎂",
    "And a little gift, just for you! 🎁",
    "Happy Birthday, Rasmita! We love you! 💗"
  ];
  lines.forEach((line, i) => setTimeout(() => {
    if (currentScene === 7) caption.textContent = line;
  }, i * 1900));
}

/* Royalty-free generated ambient music (no external audio file needed).
   Browser audio starts only after the user taps the sound button. */
function startMusic() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return false;
  audioContext = audioContext || new AudioCtx();
  if (audioContext.state === "suspended") audioContext.resume();
  const master = audioContext.createGain();
  master.gain.value = 0.035;
  master.connect(audioContext.destination);
  const notes = [261.63,329.63,392,329.63,293.66,349.23,440,349.23];
  let n = 0;
  const playNote = () => {
    if (!musicOn || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[n % notes.length];
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + .12);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);
    osc.connect(gain); gain.connect(master);
    osc.start(); osc.stop(audioContext.currentTime + 1.25);
    n++;
  };
  playNote();
  musicTimer = setInterval(playNote, 850);
  return true;
}
function stopMusic() {
  musicOn = false;
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
  if (audioContext && audioContext.state === "running") audioContext.suspend();
  document.getElementById("soundBtn").textContent = "🔇";
}
document.getElementById("soundBtn").addEventListener("click", () => {
  if (musicOn) { stopMusic(); return; }
  musicOn = true;
  if (startMusic()) document.getElementById("soundBtn").textContent = "🎵";
  else { musicOn = false; alert("Background audio isn't supported in this browser."); }
});

/* Tap anywhere on the birthday reveal to continue, matching the reference. */
document.getElementById("scene1").addEventListener("click", e => {
  if (e.target.closest("button")) return;
  goNext();
});
