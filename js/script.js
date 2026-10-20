/* ============================================================
   PORTFOLYO — etkileşimler
   ============================================================ */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- yıl ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- mobil menü ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
  });
}

/* ---------- okuma çubuğu + aktif menü ---------- */
const progress = document.getElementById("progress");
const sections = Array.from(document.querySelectorAll("section[id]"));
const navAnchors = Array.from(document.querySelectorAll(".nav__links a"));

let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.width = `${Math.min(ratio * 100, 100)}%`;

    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0]?.id;
    sections.forEach((s) => {
      if (s.offsetTop <= marker) current = s.id;
    });

    navAnchors.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`);
    });

    ticking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

/* ---------- görünürlük animasyonları ---------- */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;

        if (!entry.target.style.getPropertyValue("--d")) {
          entry.target.style.setProperty("--d", `${i * 60}ms`);
        }

        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- yazı makinesi ---------- */
const typedEl = document.getElementById("typed");
const roles = ["Frontend Developer", "Web Tasarımcı", "Problem Çözücü"];

if (typedEl) {
  if (reduceMotion) {
    typedEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    const tick = () => {
      const word = roles[roleIndex];

      if (deleting) {
        charIndex -= 1;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 420);
        } else {
          setTimeout(tick, 40);
        }
      } else {
        charIndex += 1;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex >= word.length) {
          deleting = true;
          setTimeout(tick, 1900);
        } else {
          setTimeout(tick, 75);
        }
      }
    };

    setTimeout(tick, 2100);
  }
}

/* ---------- imleç ışığı (masaüstü) ---------- */
const glow = document.getElementById("glow");
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (glow && finePointer && !reduceMotion) {
  let mx = 0, my = 0, cx = 0, cy = 0, rafId = null;

  const loop = () => {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

    if (Math.abs(mx - cx) > 0.4 || Math.abs(my - cy) > 0.4) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  };

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    document.body.classList.add("glow-on");
    if (!rafId) rafId = requestAnimationFrame(loop);
  });

  document.addEventListener("mouseleave", () => document.body.classList.remove("glow-on"));
}

/* ---------- profil kartı eğimi ---------- */
const profileCard = document.getElementById("profileCard");
const profileWrap = profileCard?.parentElement;

if (profileCard && profileWrap && finePointer && !reduceMotion) {
  profileWrap.addEventListener("mousemove", (e) => {
    const rect = profileCard.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    profileCard.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
  });

  profileWrap.addEventListener("mouseleave", () => {
    profileCard.style.transform = "";
  });
}

/* ---------- yukarı çık ---------- */
const toTop = document.getElementById("toTop");

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}

/* ============================================================
   DISCORD + SPOTIFY (Lanyard API)
   ============================================================ */
const DISCORD_ID = "472412411433975808";
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;
const LOOKUP_URL = `https://japi.rest/discord/v1/user/${DISCORD_ID}`;

const dcAvatar = document.getElementById("dcAvatar");
const dcName = document.getElementById("dcName");
const dcHandle = document.getElementById("dcHandle");
const dcDot = document.getElementById("dcDot");
const dcStatusPill = document.getElementById("dcStatusPill");
const dcStatusText = document.getElementById("dcStatusText");
const np = document.getElementById("np");
const npEmbed = document.getElementById("npEmbed");
const npLabel = document.getElementById("npLabel");
const npOpen = document.getElementById("npOpen");
const dcIdle = document.getElementById("dcIdle");
const dcIdleText = document.getElementById("dcIdleText");
const dcJoin = document.getElementById("dcJoin");

const defaultAvatar = (() => {
  try {
    const index = Number((BigInt(DISCORD_ID) >> 22n) % 6n);
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  } catch {
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }
})();

/* canlı şarkı yokken çalar; track_id boş bırakırsan çalar gizlenir */
const FEATURED_TRACK = {
  id: "7uI6R3KoJWxuXjvBHIr5lW",
  label: "Kod yazarken",
};

let currentTrackKey = FEATURED_TRACK.id;

const STATUS_LABELS = {
  online: "çevrimiçi",
  idle: "boşta",
  dnd: "rahatsız etme",
  offline: "çevrimdışı",
  loading: "bağlanıyor…",
};

