document
  .getElementById("toggle-advanced")
  .addEventListener("click", function () {
    var advancedParams = document.getElementById("advanced-params");
    advancedParams.classList.toggle("active");
    this.classList.toggle("active");

    if (advancedParams.classList.contains("active")) {
      this.innerHTML = "Hide advanced parameters";
    } else {
      this.innerHTML = "Show advanced parameters";
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const showAnalyticsBtn = document.getElementById("show-analytics");
  const analyticsPopup = document.getElementById("analytics-popup");
  const closeBtn = document.querySelector(".close-btn");

  // Controlla se l'utente è autenticato
  showAnalyticsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isAuthenticated = localStorage.getItem("authToken");

    if (isAuthenticated) {
      // Mostra il popup delle analytics
      analyticsPopup.classList.remove("hidden");
      generateAnalytics();
    } else {
      alert("You must be logged in to view analytics.");
    }
  });

  // Chiudi il popup
  closeBtn.addEventListener("click", () => {
    analyticsPopup.classList.add("hidden");
  });

  // Nascondi il popup cliccando fuori dal contenuto
  analyticsPopup.addEventListener("click", (event) => {
    if (event.target === analyticsPopup) {
      analyticsPopup.classList.add("hidden");
    }
  });

  // Genera i grafici delle analytics
  function generateAnalytics() {
    // Dati mockati per il grafico 1: Prezzo medio al metro quadro per quartiere
    const neighborhoods = [
      "Downtown",
      "Midtown",
      "Manhattan",
      "Brooklyn",
      "Queens",
    ];
    const avgPrices = [1500, 1200, 1000, 800, 700]; // Prezzo medio (mock)

    // Dati mockati per il grafico 2: Aumenti dei prezzi al metro quadro negli ultimi mesi
    const months = getLastMonths(6); // Calcola gli ultimi 6 mesi dinamicamente
    const priceIncreases = [5, 8, 12, 20, 15]; // Incrementi in percentuale

    // Grafico: Prezzo medio al metro quadro per quartiere
    const avgPriceCtx = document
      .getElementById("avgPriceChart")
      .getContext("2d");
    new Chart(avgPriceCtx, {
      type: "bar",
      data: {
        labels: neighborhoods,
        datasets: [
          {
            label: "Avg Price per Sqft ($)",
            data: avgPrices,
            backgroundColor: [
              "#4caf50",
              "#2196f3",
              "#ff9800",
              "#e91e63",
              "#9c27b0",
            ],
            borderColor: "#333",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Price ($)",
              color: "#666",
            },
          },
        },
      },
    });

    // Grafico: Incrementi di prezzo per quartiere negli ultimi mesi
    const priceIncreaseCtx = document
      .getElementById("priceIncreaseChart")
      .getContext("2d");
    new Chart(priceIncreaseCtx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Price Increase (%)",
            data: priceIncreases,
            fill: true,
            borderColor: "#ff5722",
            backgroundColor: "rgba(255, 87, 34, 0.3)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Increase (%)",
              color: "#666",
            },
          },
        },
      },
    });
  }

  // Funzione per ottenere gli ultimi n mesi
  function getLastMonths(n) {
    const months = [];
    const now = new Date();
    for (let i = 0; i < n; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.unshift(
        date.toLocaleString("default", { month: "short", year: "numeric" })
      );
    }
    return months;
  }
});
