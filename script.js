const wedding = {
  groom: "Anh Hoàng",
  bride: "Bích Ngọc",
  groomRole: "Út nam",
  brideRole: "Trưởng nữ",
  date: "2026-08-03T11:15:00+07:00",
  displayDate: "Thứ hai, 03.08.2026",
  guestTime: "10:30",
  startTime: "11:15",
  lunarDate: "(Tức ngày 21/06 năm Bính Ngọ)",
  inviteText:
    "Gia đình chúng tôi trân trọng kính mời bạn đến dự tiệc cưới, cùng chia sẻ niềm vui và gửi lời chúc phúc cho đôi uyên ương.",
  groomParents:
    "Út nam, con ông Phạm Văn Hùng và bà Lê Thị Bình. Địa chỉ: Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An.",
  brideParents:
    "Trưởng nữ, con ông Đặng Đình Cường và bà Nguyễn Thị Thắm. Địa chỉ: Xóm Sướn, Xã Hạnh Lâm, Tỉnh Nghệ An.",
  groomFamily: {
    father: "Phạm Văn Hùng",
    mother: "Lê Thị Bình",
    address: "Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An",
  },
  brideFamily: {
    father: "Đặng Đình Cường",
    mother: "Nguyễn Thị Thắm",
    address: "Xóm Sướn, Xã Hạnh Lâm, Tỉnh Nghệ An",
  },
  contactEmail: "",
  musicSrc: "assets/music/beautiful-in-white.mp3",
  rsvpEndpoint: "",
  adminKey: "",
  venueName: "Nhà Văn Hoá Xóm Thanh Đức",
  venueAddress:
    "Nhà văn hoá xóm Thanh Đức, xã Hạnh Lâm, tỉnh Nghệ An|Địa chỉ cũ: Nhà văn hoá xóm 1, xã Thanh Đức, huyện Thanh Chương, tỉnh Nghệ An",
  mapEmbed: "https://www.google.com/maps?q=18.825774,105.171121&z=16&output=embed",
  events: [
    {
      title: "Tiệc cưới",
      time: "11:15 - 03.08.2026",
      place: "Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An",
      address: "Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An",
      map: "https://www.google.com/maps/place/18%C2%B049'32.8%22N+105%C2%B010'16.0%22E/@18.82641,105.1700443,18.5z/data=!4m4!3m3!8m2!3d18.825774!4d105.171121?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      title: "Lễ thành hôn",
      time: "11:15 - 03.08.2026",
      place: "Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An",
      address: "Xóm Thanh Đức, Xã Hạnh Lâm, Tỉnh Nghệ An",
      map: "https://www.google.com/maps/place/18%C2%B049'32.8%22N+105%C2%B010'16.0%22E/@18.82641,105.1700443,18.5z/data=!4m4!3m3!8m2!3d18.825774!4d105.171121?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
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
const RSVP_STORAGE_KEY = "wedding-rsvp-list";

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
  setText("#groomRole", wedding.groomRole);
  setText("#brideRole", wedding.brideRole);
  setText("#groomFather", wedding.groomFamily.father);
  setText("#groomMother", wedding.groomFamily.mother);
  setText("#groomAddress", wedding.groomFamily.address);
  setText("#brideFather", wedding.brideFamily.father);
  setText("#brideMother", wedding.brideFamily.mother);
  setText("#brideAddress", wedding.brideFamily.address);
  setText("#ceremonyGroom", wedding.groom);
  setText("#ceremonyBride", wedding.bride);
  setText("#ceremonyGroomRole", wedding.groomRole);
  setText("#ceremonyBrideRole", wedding.brideRole);
  $("#venueAddress").innerHTML = wedding.venueAddress
    .split("|")
    .map((line) => `<p>${line}</p>`)
    .join("");
  $("#venueMap").src = wedding.mapEmbed;
  $("#venueMapLink").href = wedding.events[0].map;
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
    window.dispatchEvent(new Event("invite-opened"));
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
  const weekdays = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const month = weddingDate.getMonth() + 1;
  const year = weddingDate.getFullYear();

  setText("#partyTime", wedding.startTime);
  setText("#eventWeekday", weekdays[weddingDate.getDay()]);
  setText("#eventDay", String(weddingDate.getDate()).padStart(2, "0"));
  setText("#eventMonth", `Tháng ${String(month).padStart(2, "0")}`);
  setText("#eventYear", String(year));
  setText("#lunarDate", wedding.lunarDate);
  setText("#guestTime", wedding.guestTime);
  setText("#startTime", wedding.startTime);
  renderWeddingCalendar(year, month - 1, weddingDate.getDate());
}

function renderWeddingCalendar(year, monthIndex, activeDay) {
  const calendar = $("#weddingCalendar");
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push('<span class="calendar__cell calendar__cell--empty"></span>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(
      `<span class="calendar__cell${day === activeDay ? " is-active" : ""}">${day}</span>`
    );
  }

  calendar.innerHTML = `
    <div class="calendar__title">Tháng ${monthIndex + 1} / ${year}</div>
    <div class="calendar__weekdays">${weekdays.map((day) => `<span>${day}</span>`).join("")}</div>
    <div class="calendar__days">${cells.join("")}</div>
  `;
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
    ".ceremony-info__family",
    ".ceremony-info__couple",
    ".person",
    ".wedding-info__heading",
    ".wedding-info__time",
    ".wedding-info__date",
    ".wedding-info__year",
    ".wedding-info__lunar",
    ".wedding-info__times",
    ".wedding-info__countdown",
    ".calendar",
    ".venue-info__inner",
    ".journey__title",
    ".journey__item",
    ".journey__quote",
    ".moments__title",
    ".moments__item",
    ".quote div",
    ".gallery__shell",
    ".rsvp__form",
    ".footer",
  ];
  const elements = targets.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.classList.add("is-below");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-above", "is-below");
          entry.target.classList.add("is-visible");
          return;
        }

        const isAboveViewport = entry.boundingClientRect.top < 0;
        entry.target.classList.remove("is-visible");
        entry.target.classList.toggle("is-above", isAboveViewport);
        entry.target.classList.toggle("is-below", !isAboveViewport);
      });
    },
    { threshold: 0.18, rootMargin: "-6% 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function initIdleAutoScroll() {
  const idleDelay = 4200;
  const speed = 0.035;
  let idleTimer;
  let frameId;
  let lastFrameTime;
  let enabled = false;
  let isAutoScrolling = false;

  const atPageEnd = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  const stopAutoScroll = () => {
    isAutoScrolling = false;
    lastFrameTime = undefined;
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = undefined;
  };

  const tick = (timestamp) => {
    if (!isAutoScrolling || atPageEnd()) {
      stopAutoScroll();
      return;
    }

    if (lastFrameTime === undefined) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    window.scrollBy(0, delta * speed);
    frameId = window.requestAnimationFrame(tick);
  };

  const startAutoScroll = () => {
    if (!enabled || atPageEnd() || isAutoScrolling) return;
    isAutoScrolling = true;
    frameId = window.requestAnimationFrame(tick);
  };

  const schedule = () => {
    window.clearTimeout(idleTimer);
    stopAutoScroll();
    if (!enabled || atPageEnd()) return;
    idleTimer = window.setTimeout(startAutoScroll, idleDelay);
  };

  window.addEventListener("invite-opened", () => {
    enabled = true;
    schedule();
  });

  ["wheel", "touchstart", "pointerdown", "keydown", "focusin"].forEach((eventName) => {
    window.addEventListener(eventName, schedule, { passive: true });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoScroll();
    else schedule();
  });
}

