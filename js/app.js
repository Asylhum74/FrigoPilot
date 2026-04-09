document.addEventListener("DOMContentLoaded", () => {
  chargerAliments();
  afficherAliments();

  chargerDepenses();
  verifierChangementDeMois();
  afficherDepenses();

  chargerRecettes();
  afficherRecettes();

  afficherPage("inventaire");
});
