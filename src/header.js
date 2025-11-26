const renderNavLinks = () => {
  const navLinks = [
    { href: "#home", text: "Головна" },
    { href: "#about", text: "Про нас" },
    { href: "#services", text: "Послуги" },
    { href: "#portfolio", text: "Портфоліо" },
    { href: "#reviews", text: "Відгуки" },
    { href: "#contacts", text: "Контакти" },
  ];
  const navContainers = document.getElementsByClassName("navlinks"); // без точки
  Array.from(navContainers).forEach((navContainer) => {
    navLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      navContainer.appendChild(a);
    });
    const phone = document.createElement("a");
    phone.href = "tel:+380XXXXXXXXX";
    phone.classList.add("ghost");
    phone.textContent = "+380 XX XXX XXXX";
    navContainer.appendChild(phone);

    // Мобильная кнопка
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "Викликати майстра";
    navContainer.appendChild(btn);
  });
};
const mobileMenuToggle = () =>
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      burgerCheckbox.checked = false;
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const burgerCheckbox = document.getElementById("burger-checkbox");
  setTimeout(() => {
    renderNavLinks();
    mobileMenuToggle();
  }, 100); // рендерим ссылки навигации после загрузки DOM
});
