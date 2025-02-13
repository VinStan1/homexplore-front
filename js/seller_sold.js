document.addEventListener("DOMContentLoaded", () => {
    const showAnalyticsBtn = document.getElementById("show-analytics");
    const analyticsPopup = document.getElementById("analytics-popup");
    const closeBtn = document.querySelector(".close-btn");
  
    // Check if the user is authenticated
    showAnalyticsBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const isAuthenticated = localStorage.getItem("authToken");
  
      if (isAuthenticated) {
        // Show the analytics popup
        analyticsPopup.classList.remove("hidden");
        generateAnalytics();
      } else {
        alert("You must be logged in to view analytics.");
      }
    });
  
    // Close the popup
    closeBtn.addEventListener("click", () => {
      analyticsPopup.classList.add("hidden");
    });
  
    // Hide the popup when clicking outside the content area
    analyticsPopup.addEventListener("click", (event) => {
      if (event.target === analyticsPopup) {
        analyticsPopup.classList.add("hidden");
      }
    });
  
    // Generate analytics charts using mocked data
    function generateAnalytics() {
      // Expanded mock data for listings (houses on sale)
      const listingData = [
        { neighbourhood: "Brooklyn", num_house: 10, avg_time_to_sell: 45 },
        { neighbourhood: "Manhattan", num_house: 5, avg_time_to_sell: 34 },
        { neighbourhood: "Queens", num_house: 7, avg_time_to_sell: 50 },
        { neighbourhood: "Bronx", num_house: 8, avg_time_to_sell: 40 },
        { neighbourhood: "Staten Island", num_house: 4, avg_time_to_sell: 55 },
      ];
  
      // Expanded mock data for sales
      const soldData = [
        { neighbourhood: "Brooklyn", house_sold: 10, revenue: 5000000 },
        { neighbourhood: "Manhattan", house_sold: 5, revenue: 3000000 },
        { neighbourhood: "Queens", house_sold: 7, revenue: 3500000 },
        { neighbourhood: "Bronx", house_sold: 8, revenue: 4000000 },
        { neighbourhood: "Staten Island", house_sold: 4, revenue: 2000000 },
      ];
  
      // Extract labels and values for the listing chart
      const listingLabels = listingData.map((item) => item.neighbourhood);
      const numHouses = listingData.map((item) => item.num_house);
      const avgTime = listingData.map((item) => item.avg_time_to_sell);
  
      // Chart 1: Listings Analysis - Number of Houses and Average Time to Sell (both as bar charts)
      const listingChartCtx = document.getElementById("avgPriceChart").getContext("2d");
  
      new Chart(listingChartCtx, {
        type: "bar",
        data: {
          labels: listingLabels,
          datasets: [
            {
              label: "Number of Houses",
              data: numHouses,
              backgroundColor: "#4caf50",
              yAxisID: "y",
            },
            {
              label: "Average Time to Sell (days)",
              data: avgTime,
              backgroundColor: "#e91e63",
              yAxisID: "y1",
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
              position: "left",
              title: {
                display: true,
                text: "Number of Houses",
              },
            },
            y1: {
              beginAtZero: true,
              position: "right",
              grid: { drawOnChartArea: false },
              title: {
                display: true,
                text: "Time to Sell (days)",
              },
            },
          },
        },
      });
  
      // Extract labels and values for the sales chart
      const soldLabels = soldData.map((item) => item.neighbourhood);
      const housesSold = soldData.map((item) => item.house_sold);
      const revenue = soldData.map((item) => item.revenue);
  
      // Chart 2: Sales Analysis - Houses Sold and Revenue (both as bar charts)
      const soldChartCtx = document.getElementById("priceIncreaseChart").getContext("2d");
  
      new Chart(soldChartCtx, {
        type: "bar",
        data: {
          labels: soldLabels,
          datasets: [
            {
              label: "Houses Sold",
              data: housesSold,
              backgroundColor: "#ff9800",
              yAxisID: "y",
            },
            {
              label: "Revenue ($)",
              data: revenue,
              backgroundColor: "#ff5722",
              yAxisID: "y1",
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
              position: "left",
              title: {
                display: true,
                text: "Houses Sold",
              },
            },
            y1: {
              beginAtZero: true,
              position: "right",
              grid: { drawOnChartArea: false },
              title: {
                display: true,
                text: "Revenue ($)",
              },
            },
          },
        },
      });
    }

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
  });
  