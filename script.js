
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".character-carousel");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const prevButton = document.getElementById("prev-character");
  const nextButton = document.getElementById("next-character");
  const counter = document.getElementById("carousel-counter");
  const dotsContainer = document.getElementById("carousel-dots");

  const biographyLabel = document.getElementById("biography-label");
  const biographyTitle = document.getElementById("biography-title");
  const biographyText = document.getElementById("biography-text");

  const biographies = [
    {
      name: "Ciel",
      title: "A king with a story untold.",
      description:
        "Heir to the Kwon dynasty and King of Del Sol Valley, " +
        "Ciel carries the weight of a powerful legacy. " +
        "Behind his composed exterior is a man learning " +
        "that love and family can offer a life beyond perfection."

    },
    {
      name: "Nash",
      title: "The heart behind the spotlight.",
      description:
        "A celebrated dancer, singer and model, Nash balances " +
        "a life in the spotlight with the family he loves. " +
        "Beneath the fame is a devoted husband and father " +
        "whose story is still unfolding."
    },
    {
      name: "Elios",
      title: "A little world of possibilities.",
      description:
        "The eldest child of Nash and Ciel, Elios is an " +
        "important part of the family they have built together. " +
        "As a big brother to the twins, his journey is " +
        "only just beginning."
    },
    {
      name: "Milo",
      title: "A little enigma in the making.",
      description:
        "One half of the family's beloved twins, Milo is " +
        "growing up surrounded by love, laughter and the " +
        "beautiful chaos of family life. There is still " +
        "so much to discover about the person he will become."
    },
    {
      name: "Amelie",
      title: "A little star with a bright future.",
      description:
        "Born alongside her twin brother Milo, Amelie " +
        "is one of the youngest members of the family. " +
        "With her own story waiting to unfold, she brings " +
        "another little spark to Nash and Ciel's world."
    }
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let currentIndex = 0;
  let autoplayTimer = null;
  let userPaused = false;
  let touchStartX = 0;

  // CREATE DOTS
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Show character ${index + 1}`);

    dot.addEventListener("click", () => {
      showSlide(index);
      pauseAfterInteraction();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.querySelectorAll(".carousel-dot")];

  // UPDATE SLIDE AND BIOGRAPHY
  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === currentIndex;

      slide.classList.toggle("active", active);
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === currentIndex;

      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", String(active));
    });

    counter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(slides.length).padStart(2, "0")}`;

    const biography = biographies[currentIndex];

    biographyLabel.textContent =
      `GET TO KNOW ${biography.name.toUpperCase()}`;

    biographyTitle.textContent = biography.title;
    biographyText.textContent = biography.description;
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();

    if (
      reducedMotion.matches ||
      userPaused ||
      document.hidden
    ) {
      return;
    }

    autoplayTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  function pauseAfterInteraction() {
    userPaused = true;
    stopAutoplay();
  }

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    pauseAfterInteraction();
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    pauseAfterInteraction();
  });

  carousel.addEventListener("mouseenter", stopAutoplay);

  carousel.addEventListener("mouseleave", () => {
    if (!carousel.contains(document.activeElement)) {
      startAutoplay();
    }
  });

  carousel.addEventListener("focusin", stopAutoplay);

  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      startAutoplay();
    }
  });

  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      const difference =
        event.changedTouches[0].screenX - touchStartX;

      if (Math.abs(difference) > 50) {
        showSlide(currentIndex + (difference < 0 ? 1 : -1));
        pauseAfterInteraction();
      }
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  reducedMotion.addEventListener("change", startAutoplay);

  showSlide(0);
  startAutoplay();
});


