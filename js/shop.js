document.addEventListener("DOMContentLoaded", () => {
  // Category filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.dataset.category;

      // Filter products
      products.forEach((product) => {
        if (category === "all" || product.dataset.category === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });

  // Add to Cart functionality
  const cartItems = [];
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card");
      const productInfo = {
        id: product.dataset.id,
        name: product.querySelector(".product-title").textContent,
        price: product.querySelector(".product-price").dataset.price,
        image: product.querySelector(".product-image img").src,
      };

      cartItems.push(productInfo);
      updateCart();
    });
  });

  function updateCart() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }

  const quantityInput = document.getElementById("quantity");
  const quantityType = document.getElementById("quantityType");
  const totalPrice = document.getElementById("totalPrice");

  function updatePrice() {
    const quantity = parseInt(quantityInput.value);
    const type = quantityType.value;
    const basePrice = type === "pieces" ? 100 : 50; // Price per piece/kg
    const total = quantity * basePrice;
    totalPrice.textContent = `₹${total.toFixed(2)}`;
  }

  quantityInput.addEventListener("change", updatePrice);
  quantityType.addEventListener("change", updatePrice);

  // Make entire product card clickable
  const productCards = document.querySelectorAll(".product-item");
  productCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Get product details from data attributes
      const productId = this.dataset.productId;
      const productDetails = {
        name: this.dataset.name,
        price: this.dataset.price,
        weight: this.dataset.weight,
        description: this.dataset.description,
        stock: this.dataset.stock,
        images: JSON.parse(this.dataset.images),
      };
      updateProductModal(productDetails);
      // Show modal
      const modal = new bootstrap.Modal(
        document.getElementById("productModal")
      );
      modal.show();
    });
  });

  // Update modal content
  function updateProductModal(product) {
    const modal = document.getElementById("productModal");

    // Update carousel images
    const carousel = modal.querySelector(".carousel-inner");
    carousel.innerHTML = product.images
      .map(
        (img, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${img}" class="d-block w-100" alt="${product.name}">
      </div>
    `
      )
      .join("");

    // Update product info
    modal.querySelector(".product-title").textContent = product.name;
    modal.querySelector(".product-description").innerHTML = `
      <p>${product.description}</p>
      <div class="product-meta">
        <p><strong>Weight per Pack:</strong> ${product.weight}</p>
        <p><strong>Stock Status:</strong> ${
          product.stock > 0 ? "In Stock" : "Out of Stock"
        }</p>
        <p><strong>Price:</strong> ₹${product.price}/pack</p>
      </div>
    `;

    // Update form
    const quantityInput = modal.querySelector("#quantity");
    const totalPrice = modal.querySelector("#totalPrice");

    quantityInput.max = product.stock;
    quantityInput.value = 1;

    // Update price calculation
    function calculateTotal() {
      const quantity = parseInt(quantityInput.value);
      const total = quantity * product.price;
      totalPrice.textContent = `₹${total.toFixed(2)}`;
    }

    quantityInput.addEventListener("change", calculateTotal);
    calculateTotal();
  }
});
