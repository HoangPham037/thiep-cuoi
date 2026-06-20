const wedding = {
  groom: "Chú rể",
  bride: "Cô dâu",
  date: "2027-01-01T11:00:00+07:00",
  displayDate: "Chủ nhật, 01.01.2027",
  inviteText:
    "Gia đình chúng tôi trân trọng kính mời bạn đến dự tiệc cưới, cùng chia sẻ niềm vui và gửi lời chúc phúc cho đôi uyên ương.",
  groomParents: "Con ông bà ...",
  brideParents: "Con ông bà ...",
  contactEmail: "",
  musicSrc: "assets/music/beautiful-in-white.mp3",
  events: [
    {
      title: "Lễ thành hôn",
      time: "11:00 - 01.01.2027",
      place: "Tư gia nhà trai",
      address: "Cập nhật địa chỉ tại đây",
      map: "https://maps.google.com",
    },
    {
      title: "Tiệc cưới",
      time: "18:00 - 01.01.2027",
      place: "Trung tâm tiệc cưới",
      address: "Cập nhật địa chỉ tại đây",
      map: "https://maps.google.com",
    },
  ],
  gallery: [
    "PQT01340-",
    "PQT01392-",
    "PQT01410-",
    "PQT01440-",
    "PQT01474-",
    "PQT01506-",
    "PQT01579-",
    "PQT01621-",
    "PQT01695-",
    "PQT01720-",
    "PQT02107-",
    "PQT02152-",
    "PQT02249-",
    "PQT02331-",
  ],
};

const $ = (selector) => document.querySelector(selector);
const names = `${wedding.groom} & ${wedding.bride}`;
const weddingDate = new Date(wedding.date);
let weddingAudio;
let galleryActiveIndex = 1;

function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value;
}

function initContent() {
  setText("#coverNames", names);
  setText("#coverDate", wedding.displayDate);
  setText("#navNames", names);
  setText("#heroNames", names);
  setText("#heroDate", wedding.displayDate);
  setText("#introNames", names);
  setText("#inviteText", wedding.inviteText);
  setText("#groomName", wedding.groom);
  setText("#brideName", wedding.bride);
  setText("#groomParents", wedding.groomParents);
  setText("#brideParents", wedding.brideParents);
  setText("#footerText", `${names} - Thank you for being part of our story.`);

  setText("#weddingDay", String(weddingDate.getDate()).padStart(2, "0"));
  setText("#weddingMonth", `Tháng ${String(weddingDate.getMonth() + 1).padStart(2, "0")}`);
  setText("#weddingYear", String(weddingDate.getFullYear()));
}

function initCover() {
  const cover = $("#cover");
  $("#openInvite").addEventListener("click", () => {
    playWeddingMusic();
    cover.classList.add("is-hidden");
    document.body.style.overflow = "";
  });
  document.body.style.overflow = "hidden";
}

