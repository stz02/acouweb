// 交互脚本：导航高亮 & 移动端菜单 & 表单提示 & 滚动效果 & 入场动画

document.addEventListener("DOMContentLoaded", () => {
  // 导航高亮
  const currentPath = location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a.nav-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // 移动端菜单
  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("nav-mobile-open");
    });
  }

  // 导航栏滚动阴影效果
  const navbarEl = document.querySelector(".navbar");
  if (navbarEl) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbarEl.classList.add("scrolled");
      } else {
        navbarEl.classList.remove("scrolled");
      }
    };

    // 初始化检查
    handleScroll();

    // 监听滚动
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // 表单处理
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
        statusEl.className = "form-status error";
        return;
      }

      statusEl.textContent = "信息已收录，我们会在 1 个工作日内联系您。";
      statusEl.className = "form-status success";
      contactForm.reset();
    });
  }

  // 懒加载背景图片
  const lazyImages = document.querySelectorAll(".product-image[data-src]");
  if ("IntersectionObserver" in window && lazyImages.length > 0) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.style.backgroundImage = `url('${img.dataset.src}')`;
          img.style.backgroundRepeat = 'no-repeat';
          img.style.backgroundPosition = 'center center';
          img.style.backgroundSize = 'cover';
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    // 降级方案：直接加载
    lazyImages.forEach(img => {
      img.style.backgroundImage = `url('${img.dataset.src}')`;
      img.style.backgroundRepeat = 'no-repeat';
      img.style.backgroundPosition = 'center center';
      img.style.backgroundSize = 'cover';
    });
  }

  // 卡片入场动画 - IntersectionObserver
  const animatedElements = document.querySelectorAll(
    ".business-card, .product-card, .feature-card, .case-card, .faq-item, .stat-card, .capability-card"
  );

  if ("IntersectionObserver" in window && animatedElements.length > 0) {
    const animateOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // 添加延迟实现阶梯动画效果
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    animatedElements.forEach(el => {
      animateOnScroll.observe(el);
    });
  } else {
    // 降级方案：直接显示
    animatedElements.forEach(el => {
      el.classList.add("animate-in");
    });
  }

  // 按钮点击波纹效果（可选增强）
  const buttons = document.querySelectorAll(".btn-primary, .btn-ghost, .nav-cta");
  buttons.forEach(button => {
    button.addEventListener("click", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: translate(-50%, -50%);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 添加波纹动画
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple-effect {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // 首页大图根据窗口大小按比例缩放
  const heroBanner = document.querySelector(".hero-banner");
  if (heroBanner) {
    const adjustHeroHeight = () => {
      const width = window.innerWidth;
      const baseHeight = Math.min(width * 0.45, 700);
      const minHeight = Math.max(350, Math.min(width * 0.35, 500));
      
      heroBanner.style.height = `${baseHeight}px`;
      heroBanner.style.minHeight = `${minHeight}px`;
    };

    adjustHeroHeight();
    window.addEventListener("resize", adjustHeroHeight, { passive: true });
  }
});
