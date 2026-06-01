let reviewIndex = 0;
let reviewsTrack;
let reviewsTotal = 0;

const visibleReviews = 1;

function initReviewsSlider() {
  renderReviews();

  reviewsTrack = document.getElementById("reviews-track");
  const items = document.querySelectorAll("#reviews-track .review");

  if (!reviewsTrack || items.length === 0) return;

  reviewsTotal = items.length;
  reviewIndex = 0;

  document.getElementById("nextReview").addEventListener("click", nextReview);
  document.getElementById("prevReview").addEventListener("click", prevReview);

  updateReviews();
}

function renderReviews() {
  const container = document.getElementById("reviews-track");

  container.innerHTML = reviewsData
    .map(
      (r) => `
      <div class="review">
        <div class="hs-item fade-up flex-col review-card">
          <h3>${r.title}</h3>
          <p class="slogan">${r.description}</p>
        </div>
      </div>
    `,
    )
    .join("");
}

function updateReviews() {
  const offset = reviewIndex * 100;
  reviewsTrack.style.transform = `translateX(-${offset}%)`;
}

function nextReview() {
  reviewIndex++;
  if (reviewIndex >= reviewsTotal) reviewIndex = 0;
  updateReviews();
}

function prevReview() {
  reviewIndex--;
  if (reviewIndex < 0) reviewIndex = reviewsTotal - 1;
  updateReviews();
}
