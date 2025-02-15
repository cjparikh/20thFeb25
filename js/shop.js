document.addEventListener("DOMContentLoaded", () => {
  // Initialize Isotope with a specific selector
  const grid = document.querySelector(".products-grid");
  const iso = new Isotope(grid, {
    itemSelector: ".col-lg-3",
    layoutMode: "fitRows",
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

      iso.arrange({
        filter: filterValue,
      });
    });
  });

  // Product Modal and Inquiry Form Handling
  function openInquiryForm(productName) {
    // Close product modal if open
    const productModal = bootstrap.Modal.getInstance(
      document.getElementById("productModal")
    );
    if (productModal) {
      productModal.hide();
    }

    // Set product name in hidden field
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

  // RESTORE SCROLLING X BUTTON
  function restoreScrolling() {
    // Remove modal-specific classes and styles
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // Remove any leftover backdrop
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  }

  // Also update your existing modal handling
  document.addEventListener("hidden.bs.modal", function (event) {
    restoreScrolling();
  });

  // Handle all inquiry buttons (both in cards and modal)
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("inquiry-btn")) {
      e.preventDefault();
      e.stopPropagation();
      const productName = e.target.getAttribute("data-product-name");
      openInquiryForm(productName);
    }
  });

  // Product click handler
  document.querySelectorAll(".product-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      if (!e.target.classList.contains("inquiry-btn")) {
        const productData = {
          name: this.getAttribute("data-name"),
          description: this.getAttribute("data-description"),
          images: JSON.parse(this.getAttribute("data-images")),
        };
        updateProductModal(productData);
      }
    });
  });

  // Update product modal content
  function updateProductModal(product) {
    const modal = document.getElementById("productModal");

    // Update content
    modal.querySelector(".product-title").textContent = product.name;
    modal.querySelector(".product-description").textContent =
      product.description;
    modal
      .querySelector(".inquiry-btn")
      .setAttribute("data-product-name", product.name);

    // Update carousel
    const carouselInner = modal.querySelector(".carousel-inner");
    carouselInner.innerHTML = "";
    product.images.forEach((img, index) => {
      carouselInner.innerHTML += `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <img src="${img}" class="d-block w-100" alt="${
        product.name
      }">
                </div>
            `;
    });

    // Show modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }

  // Form validation and submission
  const inquiryForm = document.getElementById("inquiryForm");

  // Form validation handler
  const form = document.getElementById("inquiryForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Add validation class to show validation styles
    form.classList.add("was-validated");

    // Check if form is valid
    if (!form.checkValidity()) {
      // Stop here if form is invalid
      return;
    }

    // Check if at least one checkbox is selected
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    if (!Array.from(checkboxes).some((cb) => cb.checked)) {
      const checkboxGroup = document.querySelector(".checkbox-group");
      checkboxGroup.classList.add("invalid");
      return;
    }

    // Get form data
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
        "https://script.google.com/macros/s/AKfycby4nHI0UaZTOoRZYkU59zGaHxkFTpTl_N3N7kDb7nHUKDVk0BEV0gz7cDgpxwldX-c/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors", // Change this from 'cors' to 'no-cors'
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Since we're using no-cors, we can't read the response
      // So we'll assume success if we get here
      alert("Thank you for your inquiry! We will contact you soon.");

      // Reset form and close modal
      form.reset();
      form.classList.remove("was-validated");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("inquiryModal")
      );
      modal?.hide();

      // Clean up modal
      restoreScrolling();
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error submitting your form. Please try again."
      );
    }
  });

  // Remove invalid state on input
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("is-invalid");
      }
    });
  });

  // Remove invalid class on input
  document
    .querySelectorAll("#inquiryForm input, #inquiryForm textarea")
    .forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("invalid");
      });
    });

  // Add client-side validation for phone number
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(this.value)) {
      this.setCustomValidity("Please enter a valid phone number");
    } else {
      this.setCustomValidity("");
    }
  });

  // Add client-side validation for email
  const emailInput = document.getElementById("email");
  emailInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      this.setCustomValidity("Please enter a valid email address");
    } else {
      this.setCustomValidity("");
    }
  });

  // Add input validation messages
  const inputs = document.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (!this.value) {
        this.setCustomValidity("This field is required");
      } else {
        this.setCustomValidity("");
      }
    });
  });
});
