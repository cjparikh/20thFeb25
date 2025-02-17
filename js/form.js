document.addEventListener("DOMContentLoaded", () => {
  // Product categories and their variants
  const productCategories = {
    wheat: [
      {
        id: "wheat-lokmani",
        name: "Parikh Lokmani",
        value: "Wheat Research Lokmani",
      },
      {
        id: "wheat-sharbati",
        name: "Parikh Sharbati",
        value: "Wheat Research Parikh Sharbati",
      },
      {
        id: "wheat-sharbati-plus",
        name: "Parikh Sharbati++",
        value: "Wheat Research Parikh Sharbati++",
      },
      {
        id: "wheat-nilamani",
        name: "Parikh Nilamani",
        value: "Wheat Research Parikh Nilamani",
      },
    ],
    bajra: [
      { id: "bajra-namoh", name: "Parikh Namoh", value: "Bajra Namoh" },
      { id: "bajra-169", name: "Parikh-169", value: "Bajra Parikh-169" },
      { id: "bajra-44", name: "SuperPrashant 44++", value: "Bajra Super 44+" },
      { id: "bajra-552", name: "Parikh 552", value: "Bajra Parikh 552" },
    ],
    moong: [
      { id: "moong-neel", name: "Parikh Neel", value: "Moong Neel" },
      { id: "moong-neel-plus", name: "Parikh Neel++", value: "Moong Neel++" },
    ],
    urad: [
      {
        id: "urad-shreenath",
        name: "Parikh Shreenath",
        value: "Urad Shreenath",
      },
      {
        id: "urad-superfine",
        name: "Parikh Super Fine",
        value: "Urad Super Fine",
      },
    ],
    sesame: [
      { id: "sesame-neer", name: "Parikh Neer", value: "Sesame Neer" },
      {
        id: "sesame-parth-plus",
        name: "Parikh Parth++",
        value: "Sesame Parth++",
      },
    ],
    sorghum: [
      {
        id: "sorghum-bumpergrass",
        name: "Parikh BumperGrass",
        value: "Sorghum BumperGrass",
      },
      {
        id: "sorghum-ssg-788",
        name: "Parikh SSG-788",
        value: "Sorghum SSG-788",
      },
    ],
    castor: [
      { id: "castor-om", name: "Parikh Om", value: "Castor Om Parikh" },
      { id: "castor-yoddha", name: "Parikh Yoddha", value: "Castor Yoddha" },
      {
        id: "castor-super-prashant",
        name: "Super Prashant 09",
        value: "Castor Super Prashant 09",
      },
    ],
    cumin: [{ id: "cumin-heera", name: "Parikh Heera", value: "Cumin Heera" }],
    fennel: [
      { id: "fennel-23", name: "Parikh-23", value: "Fennel Parikh-23" },
      {
        id: "fennel-hariyali",
        name: "Parikh Hariyali",
        value: "Fennel Hariyali",
      },
    ],
    gramseeds: [
      {
        id: "gram-gangour",
        name: "Parikh Gangour",
        value: "Gram Seeds Gangour",
      },
    ],
    groundnut: [
      { id: "groundnut-sona", name: "Parikh Sona", value: "Groundnut Sona" },
      {
        id: "groundnut-44",
        name: "Super Parikh 44++",
        value: "Groundnut Super Parikh 44++",
      },
    ],
    isabgol: [
      { id: "isabgol-gold", name: "Parikh Gold", value: "Isabgol Parikh Gold" },
    ],
    mustard: [
      { id: "mustard-45", name: "Parikh-45", value: "Mustard Parik-45" },
      { id: "mustard-mahi", name: "Parikh Mahi", value: "Mustard Parikh Mahi" },
    ],
  };

  // Form handling functions
  function initializeForm() {
    const form = document.getElementById("inquiryForm");
    if (!form) return;

    // Generate category checkboxes dynamically
    const checkboxGroup = form.querySelector(".checkbox-group");
    Object.entries(productCategories).forEach(([category, products]) => {
      // Create main category
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category-group";

      const mainCategory = document.createElement("div");
      mainCategory.className = "checkbox-item main-category";
      mainCategory.innerHTML = `
        <input type="checkbox" 
               id="${category}" 
               name="categories[]" 
               value="${category}"
               class="category-checkbox"
        />
        <label for="${category}">${
        category.charAt(0).toUpperCase() + category.slice(1)
      }</label>
      `;

      // Create subcategories container
      const subcategoriesDiv = document.createElement("div");
      subcategoriesDiv.className = "subcategory-group";
      subcategoriesDiv.setAttribute("data-parent", category);

      // Add subcategories
      products.forEach((product) => {
        const subcategoryDiv = document.createElement("div");
        subcategoryDiv.className = "checkbox-item subcategory";
        subcategoryDiv.innerHTML = `
          <input type="checkbox" 
                 id="${product.id}" 
                 name="products[]" 
                 value="${product.value}"
          />
          <label for="${product.id}">${product.name}</label>
        `;
        subcategoriesDiv.appendChild(subcategoryDiv);
      });

      categoryDiv.appendChild(mainCategory);
      categoryDiv.appendChild(subcategoriesDiv);
      checkboxGroup.appendChild(categoryDiv);
    });

    // Handle category checkbox changes
    form.querySelectorAll(".category-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const subcategoryGroup =
          this.closest(".category-group").querySelector(".subcategory-group");

        if (this.checked) {
          subcategoryGroup.classList.add("active");
        } else {
          subcategoryGroup.classList.remove("active");
          subcategoryGroup
            .querySelectorAll("input[type='checkbox']")
            .forEach((cb) => (cb.checked = false));
        }
      });
    });

    // Handle subcategory changes
    form
      .querySelectorAll(".subcategory input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const mainCategory =
            this.closest(".category-group").querySelector(".category-checkbox");
          if (this.checked) {
            mainCategory.checked = true;
          }
        });
      });

    // Form validation
    form.addEventListener("submit", handleFormSubmit);
    initializeValidation(form);
  }

  // Form submission handler
  async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    form.classList.add("was-validated");

    if (!form.checkValidity()) return;

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    if (!Array.from(checkboxes).some((cb) => cb.checked)) {
      document.querySelector(".checkbox-group").classList.add("invalid");
      return;
    }

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

      alert("Thank you for your inquiry! We will contact you soon.");
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
  }

  // Initialize form validation
  function initializeValidation(form) {
    // Input validation
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        if (this.checkValidity()) {
          this.classList.remove("is-invalid");
        }
        this.classList.remove("invalid");
      });
    });

    // Phone validation
    const phoneInput = form.querySelector("#phone");
    phoneInput?.addEventListener("input", function () {
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      this.setCustomValidity(
        phoneRegex.test(this.value) ? "" : "Please enter a valid phone number"
      );
    });

    // Email validation
    const emailInput = form.querySelector("#email");
    emailInput?.addEventListener("input", function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.setCustomValidity(
        emailRegex.test(this.value) ? "" : "Please enter a valid email address"
      );
    });
  }

  // Helper function to restore scrolling
  function restoreScrolling() {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  }

  // Initialize form when DOM is loaded
  initializeForm();
});
