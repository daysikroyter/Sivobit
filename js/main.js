document.addEventListener("DOMContentLoaded", function () {

  const projectsSlider = new Swiper(".projects__swiper", {
    grabCursor: true,
    effect: "creative",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    creativeEffect: {
      prev: { shadow: false, translate: [0, 0, -400] },
      next: { translate: ["100%", 0, 0] },
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
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
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
    setTimeout(animOnScroll, 300);
  }

  function animOnScroll() {
    animItems.forEach((animItem) => {
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
      } else if (!animItem.classList.contains("anim-no-hide")) {
        animItem.classList.remove("active");
      }
    });
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
    };
  }

  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;
  let isAnchorScrolling = false;
  let scrollTimeout = null;

  function handleScroll() {
    if (isAnchorScrolling) return;

    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      header.classList.remove("hide");
      header.classList.add("active");
    } else if (currentScrollY < lastScrollY && currentScrollY > 0) {
      header.classList.remove("active");
      header.classList.add("hide");
    } else if (currentScrollY === 0) {
      header.classList.remove("active", "hide");
    }

    lastScrollY = currentScrollY;
  }

  function checkInitialPosition() {
    const currentScrollY = window.scrollY;
    header.classList.remove("active", "hide");
    if (currentScrollY > 0) {
      header.classList.add("hide");
    }
  }

  checkInitialPosition();
  window.addEventListener("scroll", handleScroll);

  const trigger = document.getElementById("hamburger");
  const menu = document.querySelector(".menu-burger");
  const menuBurger = document.querySelector(".menu-burger__list");
  const logo = document.querySelector(".header .logo");
  const body = document.body;
  let isMenuClosed = true;

  function burgerTime() {
    trigger.classList.toggle("is-open", isMenuClosed);
    trigger.classList.toggle("is-closed", !isMenuClosed);
    menu.classList.toggle("open", isMenuClosed);
    menuBurger.classList.toggle("show", isMenuClosed);
    logo.classList.toggle("active", isMenuClosed);
    body.classList.toggle("active", isMenuClosed);
    isMenuClosed = !isMenuClosed;
  }

  trigger.addEventListener("click", burgerTime);

  function handleOrientationChange() {
    if (!isMenuClosed) {
      burgerTime();
    }
  }

  window.addEventListener("resize", handleOrientationChange);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href.startsWith("#") || href === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      if (!isMenuClosed) {
        burgerTime();
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      isAnchorScrolling = true;

      if (href === "#hero") {
        header.classList.remove("active", "hide");
      } else {
        header.classList.add("hide");
        header.classList.remove("active");
      }

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });

      scrollTimeout = setTimeout(() => {
        isAnchorScrolling = false;
        if (href === "#hero") {
          header.classList.remove("active", "hide");
        } else {
          header.classList.add("hide");
          header.classList.remove("active");
        }
      }, 700);
    });
  });

  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      isAnchorScrolling = true;
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "auto",
      });
      if (window.location.hash === "#hero") {
        header.classList.remove("active", "hide");
      } else {
        header.classList.add("hide");
        header.classList.remove("active");
      }
      scrollTimeout = setTimeout(() => {
        isAnchorScrolling = false;
      }, 700);
    } else {
      checkInitialPosition();
    }
  } else {
    checkInitialPosition();
  }
});
