// Перевірка, чи підтримує браузер нативне lazy-loading
if ("loading" in HTMLImageElement.prototype) {
     // Якщо так — встановлюємо src з data-src
  document.getElementById("startLoad").addEventListener("click", () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
    });
  });
} else {
     // Якщо ні — підключаємо lazysizes
  addLazySizesScript();
}

/**
 * Функція, яка активує IntersectionObserver для зображень із data-src
 */
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  // Створюємо IntersectionObserver — реагує, коли елемент потрапляє в область видимості
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Замінюємо src
        img.onload = () => img.classList.add("loaded"); // Додаємо ефект
        observer.unobserve(img); // Більше не спостерігаємо
      }
    });
  });

  // Спостерігаємо всі зображення
  images.forEach(img => observer.observe(img));
}

// Функція додавання lazysizes (fallback для старих браузерів)
function addLazySizesScript() {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";
  document.body.appendChild(script);
}
