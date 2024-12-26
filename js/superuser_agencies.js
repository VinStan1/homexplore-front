document.addEventListener("DOMContentLoaded", () => {
  // Riferimenti agli elementi principali
  const propertySwitch = document.getElementById("property-switch");
  const table = document.querySelector(".property-table tbody");
  const switchLabel = document.getElementById("switch-label");

  // Funzione per aggiornare lo stato della tabella in base allo switch
  const updateTableState = () => {
    const soldMode = propertySwitch.checked;

    // Cambia il testo dello switch
    switchLabel.textContent = soldMode ? "Sold" : "For Sale";

    // Aggiungi/rimuovi la classe hidden dalla colonna venduta
    document.querySelectorAll(".sold-date-column").forEach((col) => {
      if (soldMode) {
        col.classList.remove("hidden");
      } else {
        col.classList.add("hidden");
      }
    });

    // Mostra o nasconde i pulsanti "View Details"
    document.querySelectorAll(".btn-view-details").forEach((button) => {
      const soldColumn = button.closest("tr").querySelector(".sold-date-column");
      if (soldColumn && !soldColumn.classList.contains("hidden")) {
        button.classList.add("hidden");
      } else {
        button.classList.remove("hidden");
      }
    });
  };

  // Aggiorna lo stato della tabella al cambio dello switch
  propertySwitch.addEventListener("change", updateTableState);

  // Aggiorna lo stato iniziale della tabella (nel caso in cui sia già selezionato)
  updateTableState();
});

// Gestione della chiusura del popup
document.querySelector(".close-popup").addEventListener("click", () => {
  const popup = document.getElementById("agency-popup");
  popup.classList.add("hidden");
});

// Mostra il popup quando viene cliccato il pulsante "View Agency"
document.querySelectorAll(".btn-view-agency").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = document.getElementById("agency-popup");
    popup.classList.remove("hidden");
  });
});

// Chiudi il popup cliccando fuori dall'area del contenuto
window.addEventListener("click", (event) => {
  const popup = document.getElementById("agency-popup");
  if (event.target === popup) {
    popup.classList.add("hidden");
  }
});
