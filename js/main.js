const projectsSlider = new Swiper(".projects__swiper", {
  grabCursor: true,
  effect: "creative",
  loop: true,
  creativeEffect: {
    prev: {
      shadow: false,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next.projects__next-arrow.projects__btn",
    prevEl: ".swiper-button-prev.projects__prev-arrow.projects__btn",
  },
});

const teamSlider = new Swiper(".team__swiper", {
  effect: "cube",
  grabCursor: true,
  loop: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const animItems = document.querySelectorAll(".animate");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);

  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - animItemHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        if (!animItem.classList.contains("anim-no-hide"))
          animItem.classList.remove("active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

const header = document.querySelector(".header");

function handleScroll() {
  if (window.scrollY > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", handleScroll);


const trigger = document.getElementById("hamburger");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav__list");
let isClosed = true;

trigger.addEventListener("click", function () {
  burgerTime();
});

function burgerTime() {
  if (isClosed) {
    trigger.classList.remove("is-open");
    trigger.classList.add("is-closed");
    nav.classList.remove('open');
    navList.classList.remove('show');
    isClosed = false;
  } else {
    trigger.classList.remove("is-closed");
    trigger.classList.add("is-open");
    nav.classList.add('open');
    navList.classList.add('show');
    isClosed = true;
  }
}