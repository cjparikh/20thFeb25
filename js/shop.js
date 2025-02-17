document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. Category Filtering with Isotope
  // ==========================================================================

  const grid = document.querySelector(".products-grid");
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
  // 2. Category Filter Scroll Buttons
  // ==========================================================================

  const filterContainer = document.querySelector(".category-filter");
  const scrollLeftButton = document.querySelector(".scroll-left");
  const scrollRightButton = document.querySelector(".scroll-right");

  scrollLeftButton.addEventListener("click", function () {
    filterContainer.scrollLeft -= 150; // Adjust scroll amount as needed
  });

  scrollRightButton.addEventListener("click", function () {
    filterContainer.scrollLeft += 150; // Adjust scroll amount as needed
  });

  // ==========================================================================
  // 3. Back to Top Button
  // ==========================================================================

  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  // ==========================================================================
  // 4. Inquiry Form Handling
  // ==========================================================================

  function openInquiryForm(productName) {
    document.getElementById("productName").value = productName;

    // Check the corresponding checkbox
    const productType = productName.toLowerCase().split(" ")[0];
    const checkbox = document.querySelector(
      `input[type="checkbox"][value="${productType}"]`
    );
    if (checkbox) {
      checkbox.checked = true;
    }

    // Show inquiry modal
    const inquiryModal = new bootstrap.Modal(
      document.getElementById("inquiryModal")
    );
    inquiryModal.show();
  }

  // Restore scrolling functionality
  function restoreScrolling() {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  }

  // Modal cleanup
  document.addEventListener("hidden.bs.modal", restoreScrolling);

  // Handle inquiry buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("inquiry-btn")) {
      e.preventDefault();
      e.stopPropagation();
      const productName = e.target.getAttribute("data-product-name");
      openInquiryForm(productName);
    }
  });

  // ==========================================================================
  // 5. Form Handling
  // ==========================================================================

  const form = document.getElementById("inquiryForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    form.classList.add("was-validated");

    // Validation checks
    if (!form.checkValidity()) return;

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    if (!Array.from(checkboxes).some((cb) => cb.checked)) {
      document.querySelector(".checkbox-group").classList.add("invalid");
      return;
    }

    // Prepare form data
    const formData = new FormData(form);
    const data = {
      productName: formData.get("productName"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      streetAddress: formData.get("streetAddress"),
      streetAddress2: formData.get("streetAddress2"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      products: Array.from(formData.getAll("products[]")),
      comments: formData.get("comments"),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwO5LJZYL6vRsMkcodq0CKfJBXBJ2rvZ58X5khQDwj5ee7rFu5cYxvqcxqP7kkyewg/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Thank you for your inquiry! We will contact you soon.");

      // Reset form and close modal
      form.reset();
      form.classList.remove("was-validated");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("inquiryModal")
      );
      modal?.hide();
      restoreScrolling();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error submitting your form. Please try again."
      );
    }
  });

  // ==========================================================================
  // 6. Form Validation Handlers
  // ==========================================================================

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("is-invalid");
      }
      this.classList.remove("invalid");
    });
  });

  // Phone number validation
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    this.setCustomValidity(
      phoneRegex.test(this.value) ? "" : "Please enter a valid phone number"
    );
  });

  // Email validation
  const emailInput = document.getElementById("email");
  emailInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.setCustomValidity(
      emailRegex.test(this.value) ? "" : "Please enter a valid email address"
    );
  });

  // Required field validation
  document.querySelectorAll("input[required]").forEach((input) => {
    input.addEventListener("input", function () {
      this.setCustomValidity(this.value ? "" : "This field is required");
    });
  });
});
