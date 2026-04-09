/* =========================
   Alimentaire
========================= */
let aliments = [];
let indexEnCours = -1;

// Charger les aliments depuis localStorage
function chargerAliments() {
  const data = localStorage.getItem("aliments");
  if(data) aliments = JSON.parse(data);
}
// Sauvegarder les aliments dans localStorage
function sauvegarderAliments() {
  localStorage.setItem("aliments", JSON.stringify(aliments));
}
// Ajouter ou modifier un aliment
function ajouterOuModifierAliment() {
  const nom = document.getElementById("nom").value;
  const quantite = document.getElementById("quantite").value;
  const unite = document.getElementById("unite").value;
  const sansDate = document.getElementById("sansDate").checked;
  const peremption = sansDate ? null : document.getElementById("peremption").value;
  const categorie = document.getElementById("categorie").value;
  const portions = parseInt(document.getElementById("portions").value) || 1;
  if(!nom || !quantite || !unite || !categorie) {
    alert("Veuillez remplir tous les champs !");
    return;
  }
  const nouvelAliment = {nom, quantite, unite, peremption, categorie, portions};
  if(indexEnCours === -1) {
    aliments.push(nouvelAliment);
  } else {
    aliments[indexEnCours] = nouvelAliment;
    indexEnCours = -1;
    document.querySelector("button[onclick='ajouterOuModifierAliment()']").textContent = "Ajouter";
  }
  // Réinitialiser le formulaire
  document.getElementById("nom").value = "";
  document.getElementById("quantite").value = "";
  document.getElementById("unite").value = "";
  document.getElementById("peremption").value = "";
  document.getElementById("categorie").value = "Choisir catégorie";
  document.getElementById("portions").value = "";
  document.getElementById("sansDate").checked = false; 
  sauvegarderAliments();
  afficherAliments();
}
// Affichage
function calculerJoursRestants(dateString) {
  const aujourdHui = new Date();
  const peremption = new Date(dateString);
  const diffTime = peremption - aujourdHui;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
}
function afficherAliments() {
  const recherche = document.getElementById("recherche").value.toLowerCase();
  const ul = document.getElementById("listeAliments");
  ul.innerHTML = "";
  const ordreCategorie = ["Féculent", "Produit laitier", "Viande", "Poisson", "Fruit", "Légume", "Sucré", "Sec", "Sauce", "Epice", "Boisson", "Plat préparé", "Hygiène"];
  aliments.sort((a, b) => ordreCategorie.indexOf(a.categorie) - ordreCategorie.indexOf(b.categorie));
  let categorieActuelle = "";
  aliments.forEach((aliment, index) => {
    if (!aliment.nom.toLowerCase().includes(recherche)) return;
    if (aliment.categorie !== categorieActuelle) {
      categorieActuelle = aliment.categorie;
      const titre = document.createElement("li");
      titre.innerHTML = `<strong style="font-size:1.2em; color:#2c3e50;">${categorieActuelle}</strong>`;
      ul.appendChild(titre);
    }
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") ouvrirPopup(index);
    };
    let textePeremption = "";
    if (aliment.peremption) {
      const joursRestants = calculerJoursRestants(aliment.peremption);
      textePeremption = ` - ${joursRestants} jour(s) restant`;
      if (joursRestants <= 3) {
        li.className = "urgent";
        textePeremption += " - URGENT !";
      } else {
        li.className = "ok";
      }
    } else {
      li.className = "ok";
    }
    let textePortions = "";
    if (aliment.portions) {
	    textePortions = ` (${aliment.quantite * aliment.portions} portions)`;
    }
    const blocQuantite = document.createElement("div");
    blocQuantite.style.display = "flex";
    blocQuantite.style.alignItems = "center";
    blocQuantite.style.gap = "8px";
    const btnMoins = document.createElement("button");
    btnMoins.textContent = "−";
    btnMoins.style.width = "35px";
    const btnPlus = document.createElement("button");
    btnPlus.textContent = "+";
    btnPlus.style.width = "35px";
    const spanTexte = document.createElement("span");
    function majTexte() {
      let txtPortions = aliment.portions ? ` (${aliment.quantite * aliment.portions} portions)` : "";
      let txtPeremption = "";
      if (aliment.peremption) {
        const joursRestants = calculerJoursRestants(aliment.peremption);
        txtPeremption = ` - ${joursRestants} jour(s) restant`;
        if (joursRestants <= 3) txtPeremption += " - URGENT !";
      }
	  if (aliment.quantite > 0 && aliment.quantite < 1) {
		  aliment.quantite = 1;
	  }
      spanTexte.innerHTML = `<strong>${aliment.nom}</strong><br>${aliment.quantite} ${aliment.unite}${txtPortions}${txtPeremption}`;
    }
    majTexte();
    btnMoins.onclick = (e) => {
      e.stopPropagation();
	  if (aliment.portions > aliment.quantite) {
      	if (aliment.portions > 0) {
        	aliment.portions--;
        	majTexte();
        	sauvegarderAliments();
      	}
	  }
	  else {
		if (aliment.quantite > 0) {
        	aliment.quantite--;
        	majTexte();
        	sauvegarderAliments();
      	}
	  }
	  if (aliment.quantite === 0) {
		  supprimerAliment(index);
	  }
    };
    btnPlus.onclick = (e) => {
      e.stopPropagation();
      if (aliment.portions > aliment.quantite) {
        	aliment.portions++;
        	majTexte();
        	sauvegarderAliments();
	  }
	  else {
        	aliment.quantite++;
        	majTexte();
        	sauvegarderAliments();
	  }
    };
    blocQuantite.appendChild(btnMoins);
    blocQuantite.appendChild(spanTexte);
    blocQuantite.appendChild(btnPlus);
    li.appendChild(blocQuantite);
    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Supprimer";
    btnSupprimer.style.padding = "10px 16px";
    btnSupprimer.style.fontSize = "1em";
    btnSupprimer.style.background = "#e74c3c";
    btnSupprimer.style.color = "white";
    btnSupprimer.style.border = "none";
    btnSupprimer.style.borderRadius = "6px";
    btnSupprimer.onclick = (e) => {
      e.stopPropagation();
      supprimerAliment(index);
    };
    const actions = document.createElement("span");
    actions.className = "actions";
    actions.appendChild(btnSupprimer);
    li.appendChild(actions);
    ul.appendChild(li);
  }); 
}
function supprimerAliment(index) {
  if(confirm("Voulez-vous vraiment supprimer cet aliment ?")) {
    aliments.splice(index, 1);
    sauvegarderAliments();
    afficherAliments();
  }
}
// Pré-remplir le formulaire pour modifier
function preRemplirFormulaire(index) {
  const aliment = aliments[index];
  document.getElementById("nom").value = aliment.nom;
  document.getElementById("quantite").value = aliment.quantite;
  document.getElementById("unite").value = aliment.unite;
  document.getElementById("peremption").value = aliment.peremption;
  document.getElementById("categorie").value = aliment.categorie;
  document.getElementById("portions").value = aliment.portions;
  indexEnCours = index;
  document.querySelector("button[onclick='ajouterOuModifierAliment()']").textContent = "Modifier";
}
// Sauvegarde inventaire
function exporterInventaire() {
  const dataStr = JSON.stringify(aliments, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "inventaire.json";
  a.click();
  URL.revokeObjectURL(url);
}
function importerInventaire(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      aliments = JSON.parse(e.target.result);
      sauvegarderAliments();
      afficherAliments();
      alert("Inventaire restauré avec succès !");
    } catch {
      alert("Fichier invalide");
    }
  };
  reader.readAsText(file);
}
