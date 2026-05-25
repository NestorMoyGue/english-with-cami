const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

const contactConfig = {
  instagramUrl: "https://www.instagram.com/ingles.online.cami/",
  whatsappPhone: "5493547527573",
  whatsappMessage:
    "Hola Cami! Me interesa recibir información sobre tus clases online de inglés.",
  emailLocalPart: "XXX",
  emailDomainParts: ["XXX", "XXX"],
  enableMailtoFallback: "auto",
};

function getCamiEmail() {
  return `${contactConfig.emailLocalPart}@${contactConfig.emailDomainParts.join(".")}`;
}

function getWhatsappUrl() {
  const message = encodeURIComponent(contactConfig.whatsappMessage);
  return `https://wa.me/${contactConfig.whatsappPhone}?text=${message}`;
}

const socialLinks = {
  instagram: contactConfig.instagramUrl,
  whatsapp: getWhatsappUrl(),
};

document.querySelectorAll("[data-social]").forEach((link) => {
  const social = link.dataset.social;
  link.href = socialLinks[social] || "#";
});

function submitWithMailtoFallback(event) {
  const isLocalPreview = ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
  const shouldUseMailto =
    contactConfig.enableMailtoFallback === true ||
    (contactConfig.enableMailtoFallback === "auto" && isLocalPreview);

  if (!shouldUseMailto) {
    return;
  }

  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent("Consulta desde English with Cami");
  const body = encodeURIComponent(
    [
      `Nombre: ${formData.get("nombre") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Motivo: ${formData.get("motivo") || ""}`,
      "",
      formData.get("mensaje") || "",
    ].join("\n")
  );
  window.location.href = `mailto:${getCamiEmail()}?subject=${subject}&body=${body}`;
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelector(".contact-form")?.addEventListener("submit", submitWithMailtoFallback);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    closeMenu();
  }
});
