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

  showAnalyticsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      analyticsPopup.classList.remove("hidden");
      generateAnalytics();
      showChartCard("chart-card1");
      document.getElementById("chart-select").value = "chart-card1";
    } else {
      alert("You must be logged in to view analytics.");
    }
  });

  closeBtn.addEventListener("click", () => {
    analyticsPopup.classList.add("hidden");
  });

  analyticsPopup.addEventListener("click", (event) => {
    if (event.target === analyticsPopup) {
      analyticsPopup.classList.add("hidden");
    }
  });

  const chartSelect = document.getElementById("chart-select");
  chartSelect.addEventListener("change", function () {
    showChartCard(this.value);
  });

  function showChartCard(selectedId) {
    const chartCards = document.querySelectorAll(".chart-card");
    chartCards.forEach((card) => {
      card.style.display = card.id === selectedId ? "block" : "none";
    });
  }

  function generateAnalytics() {
    const neighbourhoodData = [
      { neighbourhood: "Brooklyn", avg_price: 2300.5 },
      { neighbourhood: "Manhattan", avg_price: 2500.5 },
      { neighbourhood: "Queens", avg_price: 2100 },
      { neighbourhood: "Bronx", avg_price: 1900 },
      { neighbourhood: "Staten Island", avg_price: 2200 },
      { neighbourhood: "Harlem", avg_price: 2400 },
      { neighbourhood: "SoHo", avg_price: 2600 }
    ];
    const neighbourhoodLabels = neighbourhoodData.map(item => item.neighbourhood);
    const neighbourhoodPrices = neighbourhoodData.map(item => item.avg_price);

    const chart1Ctx = document.getElementById("avgPriceChart").getContext("2d");
    new Chart(chart1Ctx, {
      type: "bar",
      data: {
        labels: neighbourhoodLabels,
        datasets: [
          {
            label: "Average Price ($)",
            data: neighbourhoodPrices,
            backgroundColor: [
              "#4caf50",
              "#2196f3",
              "#ff9800",
              "#e91e63",
              "#9c27b0",
              "#3f51b5",
              "#00bcd4"
            ],
            borderColor: "#333",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: "top" } },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Average Price ($)" }
          }
        }
      }
    });

    const propertyTypePriceData = [
      { property_type: "Condo", avg_price: 2300.5 },
      { property_type: "House", avg_price: 2500.5 },
      { property_type: "Townhouse", avg_price: 2400 },
      { property_type: "Apartment", avg_price: 2200 }
    ];
    const propertyTypeLabels = propertyTypePriceData.map(item => item.property_type);
    const propertyTypePrices = propertyTypePriceData.map(item => item.avg_price);

    const chart2Ctx = document.getElementById("avgPriceTypeChart").getContext("2d");
    new Chart(chart2Ctx, {
      type: "bar",
      data: {
        labels: propertyTypeLabels,
        datasets: [
          {
            label: "Average Price ($)",
            data: propertyTypePrices,
            backgroundColor: ["#2196f3", "#ff9800", "#4caf50", "#9c27b0"],
            borderColor: "#333",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: "top" } },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Average Price ($)" }
          }
        }
      }
    });

    const propertyAttributesData = [
      { property_type: "Condo", avg_bed_number: 2.5, avg_bath_number: 1.5, avg_area: 2000 },
      { property_type: "House", avg_bed_number: 3.5, avg_bath_number: 2.5, avg_area: 2500 },
      { property_type: "Townhouse", avg_bed_number: 3, avg_bath_number: 2, avg_area: 2200 },
      { property_type: "Apartment", avg_bed_number: 2, avg_bath_number: 1, avg_area: 1500 }
    ];
    const attributesLabels = propertyAttributesData.map(item => item.property_type);
    const bedNumbers = propertyAttributesData.map(item => item.avg_bed_number);
    const bathNumbers = propertyAttributesData.map(item => item.avg_bath_number);
    const areas = propertyAttributesData.map(item => item.avg_area);

    const chart3Ctx = document.getElementById("avgStatsForType").getContext("2d");
    new Chart(chart3Ctx, {
      type: "bar",
      data: {
        labels: attributesLabels,
        datasets: [
          {
            label: "Avg Bed Number",
            data: bedNumbers,
            backgroundColor: "#4caf50",
            yAxisID: "yBedsBaths"
          },
          {
            label: "Avg Bath Number",
            data: bathNumbers,
            backgroundColor: "#ff9800",
            yAxisID: "yBedsBaths"
          },
          {
            label: "Avg Area (sqft)",
            data: areas,
            backgroundColor: "#2196f3",
            yAxisID: "yArea"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: "top" } },
        scales: {
          yBedsBaths: {
            type: "linear",
            display: true,
            position: "left",
            beginAtZero: true,
            title: { display: true, text: "Beds/Baths" }
          },
          yArea: {
            type: "linear",
            display: true,
            position: "right",
            beginAtZero: true,
            grid: { drawOnChartArea: false },
            title: { display: true, text: "Area (sqft)" }
          }
        }
      }
    });
  }
});
