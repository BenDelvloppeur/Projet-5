// Récuperation de l'url actuelle
const str = window.location;
// Le new URL permet de crée une url en parallèle pour lui ajouter des paramètres à l'url
const url = new URL(str);
// Récupération des parametres de l'url + ajout de l'id
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

fetchFunction(objectURL).then((result) => {
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
// Gestion de l'érreur quantités couleurs
const checkError = (error, context) => {
  if (context === "cart") {
    const goToCartBtn = document.getElementById("goToCart"),
      goToCartCtn = document.getElementById("hidden"),
      inputClrs = document.getElementById("colors"),
      clrsMessageError = document.getElementById("colorErrorMessage"),
      inputQty = document.getElementById("quantity"),
      toCartBtn = document.getElementById("addToCart"),
      qtyMessageError = document.getElementById("quantityErrorMessage");

    if (!error.color && !error.quantity) {
      goToCartCtn.style.display = "flex";
      inputQty.value = "0";
      inputClrs.value = "";
      console.log(goToCartCtn, "goToCartCtn");
      goToCartBtn.style.backgroundColor = "green";
      goToCartBtn.addEventListener("click", () => {
        window.location.href = "./cart.html";
      });
    }
    if (error.color || error.quantity) {
      goToCartCtn.style.display = "none";
    }
    if (error.color) {
      clrsMessageError.style.display = "flex";
      inputClrs.style.borderBlockColor = "red";
    } else {
      // Si pas d'érreur de couleur
      clrsMessageError.style.display = "none";
      inputClrs.style.borderBlockColor = "Grey";
    }
    if (error.quantity) {
      qtyMessageError.style.display = "flex";
      inputQty.style.borderBlockColor = "red";
    } else {
      qtyMessageError.style.display = "none";
      inputQty.style.borderBlockColor = "Grey";
    }
    console.log("traitement erreur cart");
  }
  if (context === "panier") {
    console.log("traitement erreur panier");
  }
  if (error.quantityMax) {
  }
};
// récupération du Button  + ajout d'évenement
const toCartBtn = document.getElementById("addToCart");

toCartBtn.addEventListener("click", () => {
  // récupération des quantités et couleurs
  let qty = parseInt(getQuantity());
  let clrs = getColors();

  let returnAdd2Cart = add2Cart(id, clrs, qty);
  console.log(returnAdd2Cart, "Error returnAdd2Cart");
  checkError(returnAdd2Cart, "cart");
  checkError(returnAdd2Cart, "panier");
  // goToCartBtn.style.bor = "green";
});

// envois vers le panier au click :
