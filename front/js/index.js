const host = "http://localhost:3000/";
const hostProduct = host + "api/products/";

const articleSection = document.getElementById("items");

const addItem = (item) => {
  let productLink = document.createElement(`a`);
  productLink.href = `./product.html?id=${item._id}`;
  productLink.innerHTML = `
  <article>
  <img
  src="${item.imageUrl}"
  alt="${item.altTxt}"
  />
  <h3 class="productName">${item.name}</h3>
  <p class="productDescription">
  ${item.description}
  </p>
  </article>
  `;
  // console.log("Notre Nom :",productLink);
  return productLink;
};

// Tableau permettant de récuperer les articles
let articleArray = [];
const title = document.getElementsByClassName("titles");

// Appel de la fonction fetch
fetchFunction(hostProduct).then((result) => {
  // json = format
  articleArray = result;
  // on vient Maper le tableau (crée un nouveau tableau avec les résultats
  articleArray.map((cards) => {
    let myName = addItem(cards);
    console.log("Mon article :", cards);
    // ajout de myName dans articleSection qui est = à l'additem
    articleSection.appendChild(myName);
  });
});
// }).catch((err)=>{console.log("Récupération des informations impossible.")}) ;

// Appel de fetch

//  Try Catch ???
