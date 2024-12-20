document.addEventListener('DOMContentLoaded', () => {
  // Login form submission handler
  const loginForm = document.querySelector('form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Mock authentication process
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert('Logging in...'); // Mock login process
    if (email && password) {
      // Save a mock token to localStorage
      localStorage.setItem('authToken', JSON.stringify({ authenticated: true }));
      // Redirect or refresh the page (optional)
      if (email === 'seller@seller.com') window.location.href = 'seller.html';
      else if (email=== 'buyer@buyer.com') window.location.href = 'buyer.html';
      else window.location.href = 'superuser.html';
    } else {
      alert('Please enter valid credentials.');
    }
  });

  // Logout button handler (add a button in your HTML for logout functionality)
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('authToken'); // Remove the token from localStorage
      alert('Logout successful! Token removed from localStorage.');
      // Redirect or refresh the page (optional)
      window.location.href = 'main.html';
    });
  }
});
