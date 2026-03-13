// 简单交互脚本：导航高亮 & 移动端菜单 & 表单提示

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a.nav-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("nav-mobile-open");
    });
  }

  const contactForm = document.querySelector("#contact-form");
  const statusEl = document.querySelector("#form-status");

  if (contactForm && statusEl) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        statusEl.textContent = "请完整填写必填信息。";
        statusEl.style.color = "#f97316";
        return;
      }

      statusEl.textContent = "信息已收录，我们会在1个工作日内联系您。";
      statusEl.style.color = "#4ade80";
      contactForm.reset();
    });
  }
});

