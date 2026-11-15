const resources = {
  "kit-antisobrecarga": {
    title: "Kit antisobrecarga",
    status: "En validación",
    category: "Sobrecarga sensorial",
    description: "Una idea de kit para preparar, reconocer y atravesar momentos de sobrecarga sensorial con herramientas simples.",
    problem: "Cuando hay demasiado ruido, luz o gente y no sabes por dónde empezar a bajar la intensidad.",
    help: "Tener un plan visual a mano para reconocer señales y elegir qué hacer.",
    items: ["Mapa de señales tempranas", "Tarjetas de “qué necesito ahora”", "Checklist para salir preparada/o", "Plantilla de plan post-sobrecarga"],
    format: "PDF imprimible + versión para celular",
    color: "var(--navy)"
  },
  "destraba-el-dia": {
    title: "Destraba el día",
    status: "En validación",
    category: "Organización y tareas",
    description: "Plantillas para desbloquear el día cuando la parálisis por tareas aparece.",
    problem: "Tienes mil cosas pendientes y ninguna arranca.",
    help: "Partir tareas en pasos chiquitos y elegir una para empezar.",
    items: ["Tablero de tareas por energía", "Desarmador de tareas en micro-pasos", "Menú de arranque rápido", "Registro semanal sin culpa"],
    format: "PDF editable",
    color: "var(--orange)"
  },
  "viajar-a-mi-manera": {
    title: "Viajar a mi manera",
    status: "Próximo lanzamiento",
    category: "Viajes y experiencias accesibles",
    description: "Herramientas nacidas de Turismo para NDs para planear viajes y salidas con menos sorpresas.",
    problem: "Viajar emociona, pero la incertidumbre y los cambios agotan.",
    help: "Anticipar el viaje con guías visuales y planes de respaldo.",
    items: ["Planificador de viaje paso a paso", "Lista de equipaje sensorial", "Guion visual para aeropuertos y terminales", "Plan B para imprevistos"],
    format: "PDF imprimible",
    color: "var(--red)"
  },
  "bateria-social": {
    title: "Batería social",
    status: "En validación",
    category: "Energía social y descanso",
    description: "Una herramienta visual para cuidar tu energía social sin aislarte ni sobreexigirte.",
    problem: "Llegas sin energía a mitad de semana y no sabes en qué se fue.",
    help: "Ver cuánta energía te piden tus planes y reservar descanso.",
    items: ["Medidor de batería diario", "Calculadora de planes y eventos", "Menú de recarga", "Frases para salir de un plan"],
    format: "PDF imprimible + versión para celular",
    color: "var(--green-dark)"
  },
  "rutinas-sin-rigidez": {
    title: "Rutinas sin rigidez",
    status: "En validación",
    category: "Rutinas y autocuidado",
    description: "Plantillas de rutinas que se adaptan a ti, y no al revés.",
    problem: "Las rutinas perfectas duran tres días y después te sientes peor.",
    help: "Rutinas con versiones mínimas para días de poca energía.",
    items: ["Rutinas en tres niveles de energía", "Tarjetas de autocuidado básico", "Rastreador flexible", "Guía para retomar sin culpa"],
    format: "PDF editable",
    color: "#ffad00"
  },
  "mi-manual": {
    title: "Mi manual de instrucciones",
    status: "En validación",
    category: "Autoconocimiento y comunicación",
    description: "Un cuaderno guiado para conocerte y comunicar tus necesidades con tus propias palabras.",
    problem: "Te cuesta explicar qué necesitas en el trabajo, en casa o con amistades.",
    help: "Armar un documento propio para compartir cómo funcionas mejor.",
    items: ["Preguntas guía de autoconocimiento", "Plantilla de manual personal", "Versión corta para compartir", "Ideas de ajustes para pedir"],
    format: "PDF editable",
    color: "var(--purple)"
  }
};

const resourceDialog = document.querySelector("#resource-dialog");
const suggestDialog = document.querySelector("#suggest-dialog");
const interestForm = document.querySelector(".interest-form");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
let activeFilter = "todos";

function openResource(id) {
  const resource = resources[id];
  if (!resource) return;

  document.querySelector("#detail-status").textContent = resource.status;
  document.querySelector("#detail-category").textContent = resource.category;
  document.querySelector("#dialog-title").textContent = resource.title;
  document.querySelector("#detail-description").textContent = resource.description;
  document.querySelector("#detail-problem").textContent = resource.problem;
  document.querySelector("#detail-help").textContent = resource.help;
  document.querySelector("#detail-format").textContent = resource.format;
  document.querySelector(".interest-head").style.background = resource.color;

  const itemList = document.querySelector("#detail-items");
  itemList.replaceChildren(...resource.items.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));

  interestForm.reset();
  interestForm.querySelector(".form-feedback").textContent = "";
  resourceDialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
}

function applyFilters() {
  const query = document.querySelector("#resource-search").value.trim().toLocaleLowerCase("es");
  let visibleCount = 0;

  document.querySelectorAll(".resource-card").forEach((card) => {
    const matchesCategory = activeFilter === "todos" || card.dataset.category === activeFilter;
    const resource = resources[card.dataset.id];
    const searchable = `${resource.title} ${resource.description} ${resource.category} ${resource.problem}`.toLocaleLowerCase("es");
    const matchesSearch = !query || searchable.includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  document.querySelector("#no-results").hidden = visibleCount > 0;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === activeFilter);
  });
}

function setFilter(filter) {
  activeFilter = filter;
  applyFilters();
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openResource(button.dataset.open));
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
    document.querySelector("#recursos").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector("#resource-search").addEventListener("input", applyFilters);

document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

[resourceDialog, suggestDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
});

document.querySelectorAll("[data-suggestion]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#suggest-form").reset();
    document.querySelector("#suggest-form .form-feedback").textContent = "";
    suggestDialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

interestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  interestForm.querySelector(".form-feedback").textContent = "Demo local: no se han enviado ni guardado datos.";
});

document.querySelector("#suggest-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".form-feedback").textContent = "Demo local: no se han enviado ni guardado datos.";
  event.currentTarget.reset();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
