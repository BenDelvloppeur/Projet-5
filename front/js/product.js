// Récuperation de l'url actuelle
const str = window.location;
// Le new URL permet de crée une url en parallèle pour lui ajouter des paramètres à l'url
const url = new URL(str);
// Récupération des parametres de l'url + ajout de l'id
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

fetchFunction(objectURL)
.then((result) => {
  const productTitle = (document.getElementById("title").innerHTML =
    result.name);

  const productImg = document.createElement("img");
  productImg.src = result.imageUrl;
  productImg.alt = result.altTxt;

  const imgPlacement = document.querySelector(".item__img");
  imgPlacement.appendChild(productImg);

  const productPrice = (document.getElementById("price").innerHTML =
    result.price);

  const productDescription = (document.getElementById("description").innerHTML =
    result.description);

  //         Boucle pour récupérer la couleur.
  let productColors = document.getElementById("colors");
  for (let i = 0; i < result.colors.length; i++) {
    productColors.innerHTML += `<option value="${result.colors[i]}">${result.colors[i]}</option>`;
  }
});

//fetch avec l'url + id

// Ajout au panier

// Fonction de récupération de la quantité
const getQuantity = () => {
  let quantity = document.getElementById("quantity");
  return quantity.value;
};
// Fonction de récupération de la couleur
const getColors = () => {
  let colors = document.getElementById("colors");
  return colors.value;
};

// récupération du Button  + ajout d'évenement
const toCartBtn = document.getElementById("addToCart");
const goToCartBtn = document.getElementById("goToCart");
goToCartBtn.style.display = "none";
toCartBtn.addEventListener("click", () => {
  // récupération des quantités et couleurs
  let qty = parseInt(getQuantity());
  let clrs = getColors();

  add2Cart(id, clrs, qty);
  goToCartBtn.style.display = "block";
});

// envois vers le panier au click :
goToCartBtn.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
