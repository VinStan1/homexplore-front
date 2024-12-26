// JavaScript for Popup
document.querySelectorAll(".btn-view-agency").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = document.getElementById("agency-popup");
    popup.classList.remove("hidden");
  });
});

document.querySelector(".close-popup").addEventListener("click", () => {
  const popup = document.getElementById("agency-popup");
  popup.classList.add("hidden");
});

window.addEventListener("click", (event) => {
  const popup = document.getElementById("agency-popup");
  if (event.target === popup) {
    popup.classList.add("hidden");
  }
});

// Gestisce il comportamento dello switch per alternare tra "For Sale" e "Sold"
document.addEventListener("DOMContentLoaded", () => {
  const propertySwitch = document.getElementById("property-switch");
  const label = document.getElementById("switch-label");
  const soldColumns = document.querySelectorAll(".sold-date-column");

  // Event listener per cambiare lo stato dello switch
  propertySwitch.addEventListener("change", () => {
    if (propertySwitch.checked) {
      label.textContent = "Sold";
      soldColumns.forEach((col) => col.classList.remove("hidden"));
    } else {
      label.textContent = "For Sale";
      soldColumns.forEach((col) => col.classList.add("hidden"));
    }
  });
});

document.querySelectorAll(".btn-remove-agency").forEach((button) => {
  button.addEventListener("click", (e) => {
    const agencyId = e.target.getAttribute("data-agency-id");
    if (confirm(`Are you sure you want to remove agency ID: ${agencyId}?`)) {
      alert(`Agency ID: ${agencyId} removed (mockup).`);
    }
  });
});
