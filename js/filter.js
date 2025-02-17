document.addEventListener("DOMContentLoaded", function () {
  // Initialize Isotope with proper settings
  const grid = document.querySelector(".products-grid");
  if (!grid) return;

  // Wait for images to load
  imagesLoaded(grid, function () {
    const iso = new Isotope(grid, {
      itemSelector: ".col-lg-3",
      layoutMode: "fitRows",
      transitionDuration: "0.4s",
      hiddenStyle: {
        opacity: 0,
        transform: "scale(0.5)",
      },
      visibleStyle: {
        opacity: 1,
        transform: "scale(1)",
      },
    });

    // Filter functions
    const filterButtons = document.querySelectorAll(".category-filter .btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-filter");

        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        // Handle the all (*) filter case
        if (filterValue === "*") {
          iso.arrange({ filter: "*" });
        } else {
          // Filter items
          iso.arrange({
            filter: filterValue,
            // Force re-layout
            transitionDuration: 0,
          });
        }

        // Re-enable transitions after layout
        setTimeout(() => {
          iso.options.transitionDuration = "0.4s";
        }, 100);
      });
    });

    // Check for URL hash on page load
    const hash = window.location.hash.substr(1);
    if (hash) {
      // Find button with matching filter value
      const targetButton = document.querySelector(`[data-filter=".${hash}"]`);
      if (targetButton) {
        // Trigger click after a short delay to ensure proper layout
        setTimeout(() => {
          targetButton.click();
          // Scroll to products section
          const productsSection = document.querySelector(".category-filter");
          if (productsSection) {
            productsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);
      }
    }
  });
});
