/* =========================
   Recette
========================= */
let recettes = [];
let indexRecetteEnCours = -1;

function chargerRecettes() {
  const data = localStorage.getItem("recettes");
  if(data) recettes = JSON.parse(data);
}
function sauvegarderRecettes() {
  localStorage.setItem("recettes", JSON.stringify(recettes));
}
function ajouterRecette() {
  const nom = document.getElementById("recetteNom").value.trim();
  const ingredients = document.getElementById("recetteIngredients").value.split(",").map(i => i.trim()).filter(i => i);
  if(!nom || ingredients.length === 0) {
    alert("Veuillez remplir le nom et les ingrédients !");
    return;
  }
  recettes.push({nom, ingredients});
  document.getElementById("recetteNom").value = "";
  document.getElementById("recetteIngredients").value = "";
  sauvegarderRecettes();
  afficherRecettes();
}
function afficherRecettes() {
  const ul = document.getElementById("listeRecettes");
  ul.innerHTML = "";
  recettes.forEach((recette, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "5px";
    const span = document.createElement("span");
    span.textContent = `${recette.nom} (${recette.ingredients.join(", ")})`;
    li.appendChild(span);
    const btnAjouterRepas = document.createElement("button");
    btnAjouterRepas.textContent = "➡️ Ajouter au repas";
	btnAjouterRepas.style.padding = "6px 12px";
	btnAjouterRepas.style.marginLeft = "auto";
    btnAjouterRepas.onclick = () => ouvrirPopupRecette(index);
    li.appendChild(btnAjouterRepas);
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.style.padding = "6px 12px";
    btnSupprimer.style.marginLeft = "5px";
    btnSupprimer.style.background = "#e74c3c";
    btnSupprimer.style.color = "white";
    btnSupprimer.onclick = () => {
      if(confirm(`Supprimer la recette "${recette.nom}" ?`)) {
        recettes.splice(index, 1);
        sauvegarderRecettes();
        afficherRecettes();
      }
    };
    li.appendChild(btnSupprimer);
    ul.appendChild(li);
  });
}
