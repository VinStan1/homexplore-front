const headerHTML = `<div class="container">
    <div class="logo" style="display: flex">
      <a href="main.html"
        ><img
          src="images/logoblackandwhite.png"
          alt="HomeXplore Logo"
          style="
            width: 40px;
            height: auto;
            object-fit: contain;
            vertical-align: middle;
          "
        />
        <span style="vertical-align: middle">HomeXplore</span></a
      >
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
            Search</a
          >
        </li>
        <li>
          <a href="contact.html"
            ><i class="fas fa-envelope"></i> Contact us</a
          >
        </li>
        <li>
          <a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>
        </li>
        <li>
          <a href="register.html"
            ><i class="fas fa-user-plus"></i> Sign up</a
          >
        </li>
      </ul>
    </nav>
  </div>`

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('header').innerHTML = headerHTML;
  });