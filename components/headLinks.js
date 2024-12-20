// headLinks.js
document.addEventListener("DOMContentLoaded", () => {
    // Array con i link da aggiungere
    const links = [
      {
        rel: "icon",
        href: "favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      },
      {
        rel: "stylesheet",
        href: "css/base.css",
      },
      {
        rel: "stylesheet",
        href: "css/layout.css",
      },
      {
        rel: "stylesheet",
        href: "css/footer.css",
      },
    ];
  
    // Referenza al primo elemento nel <head>
    const firstChild = document.head.firstChild;
  
    // Creazione e inserimento dei link all'inizio del <head>
    links.forEach(linkInfo => {
      const link = document.createElement("link");
      link.rel = linkInfo.rel;
      link.href = linkInfo.href;
      document.head.insertBefore(link, firstChild);
    });
  });
  