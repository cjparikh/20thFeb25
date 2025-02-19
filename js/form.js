document.addEventListener("DOMContentLoaded", () => {
  // Product categories and their variants
  const productCategoriesEn = {
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

  const productCategoriesHi = {
    गेहूं: [
      // Gehun - Wheat
      {
        id: "gehu-lokmani",
        name: "पारिख लोकमनी",
        value: "गेहूं रिसर्च लोकमनी",
      },
      {
        id: "gehu-sharbati",
        name: "पारिख शरबती",
        value: "गेहूं रिसर्च पारिख शरबती",
      },
      {
        id: "gehu-sharbati-plus",
        name: "पारिख शरबती++",
        value: "गेहूं रिसर्च पारिख शरबती++",
      },
      {
        id: "gehu-nilamani",
        name: "पारिख नीलमणि",
        value: "गेहूं रिसर्च पारिख नीलमणि",
      },
    ],
    बाजरा: [
      // Bajra - Millet
      { id: "bajra-namoh", name: "पारिख नमोह", value: "बाजरा नमोह" },
      { id: "bajra-169", name: "पारिख-169", value: "बाजरा पारिख-169" },
      { id: "bajra-44", name: "सुपर प्रशांत 44++", value: "बाजरा सुपर 44+" },
      { id: "bajra-552", name: "पारिख 552", value: "बाजरा पारिख 552" },
    ],
    मूंग: [
      // Moong - Green Gram
      { id: "moong-neel", name: "पारिख नील", value: "मूंग नील" },
      { id: "moong-neel-plus", name: "पारिख नील++", value: "मूंग नील++" },
    ],
    उड़द: [
      // Urad - Black Gram
      {
        id: "urad-shreenath",
        name: "पारिख श्रीनाथ",
        value: "उड़द श्रीनाथ",
      },
      {
        id: "urad-superfine",
        name: "पारिख सुपर फाइन",
        value: "उड़द सुपर फाइन",
      },
    ],
    तिल: [
      // Til - Sesame
      { id: "til-neer", name: "पारिख नीर", value: "तिल नीर" },
      {
        id: "til-parth-plus",
        name: "पारिख पार्थ++",
        value: "तिल पार्थ++",
      },
    ],
    ज्वार: [
      // Jwar - Sorghum
      {
        id: "jwar-bumpergrass",
        name: "पारिख बंपरग्रास",
        value: "ज्वार बंपरग्रास",
      },
      {
        id: "jwar-ssg-788",
        name: "पारिख एसएसजी-788",
        value: "ज्वार एसएसजी-788",
      },
    ],
    अरंडी: [
      // Arandi - Castor
      { id: "arandi-om", name: "पारिख ओम", value: "अरंडी ओम पारिख" },
      { id: "arandi-yoddha", name: "पारिख योद्धा", value: "अरंडी योद्धा" },
      {
        id: "arandi-super-prashant",
        name: "सुपर प्रशांत 09",
        value: "अरंडी सुपर प्रशांत 09",
      },
    ],
    जीरा: [{ id: "jeera-heera", name: "पारिख हीरा", value: "जीरा हीरा" }], // Jeera - Cumin
    सौंफ: [
      // Saunf - Fennel
      { id: "saunf-23", name: "पारिख-23", value: "सौंफ पारिख-23" },
      {
        id: "saunf-hariyali",
        name: "पारिख हरियाली",
        value: "सौंफ हरियाली",
      },
    ],
    चना: [
      // Chana - Gram Seeds
      {
        id: "chana-gangour",
        name: "पारिख गंगौर",
        value: "चना गंगौर",
      },
    ],
    मूंगफली: [
      // Mungfali - Groundnut
      { id: "mungfali-sona", name: "पारिख सोना", value: "मूंगफली सोना" },
      {
        id: "mungfali-44",
        name: "सुपर पारिख 44++",
        value: "मूंगफली सुपर पारिख 44++",
      },
    ],
    ईसबगोल: [
      // Isabgol
      { id: "isabgol-gold", name: "पारिख गोल्ड", value: "ईसबगोल पारिख गोल्ड" },
    ],
    सरसों: [
      // Sarson - Mustard
      { id: "sarson-45", name: "पारिख-45", value: "सरसों पारिख-45" },
      { id: "sarson-mahi", name: "पारिख माही", value: "सरसों पारिख माही" },
    ],
  };
  const productCategoriesGu = {
    ઘઉં: [
      // Wheat
      {
        id: "gehu-lokmani",
        name: "પારીખ લોકમની",
        value: "ઘઉં રિસર્ચ લોકમની",
      },
      {
        id: "gehu-sharbati",
        name: "પારીખ શરબતી",
        value: "ઘઉં રિસર્ચ પારીખ શરબતી",
      },
      {
        id: "gehu-sharbati-plus",
        name: "પારીખ શરબતી++",
        value: "ઘઉં રિસર્ચ પારીખ શરબતી++",
      },
      {
        id: "gehu-nilamani",
        name: "પારીખ નીલમણિ",
        value: "ઘઉં રિસર્ચ પારીખ નીલમણિ",
      },
    ],
    બાજરી: [
      // Millet
      { id: "bajra-namoh", name: "પારીખ નમોઃ", value: "બાજરી નમોઃ" },
      { id: "bajra-169", name: "પારીખ-169", value: "બાજરી પારીખ-169" },
      { id: "bajra-44", name: "સુપર પ્રશાંત 44++", value: "બાજરી સુપર 44+" },
      { id: "bajra-552", name: "પારીખ 552", value: "બાજરી પારીખ 552" },
    ],
    મગ: [
      // Green Gram
      { id: "moong-neel", name: "પારીખ નીલ", value: "મગ નીલ" },
      { id: "moong-neel-plus", name: "પારીખ નીલ++", value: "મગ નીલ++" },
    ],
    ઉડદ: [
      // Black Gram
      {
        id: "urad-shreenath",
        name: "પારીખ શ્રીનાથ",
        value: "ઉડદ શ્રીનાથ",
      },
      {
        id: "urad-superfine",
        name: "પારીખ સુપર ફાઈન",
        value: "ઉડદ સુપર ફાઈન",
      },
    ],
    તલ: [
      // Sesame
      { id: "til-neer", name: "પારીખ નીર", value: "તલ નીર" },
      {
        id: "til-parth-plus",
        name: "પારીખ પાર્થ++",
        value: "તલ પાર્થ++",
      },
    ],
    જવાર: [
      // Sorghum
      {
        id: "jwar-bumpergrass",
        name: "પારીખ બમ્પરગ્રાસ",
        value: "જવાર બમ્પરગ્રાસ",
      },
      {
        id: "jwar-ssg-788",
        name: "પારીખ SSG-788",
        value: "જવાર SSG-788",
      },
    ],
    એરંડા: [
      // Castor
      { id: "arandi-om", name: "પારીખ ઓમ", value: "એરંડા ઓમ પારીખ" },
      { id: "arandi-yoddha", name: "પારીખ યોધ્ધા", value: "એરંડા યોધ્ધા" },
      {
        id: "arandi-super-prashant",
        name: "સુપર પ્રશાંત 09",
        value: "એરંડા સુપર પ્રશાંત 09",
      },
    ],
    જીરું: [{ id: "jeera-heera", name: "પારીખ હીરા", value: "જીરું હીરા" }], // Cumin
    સૌફ: [
      // Fennel
      { id: "saunf-23", name: "પારીખ-23", value: "સૌફ પારીખ-23" },
      {
        id: "saunf-hariyali",
        name: "પારીખ હરિયાળી",
        value: "સૌફ હરિયાળી",
      },
    ],
    ચણા: [
      // Gram Seeds
      {
        id: "chana-gangour",
        name: "પારીખ ગંગૌર",
        value: "ચણા ગંગૌર",
      },
    ],
    મગફળી: [
      // Groundnut
      { id: "mungfali-sona", name: "પારીખ સોના", value: "મગફળી સોના" },
      {
        id: "mungfali-44",
        name: "સુપર પારીખ 44++",
        value: "મગફળી સુપર પારીખ 44++",
      },
    ],
    ઈસબગુલ: [
      // Isabgol
      { id: "isabgol-gold", name: "પારીખ ગોલ્ડ", value: "ઈસબગુલ પારીખ ગોલ્ડ" },
    ],
    રાય: [
      // Mustard (instead of સરસો)
      { id: "rai-45", name: "પારીખ-45", value: "રાય પારીખ-45" },
      { id: "rai-mahi", name: "પારીખ માહી", value: "રાય પારીખ માહી" },
    ],
  };

  // Select appropriate product categories based on current page
  function getProductCategories() {
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.includes("hindi")) {
      return productCategoriesHi;
    } else if (currentPath.includes("guj")) {
      return productCategoriesGu;
    } else {
      return productCategoriesEn;
    }
  }

  // Form handling functions
  function initializeForm() {
    const form = document.getElementById("inquiryForm");
    if (!form) return;

    // Generate category checkboxes dynamically
    const productCategories = getProductCategories();

    const checkboxGroup = form.querySelector(".checkbox-group");
    Object.entries(productCategories).forEach(([category, products]) => {
      // Create main category
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category-group";

      const mainCategory = document.createElement("div");
      mainCategory.className = "checkbox-item main-category";

      // Translate category names based on language
      const categoryLabel =
        category.charAt(0).toUpperCase() + category.slice(1);

      mainCategory.innerHTML = `
         <input type="checkbox" 
               id="${category}" 
               name="categories[]" 
               value="${category}"
               class="category-checkbox"
        />
        <label for="${category}">${categoryLabel}</label>
      `;

      // Create subcategories container
      const subcategoriesDiv = document.createElement("div");
      subcategoriesDiv.className = "subcategory-group";
      subcategoriesDiv.setAttribute("data-parent", category);

      // Add subcategories with translated names
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
      //   alert(
      //     "Sorry, there was an error submitting your form. Please try again."
      //   );
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
