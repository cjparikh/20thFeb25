(function ($) {
  "use strict";

  $(document).ready(function () {
    // Spinner
    setTimeout(() => {
      $("#spinner").removeClass("show");
    }, 1);

    // Initiate WOW.js
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
      $(".sticky-top").toggleClass("shadow-sm", $(this).scrollTop() > 300);
    });

    // FORM TOGGLES
    let navbar = document.querySelector(".navbar-nav"),
      searchForm = document.querySelector(".search-form"),
      searchLogin = document.querySelector(".login-form");

    document.querySelector("#menu-btn").addEventListener("click", function () {
      navbar.classList.toggle("active");
      searchForm.classList.remove("active");
      searchLogin.classList.remove("active");
    });

    document
      .querySelector("#search-btn")
      .addEventListener("click", function () {
        searchForm.classList.toggle("active");
        searchLogin.classList.remove("active");
        navbar.classList.remove("active");
      });

    document.querySelector("#login-btn").addEventListener("click", function () {
      searchLogin.classList.toggle("active");
      searchForm.classList.remove("active");
      navbar.classList.remove("active");
    });

    // DROPDOWN TOGGLE
    document.getElementById("menu-btn").addEventListener("click", function () {
      navbar.classList.toggle("show-menu");
    });

    // Back to top button
    $(window).scroll(function () {
      $(".back-to-top").toggleClass("visible", $(this).scrollTop() > 300);
    });

    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000,
    });

    // Header carousel
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

    // Adjusts the carousel height dynamically
    function adjustCarouselHeight() {
      let navbarHeight = document.querySelector(".navbar").offsetHeight;
      document.querySelectorAll(".owl-carousel-item").forEach((item) => {
        item.style.height = `calc(100vh - ${navbarHeight}px)`;
      });
    }

    adjustCarouselHeight();
    window.addEventListener("resize", adjustCarouselHeight);
  });
});
jQuery;
