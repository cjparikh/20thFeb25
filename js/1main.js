(function ($) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const searchBtn = document.querySelector("#search-btn");
    const menuBtn = document.querySelector("#menu-btn");
    const searchForm = document.querySelector(".search-form");
    const navbar = document.querySelector(".navbar-nav");
    const closeSearch = document.querySelector("#close-search");
    const backToTop = document.querySelector(".back-to-top");

    // Toggle Search Form
    searchBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      searchForm.classList.toggle("active");
      navbar.classList.remove("active");
    });

    // Toggle Navbar Menu
    menuBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      searchForm.classList.remove("active");
      navbar.classList.toggle("active");
    });

    // Close forms when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".search-form") &&
        !e.target.closest("#search-btn") &&
        !e.target.closest(".navbar-nav") &&
        !e.target.closest("#menu-btn")
      ) {
        searchForm.classList.remove("active");
        navbar.classList.remove("active");
      }
    });

    // Close Navbar on Link Click (for mobile)
    document.querySelectorAll(".navbar-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
      });
    });

    // Close forms on scroll
    window.addEventListener("scroll", () => {
      searchForm.classList.remove("active");
      navbar.classList.remove("active");
    });

    // Sticky Navbar Shadow
    window.addEventListener("scroll", () => {
      document
        .querySelector(".sticky-top")
        .classList.toggle("shadow-sm", window.scrollY > 300);
    });

    // Back to Top Button
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("active", window.scrollY > 300);
    });

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  $(document).ready(function () {
    // Hide Spinner after loading
    setTimeout(() => {
      $("#spinner").fadeOut("slow");
    }, 1000);

    // Initiate WOW.js for animations
    new WOW().init();

    // Header Carousel
    $(".header-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>',
      ],
    });

    // Facts Counter
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
    });

    // Adjust Carousel Height on Load and Resize
    function adjustCarouselHeight() {
      let navbarHeight = document.querySelector(".navbar").offsetHeight;
      document.querySelectorAll(".owl-carousel-item").forEach((item) => {
        item.style.height = `calc(100vh - ${navbarHeight}px)`;
      });
    }

    window.onload = adjustCarouselHeight;
    window.addEventListener("resize", adjustCarouselHeight);
  });
})(jQuery);
