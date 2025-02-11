document.addEventListener("DOMContentLoaded", function () {
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