function initRsvp() {
  const isAdminMode = new URLSearchParams(window.location.search).get("admin") === "1";
  const adminPanel = $("#adminRsvpPanel");
  adminPanel.hidden = !isAdminMode;
  let currentResponses = [];

  const getLocalResponses = () => JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY) || "[]");
  const saveResponses = (responses) =>
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(responses));
  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const updateSummary = () => {
    const responses = currentResponses;
    const attending = responses.filter((item) => item.attend === "Có tham dự").length;
    const absent = responses.length - attending;
    $("#rsvpSummary").textContent = responses.length
      ? `Đã lưu ${responses.length} phản hồi trên thiết bị này: ${attending} tham dự, ${absent} không tham dự.`
      : "Chưa có phản hồi nào được lưu trên thiết bị này.";
  };
  const loadRemoteResponses = () =>
    new Promise((resolve, reject) => {
      if (!wedding.rsvpEndpoint) {
        resolve(getLocalResponses());
        return;
      }

      const callbackName = `handleRsvp_${Date.now()}`;
      const script = document.createElement("script");
      const separator = wedding.rsvpEndpoint.includes("?") ? "&" : "?";
      const url = `${wedding.rsvpEndpoint}${separator}action=list&key=${encodeURIComponent(
        wedding.adminKey
      )}&callback=${callbackName}`;

      window[callbackName] = (result) => {
        delete window[callbackName];
        script.remove();
        if (result?.ok) resolve(result.data || []);
        else reject(new Error(result?.error || "Không tải được dữ liệu RSVP."));
      };

      script.onerror = () => {
        delete window[callbackName];
        script.remove();
        reject(new Error("Không kết nối được endpoint RSVP."));
      };

      script.src = url;
      document.body.appendChild(script);
    });
  const refreshResponses = async () => {
    try {
      currentResponses = await loadRemoteResponses();
      if (!wedding.rsvpEndpoint) currentResponses = getLocalResponses();
      updateSummary();
      return currentResponses;
    } catch (error) {
      currentResponses = getLocalResponses();
      updateSummary();
      $("#formNote").textContent = error.message;
      return currentResponses;
    }
  };
  const clearRemoteResponses = () =>
    new Promise((resolve, reject) => {
      if (!wedding.rsvpEndpoint) {
        localStorage.removeItem(RSVP_STORAGE_KEY);
        resolve();
        return;
      }

      const callbackName = `clearRsvp_${Date.now()}`;
      const script = document.createElement("script");
      const separator = wedding.rsvpEndpoint.includes("?") ? "&" : "?";
      const url = `${wedding.rsvpEndpoint}${separator}action=clear&key=${encodeURIComponent(
        wedding.adminKey
      )}&callback=${callbackName}`;

      window[callbackName] = (result) => {
        delete window[callbackName];
        script.remove();
        if (result?.ok) resolve();
        else reject(new Error(result?.error || "Không xoá được dữ liệu RSVP."));
      };

      script.onerror = () => {
        delete window[callbackName];
        script.remove();
        reject(new Error("Không kết nối được endpoint RSVP."));
      };

      script.src = url;
      document.body.appendChild(script);
    });

  $("#rsvpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      attend: data.get("attend"),
      message: data.get("message"),
      sentAt: new Date().toISOString(),
    };

    const responses = getLocalResponses();
    responses.push(payload);
    saveResponses(responses);
    currentResponses = responses;
    if (isAdminMode && !wedding.rsvpEndpoint) updateSummary();

    if (wedding.rsvpEndpoint) {
      fetch(wedding.rsvpEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      }).catch(() => {
        $("#formNote").textContent =
          "Đã ghi nhận trên thiết bị này, nhưng chưa gửi được về hệ thống.";
      });
    }

    $("#formNote").textContent = wedding.rsvpEndpoint
      ? "Cảm ơn bạn, xác nhận tham dự đã được gửi."
      : "Cảm ơn bạn, lời xác nhận đã được ghi nhận. Chủ tiệc cần cấu hình hệ thống RSVP để nhận phản hồi từ xa.";
    event.currentTarget.reset();

    if (wedding.contactEmail) {
      const subject = encodeURIComponent(`RSVP - ${payload.name}`);
      const body = encodeURIComponent(
        `Tên: ${payload.name}\nTham dự: ${payload.attend}\nLời nhắn: ${payload.message || ""}`
      );
      window.location.href = `mailto:${wedding.contactEmail}?subject=${subject}&body=${body}`;
    }
  });

  $("#refreshRsvp").addEventListener("click", refreshResponses);

  $("#exportCsv").addEventListener("click", async () => {
    const responses = await refreshResponses();
    if (!responses.length) {
      $("#formNote").textContent = "Chưa có dữ liệu để xuất.";
      return;
    }

    const headers = ["Họ và tên", "Tham dự", "Lời nhắn", "Thời gian gửi"];
    const rows = responses.map((item) => [
      item.name,
      item.attend,
      item.message || "",
      new Date(item.sentAt).toLocaleString("vi-VN"),
    ]);
    const escapeCell = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "danh-sach-rsvp.csv";
    link.click();
    URL.revokeObjectURL(url);
  });

  $("#exportPdf").addEventListener("click", async () => {
    const responses = await refreshResponses();
    if (!responses.length) {
      $("#formNote").textContent = "Chưa có dữ liệu để xuất.";
      return;
    }

    const rows = responses
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.attend)}</td>
            <td>${escapeHtml(item.message || "")}</td>
            <td>${new Date(item.sentAt).toLocaleString("vi-VN")}</td>
          </tr>
        `
      )
      .join("");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      $("#formNote").textContent = "Trình duyệt đang chặn cửa sổ in PDF. Hãy cho phép popup rồi thử lại.";
      return;
    }
    printWindow.document.write(`
      <!doctype html>
      <html lang="vi">
        <head>
          <meta charset="utf-8" />
          <title>Danh sách RSVP</title>
          <style>
            body { font-family: Arial, sans-serif; color: #294f1f; padding: 24px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #c8d3b9; padding: 8px; text-align: left; }
            th { background: #f4eadf; }
          </style>
        </head>
        <body>
          <h1>Danh sách xác nhận tham dự</h1>
          <table>
            <thead>
              <tr><th>STT</th><th>Họ và tên</th><th>Tham dự</th><th>Lời nhắn</th><th>Thời gian gửi</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <script>window.onload = () => window.print();<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  });

  $("#clearRsvp").addEventListener("click", async () => {
    const confirmed = window.confirm("Bạn chắc chắn muốn xoá toàn bộ phản hồi RSVP?");
    if (!confirmed) return;
    try {
      await clearRemoteResponses();
      localStorage.removeItem(RSVP_STORAGE_KEY);
      currentResponses = [];
      updateSummary();
      $("#formNote").textContent = "Đã xoá dữ liệu RSVP.";
    } catch (error) {
      $("#formNote").textContent = error.message;
    }
  });

  currentResponses = getLocalResponses();
  updateSummary();
  if (isAdminMode) refreshResponses();
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
initIdleAutoScroll();
