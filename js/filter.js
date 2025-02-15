document.addEventListener("DOMContentLoaded", function () {
  // Check for URL parameters
  const urlParams = new URLSearchParams(window.location.hash.substr(1));
  const category = window.location.hash.substr(1); // Remove the # symbol

  if (category) {
    setTimeout(function () {
      // Find and click the corresponding filter button
      const filterBtn = document.querySelector(`#${category}`);
      if (filterBtn) {
        filterBtn.click();
        // Scroll to the products section
        const productsSection = document.querySelector(".category-filter");
        if (productsSection) {
          productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, 500); // Small delay to ensure DOM is ready
  }

  // Initialize Isotope after images are loaded
  var grid = document.querySelector(".row.g-4");
  imagesLoaded(grid, function () {
    var iso = new Isotope(grid, {
      itemSelector: ".col-lg-3",
      layoutMode: "fitRows",
    });

    // Filter buttons click handler
    var filterButtons = document.querySelectorAll(".category-filter .btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        var filterValue = this.getAttribute("data-filter");
        // Remove dot from class name for filtering
        filterValue =
          filterValue === "*" ? "*" : "." + filterValue.substring(1);

        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        iso.arrange({
          filter: filterValue,
        });
      });
    });
  });
});
