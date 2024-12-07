document.addEventListener("DOMContentLoaded", () => {
    const mainPhoto = document.getElementById("main-photo");
    const thumbnails = document.querySelectorAll(".thumbnail-photos img");
    const overlay = document.getElementById("slider-overlay");
    const closeBtn = document.getElementById("close-slider");
    const slidesContainer = document.querySelector(".slides-container");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const navigationDots = document.querySelector(".navigation-dots");
    let currentIndex = 0;
  
    function openOverlay(index) {
      currentIndex = index;
      overlay.classList.add("active");
      updateSlider();
    }
  
    function closeOverlay() {
      overlay.classList.remove("active");
    }
  
    function updateSlider() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots(); // Sincronizza i pallini
    }
  
    mainPhoto.addEventListener("click", () => openOverlay(0));
  
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => openOverlay(index + 1));
    });
  
    closeBtn.addEventListener("click", closeOverlay);
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });
  
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });

     // Crea i pallini di navigazione
     function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
                updateDots();
            });
            navigationDots.appendChild(dot);
        });
    }

    // Aggiorna i pallini attivi
    function updateDots() {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }
    createDots();
  });