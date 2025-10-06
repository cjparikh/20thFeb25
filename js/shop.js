document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. Category Filtering with Isotope
  // ==========================================================================
  const grid = document.querySelector(".products-grid");
  if (!grid) return;

  const iso = new Isotope(grid, {
    itemSelector: ".col-lg-3",
    layoutMode: "fitRows",
  });

  // Add animation delay for initial load
  document.querySelectorAll(".col-lg-3").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Filter button functionality
  const filterButtons = document.querySelectorAll(".category-filter .btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      iso.arrange({ filter: filterValue });
    });
  });

  // ==========================================================================
  // 2. Category Filter Scroll Navigation
  // ==========================================================================
  const filterContainer = document.querySelector(".category-filter");
  const prevBtn = document.querySelector(".scroll-left");
  const nextBtn = document.querySelector(".scroll-right");

  if (filterContainer && prevBtn && nextBtn) {
    const scrollAmount = 200;

    prevBtn.addEventListener("click", () => {
      filterContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      filterContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    function updateNavButtons() {
      const { scrollLeft, scrollWidth, clientWidth } = filterContainer;
      prevBtn.style.opacity = scrollLeft > 0 ? "1" : "0";
      nextBtn.style.opacity =
        scrollLeft < scrollWidth - clientWidth - 10 ? "1" : "0";
    }

    filterContainer.addEventListener("scroll", updateNavButtons);
    window.addEventListener("resize", updateNavButtons);

    // Initial check
    updateNavButtons();
  }

  // ==========================================================================
  // 3. Back to Top Button
  // ==========================================================================
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("active");
      } else {
        backToTopButton.classList.remove("active");
      }
    });
  }

  // ==========================================================================
  // 4. Inquiry Button Handler
  // ==========================================================================
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("inquiry-btn")) {
      e.preventDefault();
      e.stopPropagation();
      const productName = e.target.getAttribute("data-product-name");
      window.formHandlers?.openInquiryForm(productName);
    }
  });

  // Modal cleanup
  document.addEventListener("hidden.bs.modal", () => {
    window.formHandlers?.restoreScrolling();
  });

  // ==========================================================================
  // 5. Window Resize Handler
  // ==========================================================================
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      iso.arrange();
    }, 250);
  });
});