function initCountdown() {
  const parts = {
    days: $("#days"),
    hours: $("#hours"),
    minutes: $("#minutes"),
    seconds: $("#seconds"),
  };

  function tick() {
    const distance = Math.max(0, weddingDate.getTime() - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    parts.days.textContent = String(days).padStart(2, "0");
    parts.hours.textContent = String(hours).padStart(2, "0");
    parts.minutes.textContent = String(minutes).padStart(2, "0");
    parts.seconds.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  window.setInterval(tick, 1000);
}

function initEvents() {
  $("#eventList").innerHTML = wedding.events
    .map(
      (event) => `
        <article class="event-card">
          <h3>${event.title}</h3>
          <p><strong>Thời gian:</strong> ${event.time}</p>
          <p><strong>Địa điểm:</strong> ${event.place}</p>
          <p>${event.address}</p>
          <a class="button" href="${event.map}" target="_blank" rel="noreferrer">Xem bản đồ</a>
        </article>
      `
    )
    .join("");
}

function initGallery() {
  $("#galleryGrid").innerHTML = wedding.gallery
    .map(
      (name, index) => `
        <a class="gallery__slide" href="assets/images/${name}.webp" target="_blank" rel="noreferrer" aria-label="Xem ảnh cưới ${index + 1}">
          <img src="assets/images/${name}.webp" alt="Ảnh cưới ${index + 1}" loading="lazy" />
        </a>
      `
    )
    .join("");
}

function initGallerySlider() {
  const viewport = $("#galleryViewport");
  const prev = $("#galleryPrev");
  const next = $("#galleryNext");
  const counter = $("#galleryCounter");
  const slides = Array.from(document.querySelectorAll(".gallery__slide"));
  let startX = 0;
  let autoTimer;
  const autoDelay = 3600;

  const normalizeIndex = (index) => {
    if (index < 0) return slides.length - 1;
    if (index >= slides.length) return 0;
    return index;
  };

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      let offset = index - galleryActiveIndex;
      if (offset > slides.length / 2) offset -= slides.length;
      if (offset < -slides.length / 2) offset += slides.length;

      const absOffset = Math.abs(offset);
      const isVisible = absOffset <= 3;
      const isActive = offset === 0;

      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.style.setProperty("--offset", offset);
      slide.style.setProperty("--scale", Math.max(0.62, 1 - absOffset * 0.13));
      slide.style.setProperty("--opacity", isVisible ? Math.max(0.2, 1 - absOffset * 0.22) : 0);
      slide.style.setProperty("--depth", 120 - absOffset * 70);
      slide.style.setProperty("--z", 20 - absOffset);
    });

    counter.textContent = `${galleryActiveIndex + 1} / ${slides.length}`;
  };

  const goTo = (index) => {
    galleryActiveIndex = normalizeIndex(index);
    updateSlides();
  };

  const stopAuto = () => {
    window.clearInterval(autoTimer);
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = window.setInterval(() => goTo(galleryActiveIndex + 1), autoDelay);
  };

  prev.addEventListener("click", () => {
    goTo(galleryActiveIndex - 1);
    startAuto();
  });
  next.addEventListener("click", () => {
    goTo(galleryActiveIndex + 1);
    startAuto();
  });
  viewport.addEventListener("pointerenter", stopAuto);
  viewport.addEventListener("pointerleave", () => {
    viewport.classList.remove("is-dragging");
    startAuto();
  });
  viewport.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture?.(event.pointerId);
    stopAuto();
  });
  viewport.addEventListener("pointerup", (event) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 40) goTo(galleryActiveIndex + (delta < 0 ? 1 : -1));
    viewport.classList.remove("is-dragging");
    startAuto();
  });
  viewport.addEventListener("pointercancel", () => {
    viewport.classList.remove("is-dragging");
    startAuto();
  });

  updateSlides();
  startAuto();
}

function initScrollAnimations() {
  const targets = [
    ".section__title",
    ".intro__card",
    ".intro__photo",
    ".countdown__item",
    ".person",
    ".event-card",
    ".quote div",
    ".gallery__shell",
    ".rsvp__form",
    ".footer",
  ];
  const elements = targets.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function initRsvp() {
  $("#rsvpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      attend: data.get("attend"),
      message: data.get("message"),
      sentAt: new Date().toISOString(),
    };

    localStorage.setItem("wedding-rsvp", JSON.stringify(payload));
    $("#formNote").textContent =
      "Cảm ơn bạn, lời xác nhận đã được lưu trên thiết bị này.";

    if (wedding.contactEmail) {
      const subject = encodeURIComponent(`RSVP - ${payload.name}`);
      const body = encodeURIComponent(
        `Tên: ${payload.name}\nTham dự: ${payload.attend}\nLời nhắn: ${payload.message || ""}`
      );
      window.location.href = `mailto:${wedding.contactEmail}?subject=${subject}&body=${body}`;
    }
  });
}

function initMusicButton() {
  const button = $("#musicToggle");
  weddingAudio = $("#weddingAudio");
  if (!wedding.musicSrc) {
    button.hidden = true;
    return;
  }

  if (!weddingAudio) {
    weddingAudio = new Audio(wedding.musicSrc);
  }

  weddingAudio.src = wedding.musicSrc;
  weddingAudio.loop = true;
  weddingAudio.preload = "auto";
  button.addEventListener("click", async (event) => {
    if (weddingAudio.paused) {
      await playWeddingMusic();
    } else {
      weddingAudio.pause();
      event.currentTarget.classList.remove("is-active");
    }
  });
}

async function playWeddingMusic() {
  if (!weddingAudio) return;

  try {
    await weddingAudio.play();
    $("#musicToggle").classList.add("is-active");
  } catch (error) {
    $("#musicToggle").classList.remove("is-active");
  }
}

initContent();
initMusicButton();
initCover();
initCountdown();
initEvents();
initGallery();
initGallerySlider();
initRsvp();
initScrollAnimations();