function setStatus(status) {
  const safe = STATUS_LABELS[status] ? status : "offline";
  if (dcDot) dcDot.dataset.status = safe;
  if (dcStatusPill) dcStatusPill.dataset.status = safe;
  if (dcStatusText) dcStatusText.textContent = STATUS_LABELS[safe];
}

function setAvatar(hash) {
  if (!dcAvatar) return;

  const src = hash
    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}?size=128`
    : defaultAvatar;

  dcAvatar.classList.remove("is-hidden");
  dcAvatar.onerror = () => {
    dcAvatar.onerror = null;
    dcAvatar.classList.add("is-hidden");
  };
  dcAvatar.src = src;
}

function renderProfile(user) {
  if (!user) return;

  const displayName = user.global_name || user.username || "Discord";
  if (dcName) dcName.textContent = displayName;
  if (dcHandle) dcHandle.textContent = user.username ? `@${user.username}` : "";

  const fallback = document.getElementById("dcAvatarFallback");
  if (fallback) fallback.textContent = displayName.slice(0, 2).toLowerCase();

  setAvatar(user.avatar);
}

// ilk yüklemede görsel zaten başarısız olduysa yedeğe düş
if (dcAvatar) {
  dcAvatar.onerror = () => {
    dcAvatar.onerror = null;
    dcAvatar.classList.add("is-hidden");
  };
  if (dcAvatar.complete && dcAvatar.naturalWidth === 0) {
    dcAvatar.classList.add("is-hidden");
  }
}

function setPlayer(trackId, label) {
  if (!np || !npEmbed) return;

  // canlı şarkı yok ve öne çıkan parça tanımlı değilse çaları gizle
  if (!trackId) {
    npEmbed.removeAttribute("src");
    np.hidden = true;
    return;
  }

  np.hidden = false;
  if (npLabel) npLabel.textContent = label;

  if (currentTrackKey !== trackId) {
    currentTrackKey = trackId;
    npEmbed.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  }

  if (npOpen) npOpen.href = `https://open.spotify.com/track/${trackId}`;
}

function showFeaturedTrack() {
  setPlayer(FEATURED_TRACK.id, FEATURED_TRACK.label);
}

function renderPresence(data) {
  setStatus(data.discord_status || "offline");

  const trackId = data.spotify?.track_id;

  if (data.listening_to_spotify && trackId) {
    setPlayer(trackId, "Spotify'da çalıyor");

    if (dcIdle) dcIdle.hidden = true;
    if (dcJoin) dcJoin.hidden = true;
    return;
  }

  showFeaturedTrack();

  if (dcIdle) dcIdle.hidden = false;

  const activity = (data.activities || []).find(
    (a) => a.type !== 4 && a.name !== "Spotify" && a.name !== "Custom Status"
  );

  if (dcIdleText) {
    dcIdleText.textContent = activity
      ? `Şu an: ${activity.name}`
      : data.discord_status === "offline"
        ? "Şu an çevrimdışı."
        : "Şu an bir aktivite yok.";
  }

  if (dcJoin) dcJoin.hidden = true;
}

function renderOfflineFallback() {
  setStatus("offline");
  showFeaturedTrack();

  if (dcIdle) dcIdle.hidden = false;
  if (dcIdleText) dcIdleText.textContent = "Canlı durum kapalı.";

  // Lanyard izlemesi için sunucuya katılma bağlantısı
  if (dcJoin) dcJoin.hidden = false;
}

async function refreshDiscord() {
  // 1) canlı durum: Lanyard
  try {
    const res = await fetch(LANYARD_URL, { cache: "no-store" });
    const json = await res.json();

    if (json.success && json.data) {
      renderProfile(json.data.discord_user);
      renderPresence(json.data);
      return;
    }
  } catch {
    /* ağ hatası — aşağıdaki yedeklere geç */
  }

  // 2) yedek: sadece profil bilgisi
  try {
    const res = await fetch(LOOKUP_URL, { cache: "no-store" });
    const json = await res.json();
    if (json?.data) renderProfile(json.data);
  } catch {
    /* yedek de yoksa statik HTML verisi kalır */
  }

  renderOfflineFallback();
}

if (dcStatusPill) {
  refreshDiscord();

  // 30 saniyede bir yenile; sekme gizliyken atla
  setInterval(() => {
    if (!document.hidden) refreshDiscord();
  }, 30000);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshDiscord();
  });
}
