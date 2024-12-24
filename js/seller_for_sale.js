// JavaScript for Popup
document.querySelectorAll(".view-reservations").forEach((button) => {
    button.addEventListener("click", () => {
      const popup = document.getElementById("reservation-popup");
      popup.classList.remove("hidden");
    });
  });

  document.querySelector(".close-popup").addEventListener("click", () => {
    const popup = document.getElementById("reservation-popup");
    popup.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    const popup = document.getElementById("reservation-popup");
    if (event.target === popup) {
      popup.classList.add("hidden");
    }
  });