/* ==========================================
   BUNNISIMMIES — ANIMATED SNOW
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const snowContainer =
    document.getElementById("snow-container");

  if (!snowContainer) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) return;

  const snowflakeCount = 100;

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement("span");

    snowflake.classList.add("snowflake");

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 12;
    const delay = Math.random() * -25;
    const opacity = Math.random() * 0.5 + 0.2;
    const drift = Math.random() * 100 - 50;

    snowflake.style.left = `${left}%`;

    snowflake.style.setProperty(
      "--snow-size",
      `${size}px`
    );

    snowflake.style.setProperty(
      "--snow-opacity",
      opacity
    );

    snowflake.style.setProperty(
      "--snow-duration",
      `${duration}s`
    );

    snowflake.style.setProperty(
      "--snow-delay",
      `${delay}s`
    );

    snowflake.style.setProperty(
      "--snow-drift",
      `${drift}px`
    );

    snowContainer.appendChild(snowflake);
  }
});


/* ==========================================
   BUNNISIMMIES — RANDOM SHOOTING STARS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const starContainer =
    document.getElementById("shooting-stars");

  if (!starContainer) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let starTimer;

  function createShootingStar() {
    if (reducedMotion.matches || document.hidden) return;

    const star = document.createElement("span");
    star.className = "shooting-star";

    // Random position near the upper part of the screen
    const startX = Math.random() * 55;
    const startY = Math.random() * 45;

    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;

    // Slightly different sizes for natural variation
    star.style.width = `${80 + Math.random() * 100}px`;

    starContainer.appendChild(star);

    // Remove the star after its animation finishes
    star.addEventListener(
      "animationend",
      () => star.remove(),
      { once: true }
    );
  }

  function scheduleNextStar() {
    clearTimeout(starTimer);

    if (reducedMotion.matches || document.hidden) return;

    // Random delay: 2–5 seconds
    const delay = 2000 + Math.random() * 3000;

    starTimer = setTimeout(() => {
      createShootingStar();
      scheduleNextStar();
    }, delay);
  }

  document.addEventListener(
    "visibilitychange",
    scheduleNextStar
  );

  reducedMotion.addEventListener(
    "change",
    scheduleNextStar
  );

  scheduleNextStar();
});


/* ==========================================
   BUNNISIMMIES — CELESTIAL CURSOR
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");
  const sparkleContainer = document.getElementById("cursor-sparkles");

  if (!cursor || !sparkleContainer) return;

  const mouseDevice = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!mouseDevice.matches || reducedMotion.matches) return;

  let lastSparkleTime = 0;

  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.style.opacity = "1";

    const hovering = event.target.closest(
      "a, button, input, select, textarea, [role='button']"
    );

    cursor.classList.toggle("is-hovering", !!hovering);

    // Limit sparkle creation for performance
    const now = performance.now();

    if (now - lastSparkleTime < 45) return;

    lastSparkleTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";

    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;

    sparkle.style.setProperty(
      "--sparkle-x",
      `${Math.random() * 30 - 15}px`
    );

    sparkle.style.setProperty(
      "--sparkle-y",
      `${Math.random() * 30 - 15}px`
    );

    sparkleContainer.appendChild(sparkle);

    sparkle.addEventListener(
      "animationend",
      () => sparkle.remove(),
      { once: true }
    );
  });

  document.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });

  window.addEventListener("blur", () => {
    cursor.style.opacity = "0";
  });
});



/* ==========================================
   CELESTIAL BACKGROUND MUSIC PLAYER
   bunnisimmies.com
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const toggle = document.getElementById("music-toggle");

  if (!music || !toggle) return;

  const label = toggle.querySelector(".music-label");

  // MUSIC SETTINGS
  const MAX_VOLUME = 0.35;
  const FADE_DURATION = 1200;

  let isPlaying = false;
  let fadeFrame = null;
  let requestId = 0;
  let userTurnedOff = false;

  music.volume = 0;
  music.loop = true;

  // UPDATE BUTTON APPEARANCE
  function updateButton(playing) {
    isPlaying = playing;

    toggle.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-pressed", String(playing));

    toggle.setAttribute(
      "aria-label",
      playing
        ? "Pause background music"
        : "Play background music"
    );

    if (label) {
      label.textContent = playing
        ? "SOUND ON"
        : "SOUND OFF";
    }
  }

  // CANCEL PREVIOUS FADE
  function cancelFade() {
    if (fadeFrame !== null) {
      cancelAnimationFrame(fadeFrame);
      fadeFrame = null;
    }
  }

  // SMOOTH VOLUME TRANSITION
  function fadeVolume(targetVolume, callback) {
    cancelFade();

    const startVolume = music.volume;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min(
        (now - startTime) / FADE_DURATION,
        1
      );

      // Smooth easing
      const eased = progress * progress * (3 - 2 * progress);

      music.volume = Math.max(
        0,
        Math.min(
          1,
          startVolume +
            (targetVolume - startVolume) * eased
        )
      );

      if (progress < 1) {
        fadeFrame = requestAnimationFrame(animate);
      } else {
        fadeFrame = null;
        if (callback) callback();
      }
    }

    fadeFrame = requestAnimationFrame(animate);
  }

  // START MUSIC
  async function startMusic() {
    if (userTurnedOff || isPlaying) return;

    const currentRequest = ++requestId;

    try {
      await music.play();

      // Ignore outdated playback requests
      if (currentRequest !== requestId || userTurnedOff) {
        return;
      }

      updateButton(true);
      fadeVolume(MAX_VOLUME);

      // No longer need automatic-start listeners
      removeAutoStartListeners();

    } catch (error) {
      // Autoplay may be blocked by the browser
      console.log(
        "Waiting for visitor interaction to play music."
      );
    }
  }

  // STOP MUSIC
  function stopMusic() {
    userTurnedOff = true;
    requestId++;

    updateButton(false);
    removeAutoStartListeners();

    fadeVolume(0, () => {
      if (!isPlaying) {
        music.pause();
      }
    });
  }

  // MUSIC BUTTON
  toggle.addEventListener("click", async () => {
    if (isPlaying) {
      stopMusic();
    } else {
      userTurnedOff = false;
      await startMusic();
    }
  });

  // START ON FIRST USER INTERACTION
  function startOnInteraction(event) {
    // Let the music button handle its own clicks
    if (
      event.target instanceof Element &&
      event.target.closest("#music-toggle")
    ) {
      return;
    }

    if (!isPlaying && !userTurnedOff) {
      startMusic();
    }
  }

  function removeAutoStartListeners() {
    document.removeEventListener(
      "pointerdown",
      startOnInteraction
    );

    document.removeEventListener(
      "keydown",
      startOnInteraction
    );
  }

  // Try autoplay on page load
  startMusic();

  // If blocked, try on first interaction
  document.addEventListener(
    "pointerdown",
    startOnInteraction
  );

  document.addEventListener(
    "keydown",
    startOnInteraction
  );

  // HANDLE AUDIO ERRORS
  music.addEventListener("error", () => {
    cancelFade();
    requestId++;

    updateButton(false);

    console.error(
      "Music failed to load. Check the file path."
    );
  });
});


/* LIVE DISCORD SERVER WIDGET */

