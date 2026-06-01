let currentSlide = 0;
let slides;
let totalSlides;
const visibleSlides = 3;

function initPortfolioSlider() {
  renderSlides();
  slides = document.getElementById("slides");
  const items = document.querySelectorAll(".slide");
  if (!slides || items.length === 0) return;
  totalSlides = items.length;
  currentSlide = 0;
  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);
  initSwipe();
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * (100 / visibleSlides)}%)`;
}

function nextSlide() {
  const maxIndex = totalSlides - visibleSlides;
  currentSlide++;
  if (currentSlide >= maxIndex) currentSlide = 0;
  updateSlider();
}

function prevSlide() {
  const maxIndex = totalSlides - visibleSlides;
  currentSlide--;
  if (currentSlide < 0) currentSlide = maxIndex;
  updateSlider();
}

function initSwipe() {
  let startX = 0;
  slides.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  slides.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  });
}
function renderSlides() {
  const slidesContainer = document.getElementById("slides");
  slidesContainer.innerHTML = portfolioData
    .map(
      (item) => `<figure class="slide flex flex-col">
        <img src="${item.img}" alt="${item.alt}" />
        <figcaption>${item.text}</figcaption>
      </figure>`,
    )
    .join("");
}
