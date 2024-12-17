const footerHTML = `<div class="container">
        <p>&copy; 2024 HomeXplore. All rights reserved.</p>
        <ul class="footer-links">
          <li>
            <a href="privacy.html"
              ><i class="fas fa-user-shield"></i> Privacy Policy</a
            >
          </li>
          <li>
            <a href="terms.html"
              ><i class="fas fa-file-contract"></i> Terms of Service</a
            >
          </li>
        </ul>
      </div>`

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('footer').innerHTML = footerHTML;
  });