(function ($) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const searchBtn = document.querySelector("#search-btn");
    const menuBtn = document.querySelector("#menu-btn");
    const searchForm = document.querySelector(".search-form");
    const navbar = document.querySelector(".navbar-nav");
    const closeSearch = document.querySelector("#close-search");

    // Form toggle functions
    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.remove("active");
      searchForm.classList.toggle("active");
      navbar.classList.remove("show-menu");
    });

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      searchForm.classList.remove("active");
      navbar.classList.toggle("active");
    });

    // Close button handlers
    closeSearch?.addEventListener("click", () =>
      searchForm.classList.remove("active")
    );

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

    // Close forms on scroll
    window.addEventListener("scroll", () => {
      searchForm.classList.remove("active");
      navbar.classList.remove("active");
    });

    // Menu Toggle
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navbar.classList.toggle("show-menu");

      // Close other forms when menu opens
      // searchForm.classList.remove("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar-nav") && !e.target.closest("#menu-btn")) {
        navbar.classList.remove("show-menu");
      }
    });
  });

  $(document).ready(function () {
    // Initiate WOW.js
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".sticky-top").addClass("shadow-sm");
      } else {
        $(".sticky-top").removeClass("shadow-sm");
      }
    });

    // VIEW PRODUCTS
    // Initialize Isotope with a more specific selector
    var $grid = $(".products-grid").isotope({
      itemSelector: ".col-lg-3",
      layoutMode: "fitRows",
    });

    // Filter functions
    $(".category-filter").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $(".category-filter button").removeClass("active");
      $(this).addClass("active");
      $grid.isotope({ filter: filterValue });
    });

    // Handle inquiry form
    function openInquiryForm(productName) {
      // Close product modal if open
      const productModal = bootstrap.Modal.getInstance(
        document.getElementById("productModal")
      );
      if (productModal) {
        productModal.hide();
      }

      // Set product name in inquiry form
      $("#productName").val(productName);

      // Pre-check the corresponding product checkbox
      $(
        `input[type="checkbox"][value="${
          productName.toLowerCase().split(" ")[0]
        }"]`
      ).prop("checked", true);

      // Show inquiry modal
      const inquiryModal = new bootstrap.Modal(
        document.getElementById("inquiryModal")
      );
      inquiryModal.show();
    }

    // Handle all inquiry triggers (both buttons and links)
    document
      .querySelectorAll(".inquiry-trigger, .inquiry-btn")
      .forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const inquiryModal = new bootstrap.Modal(
            document.getElementById("inquiryModal")
          );
          inquiryModal.show();
        });
      });

    // DROPDOWN TOGGLE
    document.getElementById("menu-btn").addEventListener("click", function () {
      navbar.classList.toggle("show-menu");
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
})(jQuery);
