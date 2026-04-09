/* =========================
   Pop-Up modifier aliment
========================= */
let indexEdition = -1;
function ouvrirPopup(index) {
  const aliment = aliments[index];
  indexEdition = index;
  document.getElementById("editNom").value = aliment.nom;
  document.getElementById("editQuantite").value = aliment.quantite;
  document.getElementById("editUnite").value = aliment.unite;
  document.getElementById("editPortions").value = aliment.portions;
  const checkbox = document.getElementById("editSansDate");
  const dateInput = document.getElementById("editPeremption");
  if (!aliment.peremption) {
    checkbox.checked = true;
    dateInput.disabled = true;
    dateInput.style.visibility = "hidden";
    dateInput.value = ""; 
  } else {
    checkbox.checked = false;
    dateInput.disabled = false;
    dateInput.style.visibility = "visible";
    dateInput.value = aliment.peremption;
  }
  checkbox.addEventListener("change", function() {
    if (this.checked) {
      dateInput.disabled = true;
      dateInput.style.visibility = "hidden";
    } else {
      dateInput.disabled = false;
      dateInput.style.visibility = "visible";
      if (aliment.peremption) dateInput.value = aliment.peremption;
    }
  });
  const select = document.getElementById("editCategorie");
  select.innerHTML = "";
  const options = ["Choisir Catégorie","Boisson","Produit laitier","Légume","Fruit","Viande","Poisson","Féculent","Sucré","Sauce","Epice","Sec",
                   "Plat préparé","Hygiène"];
  options.forEach(cat => {
    const o = document.createElement("option");
    o.value = cat;
    o.textContent = cat;
    if(cat === aliment.categorie) o.selected = true;
    select.appendChild(o);
  });
  document.getElementById("popupEdit").style.display = "flex";
}
function fermerPopup() {
  document.getElementById("popupEdit").style.display = "none";
}
function sauvegarderEdition() {
  if(indexEdition === -1) return;
  const sansDate = document.getElementById("editSansDate").checked;
  aliments[indexEdition] = {
    nom: document.getElementById("editNom").value,
    quantite: document.getElementById("editQuantite").value,
    unite: document.getElementById("editUnite").value,
    peremption: sansDate ? null : document.getElementById("editPeremption").value,
    categorie: document.getElementById("editCategorie").value,
    portions: document.getElementById("editPortions").value
  };
  sauvegarderAliments();
  afficherAliments();
  fermerPopup();
}
function supprimerDepuisPopup() {
  if(confirm("Supprimer cet aliment ?")) {
    aliments.splice(indexEdition, 1);
    sauvegarderAliments();
    afficherAliments();
    fermerPopup();
  }
}

/* =========================
   Pop-Up ajouter recette à repas
========================= */ 
function ouvrirPopupRecette(index) {
  indexRecetteEnCours = index;
  document.getElementById("popupRecette").style.display = "flex";
}
function fermerPopupRecette() {
  document.getElementById("popupRecette").style.display = "none";
}
function confirmerAjoutRecette() {
  if(indexRecetteEnCours === -1) return;
  const recette = recettes[indexRecetteEnCours];
  const jour = document.getElementById("recetteJour").value;
  const typeRepas = document.getElementById("recetteTypeRepas").value;
  const input = document.querySelector(`input[data-jour="${jour}"][data-repas="${typeRepas}"]`);
  if(!input) {
    alert("Le champ de repas correspondant n'a pas été trouvé !");
    fermerPopupRecette();
    return;
  }
  const valeursExistantes = input.value ? input.value.split(",").map(v => v.trim()) : [];
  const nouvellesValeurs = [...valeursExistantes, ...recette.ingredients];
  input.value = nouvellesValeurs.join(", ");
  alert(`Recette "${recette.nom}" ajoutée à ${jour} - ${typeRepas} !`);
  fermerPopupRecette();
}
//Initialisation
chargerRecettes();
afficherRecettes();

/* =========================
   Pop-Up modifier repas
========================= */
let inputRepasActif = null;
function ouvrirPopupRepas(input) {
  inputRepasActif = input;
  const jour = input.dataset.jour;
  const type = input.dataset.repas;
  document.getElementById("repasTitre").textContent =`${jour} - ${type}`;
  document.getElementById("repasTexte").value = input.value;
  document.getElementById("popupRepasEdit").style.display = "flex";
}
function fermerPopupRepas() {
  document.getElementById("popupRepasEdit").style.display = "none";
}
function sauvegarderRepasPopup() {
  if (!inputRepasActif) return;
  inputRepasActif.value =document.getElementById("repasTexte").value;
  fermerPopupRepas();
}
