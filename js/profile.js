document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is authenticated
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType"); // User type
  const email = localStorage.getItem("email");
  const phone = 3333333333; // For all users
  const fullName = "John Doe"; // For buyer
  const agencyName = "Doe Realty"; // For seller
  const age = 30; // For buyer
  const sex = "Male"; // For buyer

  if (!authToken) {
    alert("You need to be logged in to view your profile.");
    window.location.href = "login.html"; // Redirect to login
    return;
  }

  // Populate profile data
  document.getElementById("profile-email").textContent =
    email || "Not specified";
  document.getElementById("profile-phone").textContent =
    phone || "Not specified";
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
        <p><i class="fas fa-venus-mars"></i> <strong>Gender:</strong> ${sex}</p>
        <p><i class="fas fa-birthday-cake"></i> <strong>Age:</strong> ${age}</p>
    `;
  } else if (userType === "seller") {
    additionalFields.innerHTML = `
        <p><i class="fas fa-building"></i> <strong>Agency Name:</strong> ${
          agencyName || "Not specified"
        }</p>
    `;
  } else if (userType === "superuser") {
    additionalFields.innerHTML = `
        <p><i class="fas fa-user-shield"></i> <strong>Superuser Access:</strong> You have administrative privileges.</p>
    `;
  }
});
