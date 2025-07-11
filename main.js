const images = document.getElementById("images");
const indicators = document.getElementById("indicators");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

const AUTOPLAY_TIME = 5000;

let intervalId = null;
let isTransitioning = null;

images.addEventListener("scroll", () => {
  isTransitioning = true;
});

images.addEventListener("scrollend", () => {
  isTransitioning = false;
});

function autoplay() {
  intervalId = setInterval(() => {
    const hasCarouselEnded =
      images.scrollLeft === images.scrollWidth - images.clientWidth;

    if (!hasCarouselEnded) {
      onRightArrowClick();
    } else {
      images.scrollLeft = 0;
      const currentIndicator = document.getElementsByClassName("active")[0];
      currentIndicator.classList.remove("active");
      indicators.children[0].classList.add("active");
    }
  }, AUTOPLAY_TIME);
}

leftArrow.addEventListener("click", () => {
  if (isTransitioning) {
    return null;
  }

  clearInterval(intervalId);

  images.scrollLeft = images.scrollLeft - images.clientWidth;

  const currentIndicator = document.getElementsByClassName("active")[0];
  if (currentIndicator.previousElementSibling) {
    currentIndicator.classList.remove("active");
    currentIndicator.previousElementSibling.classList.add("active");
  }

  autoplay();
});

const onRightArrowClick = () => {
  if (isTransitioning) {
    return null;
  }

  clearInterval(intervalId);

  images.scrollLeft = images.scrollLeft + images.clientWidth;

  const currentIndicator = document.getElementsByClassName("active")[0];
  if (currentIndicator.nextElementSibling) {
    currentIndicator.classList.remove("active");
    currentIndicator.nextElementSibling.classList.add("active");
  }

  autoplay();
};

rightArrow.addEventListener("click", onRightArrowClick);
autoplay();

indicators.addEventListener("click", (event) => {
  const currentElement = event.target;
  if (currentElement.classList.contains("indicator")) {
    images.scrollLeft =
      images.clientWidth *
      Array.from(currentElement.parentNode.children).indexOf(currentElement);
    const currentIndicator = document.getElementsByClassName("active")[0];
    currentIndicator.classList.remove("active");

    currentElement.classList.add("active");
  }
});
