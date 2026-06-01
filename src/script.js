if (document.getElementById("year")?.textContent)
  document.getElementById("year").textContent = new Date().getFullYear();

function openModal(id) {
  const backdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById(id);

  backdrop.classList.add("active");
  backdrop.setAttribute("aria-hidden", "false");

  document.querySelectorAll(".modal").forEach((m) => {
    m.classList.remove("active");
  });

  modal.classList.add("active");
}

function closeModal(id) {
  const backdrop = document.getElementById("modalBackdrop");
  const modal = document.getElementById(id);

  modal.classList.remove("active");

  const anyOpen = document.querySelectorAll(".modal.active").length > 0;

  if (!anyOpen) {
    backdrop.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
  }
}

function closeAllModals(e) {
  if (e.target.id === "modalBackdrop") {
    document
      .querySelectorAll(".modal")
      .forEach((m) => m.classList.remove("active"));
    document.getElementById("modalBackdrop").classList.remove("active");
    document
      .getElementById("modalBackdrop")
      .setAttribute("aria-hidden", "true");
  }
}
function closeAllModals(e) {
  // close only if clicked backdrop, not modal content
  if (e.target === document.getElementById("modalBackdrop")) {
    Array.from(document.querySelectorAll(".modal")).forEach(
      (m) => (m.style.display = "none"),
    );
    document.getElementById("modalBackdrop").style.display = "none";
    document
      .getElementById("modalBackdrop")
      .setAttribute("aria-hidden", "true");
  }
}

// FORM VALIDATION & SUBMISSION hooks
function validateAndSend(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  if (!name || !phone) {
    showFormMsg("formMsg", "Будь ласка, вкажіть імʼя та телефон.");
    return false;
  }
  // Formspree: regular form submit will POST to action URL.
  // If using fetch/ajax: you can send with fetch to Formspree endpoint.
  showFormMsg(
    "formMsg",
    "Дякуємо! Ваше повідомлення відправлено (або буде відправлено після налаштування Formspree).",
  );
  // For demo: clear form
  form.reset();
  return false; // prevent actual navigation in demo; set to true to allow default POST
}
function showFormMsg(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Modal forms (simulate submission - replace with API calls or Formspree)
function submitModalForm(e) {
  e.preventDefault();
  const name = document.getElementById("mname").value.trim();
  const phone = document.getElementById("mphone").value.trim();
  if (!name || !phone) {
    document.getElementById("modalMsg").textContent =
      "Заповніть імʼя та телефон";
    return false;
  }
  document.getElementById("modalMsg").textContent =
    "Дякуємо! Менеджер звʼяжеться найближчим часом.";
  setTimeout(() => {
    closeModal("orderModal");
    document.getElementById("modalMsg").textContent = "";
  }, 1500);
  return false;
}
function submitPriceForm(e) {
  e.preventDefault();
  const size = document.getElementById("psize").value;
  document.getElementById("priceMsg").textContent =
    "Дякуємо! Ми розрахуємо приблизну вартість і зателефонуємо.";
  setTimeout(() => {
    closeModal("priceModal");
    document.getElementById("priceMsg").textContent = "";
  }, 1500);
  return false;
}
function submitFeedback(e) {
  e.preventDefault();
  const name = document.getElementById("fname").value.trim();
  const text = document.getElementById("ftext").value.trim();
  if (!name || !text) {
    document.getElementById("fmsg").textContent = "Будь ласка, заповніть поля";
    return false;
  }
  document.getElementById("fmsg").textContent = "Дякуємо за відгук!";
  setTimeout(() => {
    closeModal("feedbackModal");
    document.getElementById("fmsg").textContent = "";
  }, 1200);
  return false;
}
function renderCards(data, id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = data
    .map((s, i) => {
      const bg = s.img ? `background-image: url('${s.img}');` : "";
      return `
        <div class="hs-item fade-up flex"
             style="--d:${i * 150}ms; ${bg}">
          
          ${s.ico ? `<div class="hs-ico">${s.ico}</div>` : ""}

          <div class="flex flex-col">
            <h4>${s.title}</h4>
            <p class="slogan">${s.description}</p>
          </div>

        </div>
      `;
    })
    .join("");
}

async function loadComponent() {
  const burgerCheckbox = document.getElementById("burger-checkbox");
  renderNavLinks();
  navContentBack();
  mobileMenuToggle();
  renderCards(aboutUsProps, "about-grid");
  renderCards(
    services.map((el) => ({ ...el, ico: "" })),
    "services-list",
  );
  renderCards(
    services.filter((el) => el.ico),
    "hero-services",
  );
  initPortfolioSlider();
  initReviewsSlider();
}
