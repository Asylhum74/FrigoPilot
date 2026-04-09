// ------------------- GESTION BOUTON ----------------
const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

  });
});
	
// ------------------- MODE SOMBRE -------------------
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

/* =========================
   Navigation
========================= */
function afficherPage(page) {
  document.querySelectorAll(".card").forEach(p => p.style.display = "none");
  document.getElementById("page-" + page).style.display = "block";
  if(page === "proprete") {
    afficherProprete();
  }
  if(page === "historique") {
    afficherHistorique();
  }
}
