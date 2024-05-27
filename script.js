const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper i");
const firstImg = carousel.querySelectorAll("img")[0];

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  const scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

  // showing and hiding arrow icons according to carousel scroll left value
  arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft === scrollWidth ? "none" : "block";
};

const autoSlide = () => {
  // If there is no image left to scroll then return from here
  if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff); // make positionDiff value to positive
  const firstImageWidth = firstImg.clientWidth + 14;

  // get difference value that needs to be added or reduced from carousel left to take middle image center
  let valDiff = firstImageWidth - positionDiff;

  // If user positionDiff is greater than 33% of the image width then add difference value to the scrollLeft else
  // reduce positionDiff from it
  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImageWidth / 3 ? valDiff : -positionDiff);
  }

  // If user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImageWidth / 3 ? valDiff : -positionDiff;
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const firstImageWidth = firstImg.clientWidth + 14; // getting the first img width & adding 14 margin value

    // If clicked icon is screenLeft, reduce the width value from the carousel scroll left else add to it
    carousel.scrollLeft +=
      icon.id === "left" ? -firstImageWidth : firstImageWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const dragStart = (e) => {
  e.preventDefault();

  // Updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  e.preventDefault();
  if (!isDragStart) return;
  carousel.classList.add("dragging");

  // Scrolling images/carousel to left according to mouse pointer
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;

  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  autoSlide();
};

// Desktop controls
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

// Table and mobile controls
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);
// carousel.addEventListener("mouseleave", dragStop);
