document.addEventListener("DOMContentLoaded", () => {
  // Login form submission handler
  const loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Mock authentication process
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    alert("Logging in..."); // Mock login process
    if (email && password) {
      if (email != "seller@seller.com" && email != "buyer@buyer.com") {
        alert("Invalid email. Please enter a valid email.");
        return;
      }

      // Save a mock token to localStorage
      localStorage.setItem(
        "authToken",
        JSON.stringify({ authenticated: true })
      );
      // Save the user type to localStorage
      if (email === "seller@seller.com")
        localStorage.setItem("userType", "seller");
      else if (email === "buyer@buyer.com")
        localStorage.setItem("userType", "buyer");
      // Save the email to localStorage
      localStorage.setItem("email", email);
      // Redirect or refresh the page (optional)
      if (email === "seller@seller.com") window.location.href = "seller.html";
      else if (email === "buyer@buyer.com") window.location.href = "buyer.html";
    } else {
      alert("Please enter valid credentials.");
    }
  });
});
