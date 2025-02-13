document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is authenticated
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType"); // User type
  const email = localStorage.getItem("email");
  const fullName = "John Doe"; // For buyer
  const agencyName = "Doe Realty"; // For seller

  if (!authToken) {
    alert("You need to be logged in to view your profile.");
    window.location.href = "login.html"; // Redirect to login
    return;
  }

  // Populate profile data
  document.getElementById("profile-email").textContent =
    email || "Not specified";
  document.getElementById(
    "profile-type"
  ).innerHTML = `<strong>User Type:</strong> ${userType || "Unknown"}`;

  // Add additional fields based on user type
  const additionalFields = document.getElementById("additional-fields");
  if (userType === "buyer") {
    additionalFields.innerHTML = `
        <p><i class="fas fa-id-card"></i> <strong>Full Name:</strong> ${
          fullName || "Not specified"
        }</p>
        <p>
            <i class="fas fa-phone"></i> <strong>Phone:</strong>
            <span id="profile-phone">+1 123 456 7890</span>
        </p>
    `;
  } else if (userType === "seller") {
    additionalFields.innerHTML = `
        <p><i class="fas fa-building"></i> <strong>Agency Name:</strong> ${
          agencyName || "Not specified"
        }</p>
    `;
  }
});
