const headerHTML = (isAuthenticated) => `
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
          <a href="contact.html"><i class="fas fa-envelope"></i> Contact us</a>
        </li>
        ${
          isAuthenticated
            ? `
            <li>
              <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
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

  // Inject the header with the correct links
  document.getElementById("header").innerHTML = headerHTML(!!isAuthenticated);

  // Logout functionality
  if (isAuthenticated) {
    const logoutLink = document.getElementById("logout-link");
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("authToken"); // Remove the token
      alert("You have been logged out.");
      window.location.href = "index.html"; // Redirect to the home page
    });
  }
});
