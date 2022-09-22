const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");
const host = "http://localhost:3000/";
// la fonction de récupération récupère les données du backend
// pour remplir les propriétés des kanaps sur la page cart.html

const fetchIdData = () => {
  let items = getCart();
  let qty = 0;
  let price = 0;
  if (localStorage.getItem("panier") != null) {
    for (let i = 0; i < items.length; i++) {
      let id = items[i][0];
      let color = items[i][1];
      let url = host + "api/products/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${result.imageUrl}" alt="${result.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${result.name}</h2>
                    <p>${color}</p>
                    <p>${result.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItems" onclick="deleteItems('${id}','${color}')">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

          // prix total (si qté (items[i][2]))
          price += result.price * items[i][2];
          document.getElementById("totalPrice").innerHTML = price;
        });

      // Quantité total :
      if(items[i][2]<= 100){

        qty += parseInt(items[i][2]);
        document.getElementById("totalQuantity").innerHTML = qty;
      }else{
        items[i][2] = 100;
        qty += parseInt(items[i][2]);
        document.getElementById("totalQuantity").innerHTML = qty;
      }
    }
  } else {
    h1[0].innerHTML = "Votre panier est vide";
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
};

fetchIdData();

const postUrl = host + "api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  let email = validateEmail(mail.value);
  let firstName = validateFirstName(prenom.value);
  let lastName = validateLastName(nom.value);
  let city = validateCity(ville.value);
  if (
    email == false ||
    firstName == false ||
    lastName == false ||
    city == false
  ) {
    if (email == false) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (firstName == false) {
      firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
    }
    if (lastName == false) {
      lastNameErrorMsg.innerHTML = "Entre un nom valide sans chiffre.";
    }
    if (city == false) {
      cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
    }
    return;
  }
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    // to check res.ok status in the network
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); // catching errors
});
