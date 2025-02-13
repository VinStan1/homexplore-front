const headerHTML = (isAuthenticated, userType) => `
<script src="auth.js"></script>
<div class="container">
    <div class="logo" style="display: flex">
      <a href="main.html">
        <img
          src="images/logoblackandwhite.png"
          alt="HomeXplore Logo"
          style="
            width: 40px;
            height: auto;
            object-fit: contain;
            vertical-align: middle;
          "
        />
        <span style="vertical-align: middle">HomeXplore</span>
      </a>
    </div>
    <input type="checkbox" id="nav-toggle" class="nav-toggle" />
    <label for="nav-toggle" class="nav-toggle-label">
      <span></span>
    </label>
    <nav>
      <ul>
        <li>
          <a href="main.html"><i class="fas fa-home"></i> Home</a>
        </li>
        <li>
          <a href="index.html">
            <i class="fas fa-search"></i>
            Search</a>
        </li>
        <li>
          <a href="mailto:admin@homexplore.com"><i class="fas fa-envelope"></i> Contact us</a>
        </li>
        ${
          isAuthenticated
            ? `
            <li>
              <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
            </li>
            <li>
              <a href="#" id="dashboard-link"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
            </li>
            <li>
              <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </li>
          `
            : `
            <li>
              <a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>
            </li>
            <li>
              <a href="register.html"><i class="fas fa-user-plus"></i> Sign up</a>
            </li>
          `
        }
      </ul>
    </nav>
  </div>`;

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated (token exists in localStorage)
  const isAuthenticated = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType"); // Get the userType from localStorage

  // Inject the header with the correct links
  document.getElementById("header").innerHTML = headerHTML(!!isAuthenticated, userType);

  // Add functionality for logout
  if (isAuthenticated) {
    const logoutLink = document.getElementById("logout-link");
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("authToken"); // Remove the token
      localStorage.removeItem("userType"); // Remove the user type
      localStorage.removeItem("email"); // Remove the email
      alert("You have been logged out.");
      window.location.href = "index.html"; // Redirect to the home page
    });

    // Dashboard link logic based on userType
    const dashboardLink = document.getElementById("dashboard-link");
    if (dashboardLink) {
      dashboardLink.addEventListener("click", (event) => {
        event.preventDefault();
        switch (userType) {
          case "seller":
            window.location.href = "seller.html";
            break;
          case "buyer":
            window.location.href = "buyer.html";
            break;
          default:
            alert("Unknown user type. Please contact support.");
        }
      });
    }
  }
});