const DISCORD_SERVER_ID = "1565666884446191678";

async function updateDiscordWidget() {
  const onlineElement = document.getElementById("discord-online");
  const joinElement = document.getElementById("discord-join");
  const liveElement = document.querySelector(".discord-live-label");

  if (!onlineElement || !joinElement) return;

  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`
    );

    if (!response.ok) {
      throw new Error(`Discord widget error: ${response.status}`);
    }

    const data = await response.json();

    onlineElement.textContent =
      Number(data.presence_count ?? 0).toLocaleString();

    if (data.instant_invite) {
      joinElement.href = data.instant_invite;
      joinElement.removeAttribute("aria-disabled");
    }

    if (liveElement) {
      liveElement.textContent = "● LIVE";
    }

  } catch (error) {
    console.error("Could not load Discord widget:", error);

    onlineElement.textContent = "Unavailable";

    if (liveElement) {
      liveElement.textContent = "● OFFLINE";
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  updateDiscordWidget();
});


// Refresh every 60 seconds
setInterval(updateDiscordWidget, 60000);


/* CONTACT SECTION SCROLL REVEAL */

document.addEventListener("DOMContentLoaded", () => {
  const contact = document.querySelector(".contact-inner");

  if (!contact) return;

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  contact.style.opacity = "0";
  contact.style.transform = "translateY(25px)";
  contact.style.transition =
    "opacity 1s ease, transform 1s ease";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contact.style.opacity = "1";
          contact.style.transform = "translateY(0)";
          observer.unobserve(contact);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(contact);
});
