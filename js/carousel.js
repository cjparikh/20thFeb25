/**
 * Universal Product Carousel JavaScript
 * Handles carousels with 1-4 products dynamically
 * Auto-rotation, hover pause, click navigation, keyboard controls
 */

class ProductCarousel {
  constructor() {
    this.carouselSlides = document.getElementById("carouselSlides");
    this.indicators = document.querySelectorAll(".carousel-indicator");
    this.totalSlides = this.indicators.length;
    this.currentSlide = 0;
    this.autoSlideInterval = null;
    this.isPaused = false;
    this.autoSlideDelay = 4000; // 4 seconds

    this.init();
  }

  init() {
    if (!this.carouselSlides || this.totalSlides === 0) {
      console.log("No carousel found or no slides available");
      return;
    }

    // Set data attribute for CSS styling
    this.carouselSlides.setAttribute("data-slides", this.totalSlides);

    // If only one slide, don't initialize carousel functionality
    if (this.totalSlides === 1) {
      console.log("Single product detected - carousel disabled");
      return;
    }

    // Initialize carousel for multiple products
    this.setupEventListeners();
    this.startAutoSlide();

    console.log(`Carousel initialized with ${this.totalSlides} slides`);
  }

  setupEventListeners() {
    // Click handlers for indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
        this.restartAutoSlide();
      });
    });

    // Hover pause functionality
    const carousel = document.querySelector(".product-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", () => {
        this.isPaused = true;
        this.stopAutoSlide();
      });

      carousel.addEventListener("mouseleave", () => {
        this.isPaused = false;
        this.startAutoSlide();
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.previousSlide();
        this.restartAutoSlide();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
        this.restartAutoSlide();
      }
    });

    // Pause carousel when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoSlide();
      } else if (!this.isPaused) {
        this.startAutoSlide();
      }
    });

    // Touch/swipe support for mobile
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;

    this.carouselSlides.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.carouselSlides.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }

  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum distance for swipe
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.previousSlide();
      }
      this.restartAutoSlide();
    }
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    const slideWidth = 100 / this.totalSlides; // Percentage width per slide
    const translateX = -(slideIndex * slideWidth);

    this.carouselSlides.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === slideIndex);
    });

    // Update active slide class
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === slideIndex);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.goToSlide(this.currentSlide);
  }

  startAutoSlide() {
    if (this.totalSlides <= 1) return; // Don't auto-slide for single product

    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    // Wait 5 seconds before restarting auto-slide after manual interaction
    setTimeout(() => {
      if (!this.isPaused) {
        this.startAutoSlide();
      }
    }, 5000);
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the carousel
  const carousel = new ProductCarousel();

  // Make carousel globally available for debugging
  window.productCarousel = carousel;
});
