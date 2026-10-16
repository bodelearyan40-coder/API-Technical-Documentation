
const searchInput = document.getElementById("searchInput");
const navigation = document.getElementById("navigation");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

// Search documentation sections
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const links = navigation.querySelectorAll(".nav-link");

  links.forEach((link) => {
    const sectionId = link.getAttribute("href").slice(1);
    const section = document.getElementById(sectionId);

    const matches =
      link.textContent.toLowerCase().includes(query) ||
      (section && section.textContent.toLowerCase().includes(query));

    link.hidden = !matches;
  });

  navigation.querySelectorAll(".nav-heading").forEach((heading) => {
    let next = heading.nextElementSibling;
    let hasVisibleLink = false;

    while (next && !next.classList.contains("nav-heading")) {
      if (next.classList.contains("nav-link") && !next.hidden) {
        hasVisibleLink = true;
      }
      next = next.nextElementSibling;
    }

    heading.hidden = query !== "" && !hasVisibleLink;
  });
});

// Highlight the selected navigation link
function setActiveLink() {
  const currentHash = window.location.hash || "#overview";

  navigation.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentHash
    );
  });
}

window.addEventListener("hashchange", setActiveLink);
setActiveLink();

// Mobile navigation toggle
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

navigation.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

// Copy code examples
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement.querySelector("code");
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = "Copied!";
    } catch (error) {
      // Fallback for browsers where clipboard access is unavailable
      const selection = document.createElement("textarea");
      selection.value = code.textContent;
      selection.style.position = "fixed";
      selection.style.opacity = "0";
      document.body.appendChild(selection);
      selection.select();

      const copied = document.execCommand("copy");
      selection.remove();

      button.textContent = copied ? "Copied!" : "Select code";
    }

    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  });
});
