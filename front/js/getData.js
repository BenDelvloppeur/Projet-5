let title1 = document.getElementById("title1");
let title2 = document.getElementById("title2");
const fetchFunction = async (url) => {
  try {
    let result = await fetch(url);
    if (result.ok) {
      let response = await result.json();
      return response;
    } else {
      throw new Error("Probleme de connexion");
    }
  } catch (err) {
    title1.innerHTML = "Un problème est survenu";
    title2.innerHTML = "Merci de bien vouloir réssayer ultérieurement.";
    console.log("Erreur data", err);
  }
};
