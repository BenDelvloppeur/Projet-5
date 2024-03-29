// Function pour récupérer les items du panier.
const getCart = () => {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    // Transformation de la chaine de caratère en object, d'ou le.parse
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
};

//   Fonction logique avec plusieurs conditions.

const add2Cart = (id, clrs, qty) => {
  let error = {};

  if (qty <= 0 || qty > 100) {
    error.quantity = true;
  }

  if (clrs === "") {
    error.color = true;
  }

  if (qty >= 1 && qty <= 100) {
    error.quantity = false;
  }

  if (clrs !== "") {
    error.color = false;
  }

  if (qty >= 1 && qty <= 100 && clrs !== "") {
    error = {
      color: false,
      quantity: false,
    };
  }

  if (!error.color && !error.quantity && !error.quantityMax) {
    let items = getCart();
    if (items.length == 0) {
      items = [[id, clrs, qty]];
    } else {
      let found = false;
      for (let i = 0; i < items.length; i++) {
        if (id === items[i][0] && clrs === items[i][1]) {
          found = true;
          if (items[i][2] + qty > 100) {
            error.quantity = true;
            error.quantityMax = true;
          } else {
            items[i][2] += qty;
          }
        }
      }
      if (found == false) {
        let item = [id, clrs, qty];
        items.push(item);
      }
    }
    // Modification des objects en string (chaine de caractère)
    localStorage.setItem("panier", JSON.stringify(items));
    console.log(error, "Error add2Cart");
  }
  return error;
};

const deleteItems = (id, clrs) => {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && clrs === items[i][1]) {
      // .splice supprime des éléments de tableau.
      items.splice(i, 1);
      localStorage.setItem("panier", JSON.stringify(items));
      window.location.reload();
    }
    if (items.length === 0) {
      localStorage.clear();
    }
  }
};

const changeQty = (id, clrs, qty) => {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && clrs === items[i][1]) {
      items[i][2] = qty;
    }
    localStorage.setItem("panier", JSON.stringify(items));
    window.location.reload();
  }
};

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("adress");
const mail = document.getElementById("email");

const emailErrorMsg = document.getElementById("emailErrorMsg");
const validateEmail = (mail) => {
  // Regex : Protection des caractère ( Interdiction des caractères)
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
};

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const validateFirstName = (prenom) => {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
};

const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

const validateLastName = (nom) => {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
};

const cityErrorMsg = document.getElementById("cityErrorMsg");

const validateCity = (ville) => {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    addressErrorMsg.innerHTML = null;
    return true;
  }
};

const makeJsonData = () => {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: address.value,
    city: ville.value,
    email: email.value,
  };
  let items = getCart();
  let products = [];

  for (i = 0; i < items.length; i++) {
    if (products.find((e) => e == items[i][0])) {
      console.log("not found");
    } else {
      products.push(items[i][0]);
    }
  }

  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
};
