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


document.querySelector("#view-schedule").addEventListener("click", () => {
  const popup = document.getElementById("schedule-popup");
  popup.classList.remove("hidden");
});

document.querySelector("#schedule-popup .close-popup").addEventListener("click", () => {
  const popup = document.getElementById("schedule-popup");
  popup.classList.add("hidden");
});

const showSearchBtn = document.getElementById("show-search");
const searchPopup = document.getElementById("search-popup");
const closeSearchBtn = document.querySelector(".close-search-btn");

showSearchBtn.addEventListener("click", () => {
  searchPopup.classList.remove("hidden");
});

closeSearchBtn.addEventListener("click", () => {
  searchPopup.classList.add("hidden");
});

searchPopup.addEventListener("click", (event) => {
  if (event.target === searchPopup) {
    searchPopup.classList.add("hidden");
  }
});