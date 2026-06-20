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
  musicSrc: "",
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
        <a href="assets/images/${name}.webp" target="_blank" rel="noreferrer" aria-label="Xem ảnh cưới ${index + 1}">
          <img src="assets/images/${name}-thumb.webp" alt="Ảnh cưới ${index + 1}" loading="lazy" />
        </a>
      `
    )
    .join("");
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
  if (!wedding.musicSrc) {
    button.hidden = true;
    return;
  }

  const audio = new Audio(wedding.musicSrc);
  audio.loop = true;
  button.addEventListener("click", async (event) => {
    if (audio.paused) {
      await audio.play();
      event.currentTarget.classList.add("is-active");
    } else {
      audio.pause();
      event.currentTarget.classList.remove("is-active");
    }
  });
}

initContent();
initCover();
initCountdown();
initEvents();
initGallery();
initRsvp();
initMusicButton();
